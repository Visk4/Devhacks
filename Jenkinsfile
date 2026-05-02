pipeline {
    agent any

    environment {
        SONAR_TOKEN  = credentials('sonar-token')
        DOCKER_IMAGE = "devhacks-backend"
        DOCKER_TAG   = "${BUILD_NUMBER}"
    }

    tools {
        jdk 'Java17'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Visk4/Devhacks.git'
            }
        }

        stage('Build') {
            steps {
                // pom.xml lives in backend/ subdirectory
                dir('backend') {
                    sh './mvnw clean compile -B'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    sh './mvnw test -B'
                }
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            ./mvnw sonar:sonar \
                              -Dsonar.projectKey=devhacks \
                              -Dsonar.projectName=DevHacks \
                              -Dsonar.host.url=http://localhost:9000 \
                              -Dsonar.token=${SONAR_TOKEN}
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Package') {
            steps {
                dir('backend') {
                    sh './mvnw package -DskipTests -B'
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                // Build from backend/ context where Dockerfile lives
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ./backend"
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    cd /opt/devhacks
                    docker compose down backend || true
                    docker compose up -d --build backend
                """
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline succeeded — Build #${BUILD_NUMBER}"
        }
        failure {
            echo "❌ Pipeline failed — check logs above"
        }
        always {
            cleanWs()
        }
    }
}
