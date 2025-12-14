pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = ""
        DEPLOY_PORT = ""
        ENV_FILE = ""
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Prepare') {
            steps {
                script {
                    env.BRANCH_NAME = 'master'
                    DOCKER_IMAGE_NAME = "pkbm-swastika"
                    DEPLOY_PORT = "8005"
                    ENV_FILE = 'ENV_PKBM_SWASTIKA'

                    echo "Deploying branch: ${env.BRANCH_NAME}"
                    echo "Using Docker image: ${DOCKER_IMAGE_NAME}"
                    echo "Deploying on port: ${DEPLOY_PORT}"
                }
            }
        }

        stage('Clone repository') {
            steps {
                git branch: "${env.BRANCH_NAME}", url: 'https://github.com/BintangDiLangit/pkbm-swastika.git'
            }
        }

        stage('Preparation Environment') {
            steps {
                script {
                    sh """ls -la"""
                    sh """pwd"""
                    // Optional: Uncomment if you need to inject environment variables
                    // withCredentials([
                    //     string(credentialsId: ENV_FILE,
                    //     variable: 'ENV_FILE_PATH')
                    // ]) {
                    //     sh 'echo $ENV_FILE_PATH > .env.local'
                    // }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${env.BUILD_ID}")
                }
            }
        }

        stage('Stop and Remove Previous Docker Container') {
            steps {
                script {
                    sh "docker stop ${DOCKER_IMAGE_NAME} || true"
                    sh "docker rm ${DOCKER_IMAGE_NAME} || true"
                    sh """#!/bin/bash
                        docker images --filter=reference='${DOCKER_IMAGE_NAME}' --format '{{.ID}} {{.Repository}}:{{.Tag}}' | grep -v '${DOCKER_IMAGE_NAME}:${env.BUILD_ID}' | awk '{print \$1}' | xargs -r docker rmi || true
                    """
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    // Get environment variables from Jenkins credentials
                    // Note: When pasting multi-line .env to Jenkins Secret Text,
                    // newlines are preserved as \n characters in the string
                    withCredentials([
                        string(credentialsId: 'ENV_PKBM_SWASTIKA', variable: 'ENV_CONTENT')
                    ]) {
                        // Create .env file from credential content
                        // ENV_CONTENT is available as environment variable from withCredentials
                        sh '''
                        # Write the content to file
                        echo "$ENV_CONTENT" > .env.production
                        
                        # Debug: Show file size and first few characters
                        echo "=== Debug: .env.production file info (BEFORE processing) ==="
                        ls -lh .env.production
                        echo "First 200 chars:"
                        head -c 200 .env.production || true
                        echo ""
                        echo "Line count: $(wc -l < .env.production)"
                        '''
                        
                        // Process the .env file
                        sh '''
                        # Step 1: Convert escaped newlines (\\n) to actual newlines
                        # Use perl for better newline handling (if available)
                        if command -v perl >/dev/null 2>&1; then
                            perl -i -pe 's/\\\\n/\\n/g' .env.production
                        else
                            # Fallback: use sed
                            sed -i.bak 's/\\\\n/\\n/g' .env.production
                            rm -f .env.production.bak
                        fi
                        
                        # Step 2: If file still has only 1 line, try to split by spaces (for single-line format)
                        # Check if file has multiple lines
                        LINE_COUNT=$(wc -l < .env.production | tr -d ' ')
                        if [ "$LINE_COUNT" -eq 1 ]; then
                            echo "⚠ File has only 1 line, attempting to split by spaces..."
                            # Use Python for reliable parsing (handles quoted values correctly)
                            if command -v python3 >/dev/null 2>&1; then
                                python3 << 'PYTHON_SCRIPT'
import re
import sys

try:
    with open('.env.production', 'r') as f:
        content = f.read().strip()
    
    # Match KEY=VALUE pairs, handling quoted values and special characters
    # Pattern: KEY="quoted value" or KEY='quoted value' or KEY=unquoted_value
    # This handles passwords with special characters like &!*@ etc.
    # Build pattern using string concatenation to avoid Groovy parsing issues
    dquote = '"'
    squote = "'"
    pattern = r'([A-Z_][A-Z0-9_]*)=(?:' + dquote + r'([^' + dquote + r']*)' + dquote + r'|' + squote + r'([^' + squote + r']*)' + squote + r'|([^\s=]+))'
    matches = re.findall(pattern, content)
    
    with open('.env.production.tmp', 'w') as f:
        for match in matches:
            key = match[0]
            # Get value from any of the capture groups (quoted double, quoted single, or unquoted)
            value = match[1] or match[2] or match[3]
            if value:
                f.write(f'{key}={value}\n')
    
    print(f"✓ Parsed {len(matches)} environment variables")
except Exception as e:
    print(f"Python parsing failed: {e}, using fallback method")
    sys.exit(1)
PYTHON_SCRIPT
                                
                                if [ $? -eq 0 ]; then
                                    mv .env.production.tmp .env.production
                                else
                                    echo "Python parsing failed, using simple fallback..."
                                    # Fallback: simple space-based splitting
                                    tr ' ' '\n' < .env.production | grep -v '^$' > .env.production.tmp
                                    mv .env.production.tmp .env.production
                                fi
                            else
                                echo "Python3 not available, using simple fallback..."
                                # Fallback: simple space-based splitting
                                tr ' ' '\n' < .env.production | grep -v '^$' > .env.production.tmp
                                mv .env.production.tmp .env.production
                            fi
                        fi
                        
                        # Step 3: Remove quotes from values if present (e.g., DATABASE_URL="value" -> DATABASE_URL=value)
                        sed -i.bak 's/="\\([^"]*\\)"/=\\1/g' .env.production
                        sed -i.bak "s/='\\([^']*\\)'/=\\1/g" .env.production
                        rm -f .env.production.bak
                        
                        # Step 4: Remove empty lines and lines with only whitespace
                        sed -i.bak '/^[[:space:]]*$/d' .env.production
                        rm -f .env.production.bak
                        
                        # Step 5: Remove trailing whitespace from each line
                        sed -i.bak 's/[[:space:]]*$//' .env.production
                        rm -f .env.production.bak
                        
                        # Step 6: Ensure file ends with newline
                        echo "" >> .env.production
                        '''
                        
                        // Verify the file was created and show debug info
                        sh '''
                        echo "=== Debug: After processing ==="
                        echo "File exists: $(test -f .env.production && echo 'YES' || echo 'NO')"
                        echo "File size: $(wc -c < .env.production) bytes"
                        echo "Line count: $(wc -l < .env.production) lines"
                        echo ""
                        echo "All environment variables (masked):"
                        cat .env.production | sed 's/=.*/=***/' || echo "File is empty or cannot be read"
                        echo ""
                        echo "Checking for required variables:"
                        grep -q "^DATABASE_URL=" .env.production && echo "✓ DATABASE_URL found" || echo "✗ DATABASE_URL NOT FOUND"
                        grep -q "^NODE_ENV=" .env.production && echo "✓ NODE_ENV found" || echo "⚠ NODE_ENV not found (optional)"
                        echo ""
                        echo "Full content (first 500 chars, masked):"
                        head -c 500 .env.production | sed 's/=.*/=***/g' || true
                        echo ""
                        '''
                        
                        // Validate DATABASE_URL exists before deploying
                        sh '''
                        if ! grep -q "^DATABASE_URL=" .env.production; then
                            echo "❌ ERROR: DATABASE_URL is required but not found in .env.production"
                            echo "Please check your Jenkins credential 'ENV_PKBM_SWASTIKA'"
                            echo "It should contain DATABASE_URL=postgresql://..."
                            exit 1
                        fi
                        echo "✅ DATABASE_URL validation passed"
                        '''
                        
                        // Deploy with environment file
                        sh """
                        docker run -d --name ${DOCKER_IMAGE_NAME} \
                        -p ${DEPLOY_PORT}:3000 \
                        --env-file .env.production \
                        ${DOCKER_IMAGE_NAME}:${env.BUILD_ID}
                        """
                        
                        // Clean up .env file
                        sh "rm -f .env.production"
                    }

                    echo "Next.js application deployed successfully on port ${DEPLOY_PORT}"
                }
            }
        }
    }
    
    post {
        success {
            echo 'Build and deploy successful!'
        }
        failure {
            echo 'Build or deploy failed.'
        }
    }
}