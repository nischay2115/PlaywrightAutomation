pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
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
    }
}