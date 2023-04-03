export const isAuthenticated = (): string | null => {
    const tokenData = localStorage.getItem('token')
    if (tokenData) {
        const { token, expirationDate } = JSON.parse(tokenData)
        if (expirationDate && new Date().getTime() > expirationDate) {
            console.log('expired token')
            localStorage.removeItem('token')

            return null
        }

        return token
    }

    return null
}

export const getToken = () => {

    const token = isAuthenticated()

    if(token){

        
    }

}
