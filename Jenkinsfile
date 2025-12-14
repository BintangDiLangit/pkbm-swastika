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
                        echo "=== Debug: .env.production file info ==="
                        ls -lh .env.production
                        echo "First 100 chars:"
                        head -c 100 .env.production || true
                        echo ""
                        '''
                        
                        // Process the .env file
                        sh '''
                        # Convert escaped newlines (\\n) to actual newlines if they exist
                        # Use printf to properly handle newlines
                        printf "%s\\n" "$(cat .env.production)" | sed 's/\\\\n/\\n/g' > .env.production.tmp
                        mv .env.production.tmp .env.production
                        
                        # Use perl for better newline handling (if available)
                        if command -v perl >/dev/null 2>&1; then
                            perl -i -pe 's/\\\\n/\\n/g' .env.production
                        fi
                        
                        # Remove quotes from values if present (e.g., DATABASE_URL="value" -> DATABASE_URL=value)
                        sed -i.bak 's/="\\([^"]*\\)"/=\\1/g' .env.production
                        sed -i.bak "s/='\\([^']*\\)'/=\\1/g" .env.production
                        rm -f .env.production.bak
                        
                        # Remove empty lines
                        sed -i.bak '/^[[:space:]]*$/d' .env.production
                        rm -f .env.production.bak
                        
                        # Remove trailing whitespace from each line
                        sed -i.bak 's/[[:space:]]*$//' .env.production
                        rm -f .env.production.bak
                        
                        # Ensure file ends with newline
                        echo "" >> .env.production
                        '''
                        
                        // Verify the file was created and show debug info
                        sh '''
                        echo "=== Debug: After processing ==="
                        echo "File exists: $(test -f .env.production && echo 'YES' || echo 'NO')"
                        echo "File size: $(wc -c < .env.production) bytes"
                        echo "Line count: $(wc -l < .env.production) lines"
                        echo ""
                        echo "First 3 lines (masked):"
                        head -n 3 .env.production | sed 's/=.*/=***/' || echo "File is empty or cannot be read"
                        echo ""
                        echo "Checking for DATABASE_URL:"
                        grep -q "^DATABASE_URL=" .env.production && echo "✓ DATABASE_URL found" || echo "✗ DATABASE_URL NOT FOUND"
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