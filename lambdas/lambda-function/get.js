
exports.getContacts = async (event) => {
    const fetch = (await import('node-fetch')).default;
    // const tableName = process.env.TABLE_NAME;
    // const body = JSON.parse(event.body);
    // const params = { TableName: tableName };
    const query = event.queryStringParameters.q;
    // const data = await dynamo.scan(params).promise();
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
        return {
            statusCode: 200,
            headers: {
                'Conten-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error:', error.message);
        return {
            message: "Ocurrió un error: " + error
        }
    }
};
