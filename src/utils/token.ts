// import { createHash } from 'crypto'

// const hashToken = (token: string) => {
//     const hash = createHash('sha256')
//     hash.update(token)
//     return hash.digest('hex')
// }

export const storeToken = (token: string):void => {
    // const hashedToken = hashToken(token)
    const expirationDate = new Date().getTime() + 3600 * 1000 // set expiration date to 1 hour from now
    localStorage.setItem('token', JSON.stringify({ token, expirationDate }))
}

export const isAuthenticated = (): null | string => {
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
