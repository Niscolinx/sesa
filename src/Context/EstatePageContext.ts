import { createContext, Dispatch, SetStateAction } from 'react'

export type RenderEstatePath = 'renderedEstates' | 'addEstate'

interface IProp {
    routeToRender: RenderEstatePath
    setRouteToRender: Dispatch<SetStateAction<RenderEstatePath>>
}
export const EstatePageContext = createContext<IProp>(null as any)
