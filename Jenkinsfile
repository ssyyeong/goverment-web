pipeline {
    agent any
    
    stages {
        stage('deploy') {
            steps {
                echo 'Deploying...'

                sh 'chmod 774 ./deploy.sh'
                sh 'bash ./deploy.sh'
            }
        }

        // stage('Notify Sentry of deployment') {
        //     environment {
        //         SENTRY_AUTH_TOKEN = credentials('sentry-auth-token')
        //         SENTRY_ORG = 'sample-organization-slug'
        //         SENTRY_PROJECT = 'sample-project-slug'
        //         SENTRY_ENVIRONMENT = 'production'
        //     }
        //     steps {
        //         // Install Sentry CLI
        //         sh 'command -v sentry-cli || curl -sL https://sentry.io/get-cli/ | bash'

        //         sh '''
        //             export SENTRY_RELEASE=$(sentry-cli releases propose-version)
        //             sentry-cli releases new -p $SENTRY_PROJECT $SENTRY_RELEASE
        //             sentry-cli releases set-commits $SENTRY_RELEASE --auto
        //             sentry-cli releases files $SENTRY_RELEASE upload-sourcemaps /path/to/sourcemaps
        //             sentry-cli releases finalize $SENTRY_RELEASE
        //             sentry-cli releases deploys $SENTRY_RELEASE new -e $SENTRY_ENVIRONMENT
        //         '''
        //     }
        // }
    }
}
