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
                        // Jenkins preserves newlines as \n in the string, we need to convert them
                        sh """
                        # Write credential content to file using printf to handle newlines properly
                        printf '%s\\n' "\${ENV_CONTENT}" > .env.production
                        
                        # Convert escaped newlines (\\n) to actual newlines if they exist
                        # This handles the case where Jenkins shows as one line but preserves \\n
                        sed -i 's/\\\\n/\\n/g' .env.production
                        
                        # Remove quotes from values if present (e.g., DATABASE_URL="value" -> DATABASE_URL=value)
                        sed -i 's/="\\(.*\\)"/=\\1/g' .env.production
                        sed -i "s/='\\(.*\\)'/=\\1/g" .env.production
                        
                        # Remove empty lines
                        sed -i '/^$/d' .env.production
                        
                        # Remove trailing whitespace from each line
                        sed -i 's/[[:space:]]*$//' .env.production
                        """
                        
                        // Show first few lines for debugging (without sensitive data)
                        sh "head -n 3 .env.production | sed 's/=.*/=***/' || true"
                        
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