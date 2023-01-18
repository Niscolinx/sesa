import { createContext, Dispatch, SetStateAction } from 'react'

export type RenderAdminPath = 'renderedAdmins' | 'addAdmin'

interface IProp {
    routeToRender: RenderAdminPath
    setRouteToRender: Dispatch<SetStateAction<RenderAdminPath>>
}
export const ModalContext = createContext<IProp>(null as any)
