import { createContext, Dispatch, SetStateAction } from 'react'


interface IProp {
    handleOpen: () => void
    handleClose: () => void
}
export const ModalContext = createContext<IProp>(null as any)
