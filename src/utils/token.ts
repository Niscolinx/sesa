import { setAuth } from '../store/features/auth'
import { useAppDispatch } from './../store/app/hooks'

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
    //const dispatch = useAppDispatch()

   
    const token = isAuthenticated()

    console.log({token}, 'before return')

    if (token) {
        // dispatch(setAuth(true))
        console.log('the token', token)
        return token
    }

    //return dispatch(setAuth(false))
}

export const clearAuth = () => {
    console.log('clearAuth', )
    const dispatch = useAppDispatch()
    return dispatch(setAuth(false))
}
