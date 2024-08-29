pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = ""
        DEPLOY_PORT = ""
        ENV_FILE = ""
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
                    withCredentials([
                        string(credentialsId: ENV_FILE,
                        variable: 'ENV_FILE_PATH')
                    ]) {
                        sh 'echo $ENV_FILE_PATH > src/.env'
                    }
                }
            }
        }

        stage('Remove Previous Docker') {
            steps {
                script {
                    sh "docker stop ${DOCKER_IMAGE_NAME} || true"
                    sh "docker rm ${DOCKER_IMAGE_NAME} || true"
                    sh """
                        docker images --filter=reference='${DOCKER_IMAGE_NAME}' -q | xargs -r docker rmi || true
                    """
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

        stage('Deploy to Server') {
            steps {
                script {
                    sh """
                    docker run -d --name ${DOCKER_IMAGE_NAME} \
                    -p ${DEPLOY_PORT}:80 \
                    ${DOCKER_IMAGE_NAME}:${env.BUILD_ID}
                    """

                    sh """docker exec -i ${DOCKER_IMAGE_NAME} bash"""
                    sh """ls src"""
                    sh """pwd"""

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