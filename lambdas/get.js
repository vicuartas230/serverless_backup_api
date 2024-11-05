const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient;

exports.getContacts = async (event) => {
    const fetch = (await import('node-fetch')).default;

    const tableName = process.env.TABLE_NAME;

    if (!tableName) {
        console.error("Environment variable TABLE_NAME is not defined.");
        return {
            statusCode: 500,
            body: JSON.stringify({message: "Server configuration error: TABLE_NAME not set"})
        }
    }

    const query = event.queryStringParameters?.q || '';
    const params = {
        TableName: tableName
    };

    try {
        const response = await fetch(
            `https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts?q=${query}`,
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Error response data: ", data);
            const errorMessage = `Request failed with status ${response.status} (${response.statusText || 'Unknown status'})` +
                                 ` Title: ${data.title || 'No title provided'}.` +
                                 ` Detail: ${data.detail || 'No additional details provided'}.`

            throw new Error(errorMessage);
        }

        for (const item of data.items) {
            params.Item = {
                id: item.id,
                created_at: new Date().toISOString(),
                lookupName: item.lookupName,
                links: item.links
            };
            await dynamo.put(params).promise();
        }

        console.log("Data successfully saved to DynamoDB:", data);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message: `An error ocurred: ${error.message}` })
        };
    }
};
