exports.createContact = async (event) => {
    const fetch = (await import('node-fetch')).default;

    try {
        const req = await fetch(
            "https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts",
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: event.body
            }
        );
        const res = await req.json();
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(res)
        }
    } catch (err) {
        console.error("Error: ", err.message);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ message: "Ocurrió un error: " + err })
        };        
    }
}
