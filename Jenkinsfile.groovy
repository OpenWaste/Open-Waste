pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
    
    stage('SonarQube analysis') {
      environment {
          SCANNER_HOME = tool 'Sonar-scanner'
      }
      steps {
      //Perform SonarQube Analysis on front-end and back-end directories
      withSonarQubeEnv(credentialsId: 'a7c4e63bfe39828e0d70db7b8bba466e266e1972', installationName: 'Sonar') {
        sh '''$SCANNER_HOME/bin/sonar-scanner \
        -Dsonar.projectKey=projectKey \
        -Dsonar.projectName=DigitizingWaste \
        -Dsonar.sources=./front-end,./back-end \
        -Dsonar.java.binaries=target/classes/ \
        -Dsonar.exclusions=src/test/java/****/*.java \
        -Dsonar.java.libraries=/var/lib/jenkins/.m2/**/*.jar \
        -Dsonar.projectVersion=${BUILD_NUMBER}-${GIT_COMMIT_SHORT}'''
        }
      }
    }    
  }
}
