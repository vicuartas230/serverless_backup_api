# Serverless Backup Database

This is a serverless REST API to implement CRUD operations (Create, Read, Update, Delete) on contacts. It consists of an infrastructure built with AWS CDK to deploy a backup DynamoDB table `ContactsTable` to store the last successful query to a Oracle Service Cloud REST API, an API Gateway to manage the paths with the HTTP methods GET, POST, PATCH, and DELETE, as well as, four lambda functions that handle each request.

## Prerequisites

To work with the AWS CDK, you should have an AWS account and credentials and have installed Node.js. Ensure at least Node version 16.x is installed in your system.

- Node.js (>= 16.x)
- AWS CLI
- npm

## Getting Started
### 1. Clone the repository
``` bash
    git clone https://github.com/vicuartas230/serverless_backup_api.git
    cd serverless_backup_api
```

### 2. Install the AWS CDK CLI

Use the Node Package manager to install the CDK CLI. Install it globally is recommended using the following command:
```bash
    npm install -g aws-cdk
```

Run the following command to verify a successful installation. The AWS CDK CLI should output the version number:
```bash
    cdk --version
```

### 3. Configure your AWS environment

In this step, you configure the AWS environment for your CDK stack. By doing this, you specify which environment your CDK stack will be deployed to.

First, determine the AWS environment that you want to use. An AWS environment consists of an AWS account and AWS Region.

- Get your AWS account ID

Run the following AWS CLI command to get the AWS account ID for your default profile:
```bash
    aws sts get-caller-identity --query "Account" --output text
```

If you prefer to use a named profile, provide the name of your profile using the --profile option:
```bash
    aws sts get-caller-identity --profile your-profile-name --query "Account" --output text
```

- Obtain your AWS Region

Run the following AWS CLI command to get the Region that you configured for your default profile:
```bash
    aws configure get region
```

If you prefer to use a named profile, provide the name of your profile using the --profile option:
```bash
    aws configure get region --profile your-profile-name
```

### 4. Bootstrap your AWS environment

In this step, you bootstrap the AWS environment that you configured in the previous step. This prepares your environment for CDK deployments.

To bootstrap your environment, run the following from the root of your CDK project:
```bash
    cdk bootstrap
```

### 5. Deploy your CDK stack

From the root of your project, run the following. Confirm changes if prompted:
```bash
    cdk deploy
```

### 6. Testing your API

The URL of the endpoint will be showed once the deployment process finish. Clients like Postman or curl can be utilized to test the API.

- Create a Contact
```bash
    curl -X POST https://<ENDPOINT_URL>/contacts \
    -H "Content-Type: application/json" \
    -d <body>
```

- Get contacts
```bash
    curl -X GET https://<ENDPOINT_URL>/contacts?q=<query>
```

- Get full data of a contact
```bash
    curl -X GET https://<ENDPOINT_URL>/contacts/{<CONTACT_ID>}
```

Update a Contact
```bash
    curl -X PUT https://<ENDPOINT_URL>/contacts/{<CONTACT_ID>} \
    -H "Content-Type: application/json" \
    -d <body>
```

Delete a Contact
```bash
    curl -X DELETE https://<ENDPOINT_URL>/contacts/{<CONTACT_ID>}
```

### 7. Delete your application

By deleting your application, the CloudFormation stack associated with your CDK stack including the resources created will be cleaned up avoiding unnecessary charges.
```bash
    cdk destroy
```
