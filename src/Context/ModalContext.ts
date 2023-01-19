import { createContext, Dispatch, SetStateAction } from 'react'

export type OpenPath = 'renderedEstates' | 'renderedEstateManagers' | 'renderedAdmins'

interface IProp {
    handleOpen: (openPath?:OpenPath ) => void
    handleClose: () => void
}
export const ModalContext = createContext<IProp>(null as any)
