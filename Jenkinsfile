pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // This step checks out the source code from your version control system (e.g., Git).
                // Ensure your Jenkins job is configured to point to your repository.
                echo 'Checking out from Version Control...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                // This stage builds the Docker images defined in the docker-compose.yml file.
                // It will execute the Dockerfile for the 'frontend' service, which includes
                // installing dependencies and building your Vue app.
                echo 'Building application and database images...'
                sh 'docker-compose build'
            }
        }

        stage('Run Tests') {
            steps {
                // This is a placeholder for running your tests. Your package.json currently
                // has a 'lint' script but no 'test' script. A real-world command might be:
                // sh 'docker-compose run --rm frontend npm run test'
                echo 'Skipping tests: No test stage configured.'
            }
        }

        stage('Deploy') {
            steps {
                // This stage stops any existing containers and starts the new ones.
                // The '-d' flag runs the containers in detached mode (in the background).
                echo 'Deploying the application...'
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        // This 'post' section runs after all stages are completed.
        always {
            // This is a good place for cleanup tasks, like removing old, unused Docker images.
            echo 'Pipeline finished. Cleaning up dangling Docker images...'
            sh 'docker image prune -f'
        }
    }
}
