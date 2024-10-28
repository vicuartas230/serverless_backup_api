exports.createContact = async (event) => {
    const fetch = (await import('node-fetch')).default;

    const reqData = JSON.parse(event.body);

    const postData = {
        name: {
            first: reqData.firstName,
            last: reqData.lastName
        },
        // emails: {
        //     address: reqData.email
        // },
        address: {
            city: reqData.city
        },
        // phones: {
        //     number: reqData.phone
        // }
    };

    try {
        const req = await fetch(
            "https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts",
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(postData)
            }
        );
        const res = await req.json();
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(res)
        }
    } catch (err) {
        console.error("Error: ", err.message);
        return {
            message: "Ocurrió un error: " + err
        }
    }
}
