exports.updateContact = async (event) => {
    const fetch = (await import('node-fetch')).default;

    const id = event.pathParameters.contactId;
    const reqData = JSON.parse(event.body);
    const patchData = {
        name: {
            first: reqData.firstName,
            last: reqData.lastName
        },
        address: {
            city: reqData.city
        }
    };

    try {
        const req = await fetch(
            `https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/${id}`,
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify(patchData)
            }
        );
        const res = await req.json();
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(res)
        };
    } catch (err) {
        console.error('Error: ', + err.message);
        return {
            statusCode: 400,
            body: 'Ocurrió un error: ' + err.message
        };
    }
};
