exports.getFullData = async (event) => {
    const fetch = (await import('node-fetch')).default;

    const id = event.pathParameters.contactId;
    const baseURL = `https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/${id}/`;
    const baseConfig = {
        'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
        'Content-Type': 'application/json'
    }
    const fullData = {};

    try {
        const response = await fetch(
            `${baseURL}`,
            {
                headers: baseConfig
            }
        );
        const data = await response.json();
        fullData.firstName = data.name.first;
        fullData.lastName = data.name.last;
        fullData.city = data.address.city;

        const emailRes = await fetch(
            `${baseURL}emails/0`,
            {
                headers: baseConfig
            }
        );
        const dataEmail = await emailRes.json();
        fullData.email = dataEmail.address ? dataEmail.address : '';
        
        const phoneRes = await fetch(
            `${baseURL}phones/1`,
            {
                headers: baseConfig
            }
        );
        const dataPhone = await phoneRes.json();
        fullData.phone = dataPhone.number ? dataPhone.number : '';

        return {
            statusCode: 200,
            body: JSON.stringify(fullData)
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 400,
            body: 'Ocurrió un error: ' + error
        }
    }
};
