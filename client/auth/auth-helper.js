import { signout } from "./api-auth"

const auth = {

    // remove the jwt token from the session storage
    clearJWT (cb) {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('jwt')
        }
        cb()
        signout().then(data => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })

    },
    
    // checks if there is a token in the jwt session storage
    isAuthenticated() {
        if (typeof window === 'undefined') {
            return false
        }
        if (sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt'))
        } else {
            return false
        }
    },

    // places a token in the jwt session storage and then calls the callback function
    authenticate(jwt, cb) {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        }
        cb()
    }
}

export default auth