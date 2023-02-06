// The `signin` method will take user sign-in data from the view component, then use
// fetch to make a POST call to verify the user with the backend.
// The response from the server will be returned to the component in a promise, which
// may provide the JWT if sign-in was successful. The component invoking this method
// needs to handle the response appropriately, such as storing the received JWT locally.
const signin = async (user) => {
    try {
        let response = await fetch('/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

// The `signout` method to api-auth.js will use fetch to make a GET
// call to the signout API endpoint on the server.
// This method will also return a promise to inform the component about whether the
// API request was successful.
const signout = async () => {
    try {
        let response = await fetch('/auth/signout/', { method: 'GET' })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { signin, signout }