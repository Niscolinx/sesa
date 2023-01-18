import { createContext, Dispatch, SetStateAction } from 'react'


interface IProp {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
export const ModalContext = createContext<IProp>(null as any)
