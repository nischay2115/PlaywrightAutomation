pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
        allure 'Allure'
    }

    parameters { 
        choice( 
            name: 'TEST_SUITE', 
            choices: ['All', 'Network Interception', 'API-Testing'], 
            description: 'Select which test suite to run' 
        ) 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script { 
                    if (params.TEST_SUITE == 'Network Interception') { 
                        bat 'npm run "Network Interception"' 
                        } 
                    else if (params.TEST_SUITE == 'API-Testing') {
                         bat 'npm run API-Testing' 
                        } 
                    else { 
                        bat 'npx playwright test' 
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'allure generate allure-results --clean -o allure-report'
            }
        }
    }

    post {
        always {

            // Publish Playwright HTML Report
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            // Publish Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])

            // Email Report
            emailext(
                subject: "Playwright Execution Report - ${currentBuild.currentResult}",
                body: """
                Build Number: ${env.BUILD_NUMBER}
                Status: ${currentBuild.currentResult}
                Environment: ${params.ENVIRONMENT}
                Tag: ${params.GREP_TAG}
                
                View Report:
                ${env.BUILD_URL}
                """,
                to: "mailtonischay158@gmail.com",
                attachmentsPattern: 'playwright-report/index.html'
            )
        }
    }
}