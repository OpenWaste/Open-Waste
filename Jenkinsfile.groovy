pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Git') {
      steps {
        git branch: 'develop',
        credentialsId: 'de474f75-b8e7-480c-a217-2cd52ef98b48',
        url: 'https://github.com/mlee97/SOEN-490-Attack-On-SOEN.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install --force'
      }
    }  
    
    stage('SonarQube analysis') {
        environment {
            SCANNER_HOME = tool 'Sonar-scanner'
        }
        steps {
        withSonarQubeEnv(credentialsId: 'd56e9146-e2fa-4ee5-b50c-4dfad9c7abb8', installationName: 'Sonar') {
            sh '''$SCANNER_HOME/bin/sonar-scanner \
            -Dsonar.projectKey=projectKey \
            -Dsonar.projectName=projectName \
            -Dsonar.sources=./front-end,./back-end \
            -Dsonar.java.binaries=target/classes/ \
            -Dsonar.exclusions=src/test/java/****/*.java \
            -Dsonar.java.libraries=/var/lib/jenkins/.m2/**/*.jar \
            -Dsonar.projectVersion=${BUILD_NUMBER}-${GIT_COMMIT_SHORT}'''
            }
        }
    }
            
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }

}