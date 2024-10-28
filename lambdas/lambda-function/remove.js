exports.deleteContact = async (event) => {
    const fetch = (await import('node-fetch')).default;

    const id = event.pathParameters.contactId;
    
    try {
        const req = await fetch(
            `https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/${id}`,
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            }
        );
        const res = await req.json();
        return {
            statusCode: 204,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(res)
        };
    } catch (err) {
        console.error('Error: ' + err.message);
        return {
            statusCode: 400,
            body: 'Ocurrió un error: ' + err.message
        };
    }
};
