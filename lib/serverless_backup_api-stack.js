const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');
const dynamodb = require('@aws-cdk/aws-dynamodb');
const apigateway = require('@aws-cdk/aws-apigateway');


class ServerlessBackupApiStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'ContactsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'created_at', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    const getContacts = new lambda.Function(this, "getContactsFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "get.getContacts",
      code: lambda.Code.fromAsset("lambdas/lambda-function"),
      environment: {
        TABLE_NAME: table.tableName
      },
    });

    const getFullData = new lambda.Function(this, "getFullDataFunction", {
      runtime:lambda.Runtime.NODEJS_16_X,
      handler: "fullData.getFullData",
      code: lambda.Code.fromAsset("lambdas/lambda-function"),
      environment: {
        TABLE_NAME: table.tableName
      }
    });

    const createContact = new lambda.Function(this, "createContactFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "create.createContact",
      code: lambda.Code.fromAsset("lambdas/lambda-function"),
      environment: {
        TABLE_NAME: table.tableName
      }
    });

    const updateContact = new lambda.Function(this, "updateContactFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "edit.updateContact",
      code: lambda.Code.fromAsset("lambdas/lambda-function"),
      environment: {
        TABLE_NAME: table.tableName
      }
    });
    
    const deleteContact = new lambda.Function(this, "deleteContactFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "remove.deleteContact",
      code: lambda.Code.fromAsset("lambdas/lambda-function"),
      environment: {
        TABLE_NAME: table.tableName
      }
    });

    table.grantReadWriteData(getContacts);

    const api = new apigateway.RestApi(this, 'backupApi', {
      restApiName: 'Backup API',
    });

    const contacts = api.root.addResource('contacts');
    contacts.addMethod('POST', new apigateway.LambdaIntegration(createContact));
    contacts.addMethod('GET', new apigateway.LambdaIntegration(getContacts));

    const contact = contacts.addResource('{contactId}');
    contact.addMethod('GET', new apigateway.LambdaIntegration(getFullData));
    contact.addMethod('PUT', new apigateway.LambdaIntegration(updateContact));
    contact.addMethod('DELETE', new apigateway.LambdaIntegration(deleteContact));
  };
};


module.exports = { ServerlessBackupApiStack };
