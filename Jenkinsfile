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
                    withCredentials([
                        string(credentialsId: 'DATABASE_URL_PKBM_SWASTIKA', variable: 'DATABASE_URL'),
                        string(credentialsId: 'NEXT_PUBLIC_EMAILJS_SERVICE_ID', variable: 'NEXT_PUBLIC_EMAILJS_SERVICE_ID'),
                        string(credentialsId: 'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', variable: 'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'),
                        string(credentialsId: 'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', variable: 'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'),
                        string(credentialsId: 'NEXT_PUBLIC_SHEET_BEST_URL', variable: 'NEXT_PUBLIC_SHEET_BEST_URL')
                    ]) {
                        // Validate DATABASE_URL before deploying
                        sh '''
                        if [ -z "$DATABASE_URL" ]; then
                            echo "❌ ERROR: DATABASE_URL is empty"
                            exit 1
                        fi
                        
                        if ! echo "$DATABASE_URL" | grep -q "^postgresql://"; then
                            echo "❌ ERROR: DATABASE_URL must start with 'postgresql://'"
                            exit 1
                        fi
                        
                        echo "✅ DATABASE_URL validated"
                        '''
                        
                        // Create uploads directory on host with correct permissions
                        // Container runs as user nextjs (UID 1001), so we need to set ownership
                        // Create uploads directory on host with correct permissions
                        // Container runs as user nextjs (UID 1001), so we need to set ownership
                        sh '''
                        # Create parent directory if it doesn't exist
                        mkdir -p /var/www/pkbmswastika.sch.id
                        
                        # Create uploads directory with subdirectories
                        mkdir -p /var/www/pkbmswastika.sch.id/uploads/galeri
                        mkdir -p /var/www/pkbmswastika.sch.id/uploads/berita
                        mkdir -p /var/www/pkbmswastika.sch.id/uploads/general
                        
                        # Set ownership to nextjs user (UID 1001) in container
                        chown -R 1001:1001 /var/www/pkbmswastika.sch.id/uploads
                        
                        # Set permissions (rwx for owner, rx for group/others)
                        chmod -R 775 /var/www/pkbmswastika.sch.id/uploads
                        
                        # Verify permissions
                        ls -la /var/www/pkbmswastika.sch.id/ | grep uploads || echo "Directory created"
                        '''
                        
                        sh """
                        docker run -d --name ${DOCKER_IMAGE_NAME} \
                        --network host \
                        -e PORT=8005 \
                        -v /var/www/pkbmswastika.sch.id/uploads:/app/public/uploads \
                        -e DATABASE_URL="${DATABASE_URL}" \
                        -e NEXT_PUBLIC_EMAILJS_SERVICE_ID="${NEXT_PUBLIC_EMAILJS_SERVICE_ID}" \
                        -e NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="${NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}" \
                        -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="${NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}" \
                        -e NEXT_PUBLIC_SHEET_BEST_URL="${NEXT_PUBLIC_SHEET_BEST_URL}" \
                        ${DOCKER_IMAGE_NAME}:${env.BUILD_ID}
                        """
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