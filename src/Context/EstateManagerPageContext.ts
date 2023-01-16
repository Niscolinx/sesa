import { createContext, Dispatch, SetStateAction } from 'react'

export type RenderEstateManagerPath = 'renderedEstateManagers' | 'addEstateManager'

interface IProp {
    routeToRender: RenderEstateManagerPath
    setRouteToRender: Dispatch<SetStateAction<RenderEstateManagerPath>>
}
export const EstateManagerPageContext = createContext<IProp>(null as any)
