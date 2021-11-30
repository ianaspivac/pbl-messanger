export const postLogin = async (body) => {
    try {
        const response = await fetch(
            'http://localhost:8080/user/login',
            {
                method: "Post",
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