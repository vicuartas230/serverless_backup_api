// const AWS = require('aws-sdk');
// const dynamo = new AWS.DynamoDB.DocumentClient();
// const { v4: uuidv4 } = require('uuid');
// const fetch = (await import('node-fetch')).default;
const fetch = require('node-fetch');

exports.getContacts = async (event) => {
    const tableName = process.env.TABLE_NAME;
    // const body = JSON.parse(event.body);
    const params = { TableName: tableName };
    const query = event.queryStringParameters.q;
    const res = await fetch(
        `https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts?q=${query}`,
        {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
                'Content-Type': 'application/json'
            }
        }
    );
    // const data = await dynamo.scan(params).promise();
    // try {
    //     const response = await fetch(
    //         `https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts`,
    //         {
    //             headers: {
    //                 'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //     );
    //     console.log("Petición realizada!!!!");
    //     const data = await response.json();
    //     return {
    //         body: data
    //     };
    // } catch (error) {
    //     console.error('Error:', error.message);
    //     return {
    //         message: "Ocurrió un error: " + error
    //     }
    // }
    return {
        statusCode: 200,
        body: res
    };
};
