import React, { useState, useEffect } from 'react'
import { useAppDispatch } from '../store/app/hooks'
import { setAuth } from '../store/features/Auth'
import Login from '../pages/Login'
import { useNavigate } from 'react-router'
import { clearAuth } from '../utils/token'

interface Props {
    children: React.ReactNode
}

function AutoLogout({ children }: Props) {
    const [lastInteractionTime, setLastInteractionTime] = useState(new Date())
    const [isActive, setIsActive] = useState(true)
    const navigate = useNavigate()
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

            if (timeSinceLastInteraction > 20 * 60 * 1000) {
                setIsActive(false)
                dispatch(setAuth(false))
                clearAuth()
                clearInterval(logoutTimer)

                navigate('/')
            }
        }, 1000)

        return () => {
            clearInterval(logoutTimer)
        }
    }, [lastInteractionTime])

    return <div>{children}</div>
}

export default AutoLogout
