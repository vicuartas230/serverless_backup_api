exports.updateContact = async (event) => {
    const fetch = (await import('node-fetch')).default;

    const id = event.pathParameters.contactId;
    let res;

    try {
        const req = await fetch(
            `https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/${id}`,
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: event.body
            }
        );
        const contentType = req.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            res = await req.json();
        } else {
            res = await req.text();
        }
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(res)
        };
    } catch (err) {
        console.error('Error: ', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ message: "Ocurrió un error: " + err.message })
        };        
    }
};
