export const postSignUp = async (body) => {
    try {
        const response = await fetch(
            'http://81.180.72.35:8080/user/register',
            {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
}