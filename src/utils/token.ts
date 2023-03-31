import { createHash } from 'crypto'

const hashToken = (token: string) => {
    const hash = createHash('sha256')
    hash.update(token)
    return hash.digest('hex')
}

export const storeToken = (token: string) => {
    const hashedToken = hashToken(token)
    const expirationDate = new Date().getTime() + 3600 * 1000 // set expiration date to 1 hour from now
    localStorage.setItem(
        'token',
        JSON.stringify({ hashedToken, expirationDate })
    )
}

export const isAuthenticated = () => {
    const tokenData = localStorage.getItem('token')
    if (tokenData) {
        const { token, expirationDate } = JSON.parse(tokenData)
        if (expirationDate && new Date().getTime() > expirationDate) {
            localStorage.removeItem('token')
            return null
        }
        const hashedToken = hashToken(token)
        return hashedToken === tokenData
        
    }
    return null
}


