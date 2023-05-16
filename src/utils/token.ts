import { setAuth } from '../store/features/Auth'
import { useAppDispatch } from '../store/app/Hooks'

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

    if (token) {
        // dispatch(setAuth(true))
        return token
    }

    //return dispatch(setAuth(false))
}

export const clearAuth = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('roles')

    const dispatch = useAppDispatch()
    return dispatch(setAuth(false))
}
