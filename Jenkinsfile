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
                            # Simple and effective: use xargs which handles quoted values correctly
                            # xargs -n1 splits on spaces but preserves quoted strings
                            cat .env.production | xargs -n1 echo > .env.production.tmp
                            
                            if [ -s .env.production.tmp ]; then
                                mv .env.production.tmp .env.production
                                echo "✓ Parsed environment variables using xargs"
                            else
                                echo "⚠ xargs parsing failed, using simple fallback..."
                                # Fallback: simple space-based splitting
                                tr ' ' '\n' < .env.production | grep -v '^$' > .env.production.tmp
                                mv .env.production.tmp .env.production
                                echo "⚠ Used simple split (may break quoted values with spaces)"
                            fi
                        fi
                        
                        # Step 3: Remove quotes from values if present (e.g., DATABASE_URL="value" -> DATABASE_URL=value)
                        # But preserve the connection string structure
                        sed -i.bak 's/="\\([^"]*\\)"/=\\1/g' .env.production
                        sed -i.bak "s/='\\([^']*\\)'/=\\1/g" .env.production
                        rm -f .env.production.bak
                        
                        # Step 3.5: Auto URL-encode password in DATABASE_URL if it contains special characters
                        # PostgreSQL requires URL-encoding for special chars in password
                        if grep -q "^DATABASE_URL=" .env.production; then
                            # Use Python to URL-encode password in connection string
                            if command -v python3 >/dev/null 2>&1; then
                                python3 << 'ENCODE_SCRIPT'
import sys
import re
from urllib.parse import quote, urlparse, urlunparse

try:
    # Read the .env file
    with open('.env.production', 'r') as f:
        lines = f.readlines()
    
    # Process each line
    output_lines = []
    for line in lines:
        line = line.strip()
        if not line or not line.startswith('DATABASE_URL='):
            if line:
                output_lines.append(line)
            continue
        
        # Extract DATABASE_URL value
        db_url = line.split('=', 1)[1]
        
        # Parse the PostgreSQL URL
        # Format: postgresql://user:password@host:port/database?params
        if db_url.startswith('postgresql://'):
            try:
                # Parse URL
                parsed = urlparse(db_url)
                
                # Check if password contains special chars that need encoding
                if '@' in parsed.netloc:
                    # Split user:password@host
                    auth, host = parsed.netloc.rsplit('@', 1)
                    if ':' in auth:
                        user, password = auth.split(':', 1)
                        
                        # Check if password has unencoded special chars
                        # Special chars that need encoding: & ! * # @ ? = + % space
                        needs_encoding = bool(re.search(r'[&!*#@?=+% ]', password))
                        
                        if needs_encoding:
                            # URL-encode the password
                            encoded_password = quote(password, safe='')
                            # Reconstruct URL
                            new_netloc = f"{user}:{encoded_password}@{host}"
                            new_parsed = parsed._replace(netloc=new_netloc)
                            db_url = urlunparse(new_parsed)
                            print(f"✓ URL-encoded password in DATABASE_URL")
                        else:
                            print(f"✓ Password already safe (no special chars or already encoded)")
                    else:
                        # No password, just user@host
                        pass
                else:
                    # No auth part
                    pass
            except Exception as e:
                print(f"⚠ Warning: Could not parse DATABASE_URL: {e}")
                print(f"  Using original value")
        
        output_lines.append(f"DATABASE_URL={db_url}")
    
    # Write back
    with open('.env.production', 'w') as f:
        for line in output_lines:
            f.write(line + '\n')
    
    print("✓ Processed DATABASE_URL")
except Exception as e:
    print(f"⚠ Error processing DATABASE_URL: {e}")
    sys.exit(0)  # Don't fail, just continue with original
ENCODE_SCRIPT
                            fi
                        fi
                        
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
                        if grep -q "^DATABASE_URL=" .env.production; then
                            echo "✓ DATABASE_URL found"
                            # Show DATABASE_URL format (masked) for debugging
                            DB_LINE=$(grep "^DATABASE_URL=" .env.production)
                            DB_VALUE=$(echo "$DB_LINE" | cut -d'=' -f2-)
                            DB_LENGTH=${#DB_VALUE}
                            echo "  DATABASE_URL length: $DB_LENGTH characters"
                            
                            # Check if it looks like a valid PostgreSQL URL
                            if echo "$DB_VALUE" | grep -q "^postgresql://"; then
                                echo "  ✓ Valid PostgreSQL URL format"
                                
                                # Extract and validate components
                                # Format: postgresql://user:password@host:port/database
                                if echo "$DB_VALUE" | grep -q "@"; then
                                    echo "  ✓ Contains @ (has host)"
                                    # Check if it has database name (after last /)
                                    if echo "$DB_VALUE" | grep -qE "/[^/]+"; then
                                        echo "  ✓ Contains database name"
                                    else
                                        echo "  ⚠ WARNING: May be missing database name"
                                    fi
                                else
                                    echo "  ✗ ERROR: Missing @ (incomplete connection string)"
                                fi
                                
                                # Show masked format for debugging
                                MASKED=$(echo "$DB_VALUE" | sed -E 's|://([^:]+):([^@]+)@|://\1:***@|')
                                echo "  Format: ${MASKED:0:80}..."
                            else
                                echo "  ✗ ERROR: Does not start with 'postgresql://'"
                                echo "  First 50 chars: $(echo "$DB_VALUE" | cut -c1-50)"
                            fi
                        else
                            echo "✗ DATABASE_URL NOT FOUND"
                        fi
                        grep -q "^NODE_ENV=" .env.production && echo "✓ NODE_ENV found" || echo "⚠ NODE_ENV not found (optional)"
                        echo ""
                        '''
                        
                        // Validate DATABASE_URL exists and is valid before deploying
                        sh '''
                        if ! grep -q "^DATABASE_URL=" .env.production; then
                            echo "❌ ERROR: DATABASE_URL is required but not found in .env.production"
                            echo "Please check your Jenkins credential 'ENV_PKBM_SWASTIKA'"
                            echo "It should contain DATABASE_URL=postgresql://..."
                            exit 1
                        fi
                        
                        # Get DATABASE_URL value
                        DB_URL=$(grep "^DATABASE_URL=" .env.production | cut -d'=' -f2-)
                        
                        # Validate it's not empty
                        if [ -z "$DB_URL" ]; then
                            echo "❌ ERROR: DATABASE_URL is empty"
                            exit 1
                        fi
                        
                        # Validate it starts with postgresql://
                        if ! echo "$DB_URL" | grep -q "^postgresql://"; then
                            echo "❌ ERROR: DATABASE_URL must start with 'postgresql://'"
                            echo "Current value starts with: $(echo "$DB_URL" | cut -c1-20)..."
                            exit 1
                        fi
                        
                        # Validate it contains @ (has host)
                        if ! echo "$DB_URL" | grep -q "@"; then
                            echo "❌ ERROR: DATABASE_URL appears to be incomplete (missing @)"
                            echo "   This usually means the connection string was truncated during parsing"
                            echo "   Make sure DATABASE_URL is in quotes in your Jenkins credential"
                            exit 1
                        fi
                        
                        # Validate it has database name (after last /)
                        if ! echo "$DB_URL" | grep -qE "/[^/]+"; then
                            echo "⚠ WARNING: DATABASE_URL may be missing database name"
                        fi
                        
                        # Check for common issues with special characters
                        if echo "$DB_URL" | grep -qE "[&!*]"; then
                            echo "⚠ WARNING: DATABASE_URL contains special characters (&!*)"
                            echo "   These should be URL-encoded in the password part"
                            echo "   Example: & becomes %26, ! becomes %21, * becomes %2A"
                            echo "   Current URL may fail to connect. Consider URL-encoding the password."
                        fi
                        
                        echo "✅ DATABASE_URL validation passed"
                        echo "   URL format: postgresql://user:***@host:port/database"
                        echo "   Note: If connection fails, ensure password special chars are URL-encoded"
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