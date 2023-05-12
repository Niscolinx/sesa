import React, { useState, useEffect } from 'react'
import { useAppDispatch } from '../store/app/hooks'
import { setAuth } from '../store/features/auth'
import Login from '../pages/Login'

interface Props {
    children: React.ReactNode
}

function AutoLogout({ children }: Props) {
    const [lastInteractionTime, setLastInteractionTime] = useState(new Date())
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const dispatch = useAppDispatch()

    const handleInteraction = () => {
        setLastInteractionTime(new Date())
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleInteraction)
        window.addEventListener('keydown', handleInteraction)
        window.addEventListener('mousedown', handleInteraction)
        window.addEventListener('mouseup', handleInteraction)

        return () => {
            window.removeEventListener('mousemove', handleInteraction)
            window.removeEventListener('keydown', handleInteraction)
            window.removeEventListener('mousedown', handleInteraction)
            window.removeEventListener('mouseup', handleInteraction)
        }
    }, [])

    useEffect(() => {
        const logoutTimer = setInterval(() => {
            const currentTime = new Date()
            const timeSinceLastInteraction =
                currentTime.getTime() - lastInteractionTime.getTime()

            if (timeSinceLastInteraction > 2 * 60 * 1000) {
                setIsLoggedIn(false)
                dispatch(setAuth(false))

                clearInterval(logoutTimer)
            }
        }, 1000)

        return () => {
            clearInterval(logoutTimer)
        }
    }, [lastInteractionTime])

    return <div>{isLoggedIn ? children : <Login />}</div>
}

export default AutoLogout
