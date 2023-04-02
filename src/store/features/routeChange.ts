import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../app/store'

export type RenderEstatePath = 'renderedEstates' | 'addEstate'
export type RenderAdminPath = 'renderedAdmins' | 'addAdmin'
export type RenderEstateManagerPath =
    | 'renderedEstateManagers'
    | 'addEstateManager'
export type RenderRolesAndPerm = 'renderRolesAndPerm' | 'addRolesAndPerm'
export type RenderSecurityCompanyPath = 'renderedSecurityCompanies' | 'addSecurityCompany'
interface RouteChangeState {
    adminPath: RenderAdminPath
    estatePath: RenderEstatePath
    estateManagerPath: RenderEstateManagerPath
    rolesAndPermPath: RenderRolesAndPerm
    securityCompanyPath: RenderSecurityCompanyPath
}


const initialState = {
    estatePath: 'renderedEstates',
    adminPath: 'renderedAdmins',
    estateManagerPath: 'renderedEstateManagers',
    rolesAndPermPath: 'renderRolesAndPerm',
    securityCompanyPath: 'renderedSecurityCompanies'
} satisfies RouteChangeState


const routeChange = createSlice({
    name: 'routeChange',
    initialState,
    reducers: {
        setEstatePath: (state, action) => {
            state.estatePath = action.payload
        },

        setAdminPath: (state, action) => {
            state.adminPath = action.payload
        },
        setEstateManagerPath: (state, action) => {
            state.estateManagerPath = action.payload
        },
        setRolesAndPermPath: (state, action) => {
            state.rolesAndPermPath = action.payload
        },
       
        setSecurityCompanyPath: (state, action) => {
            state.securityCompanyPath = action.payload
        }

    },
})

export const { setEstatePath, setAdminPath, setEstateManagerPath, setRolesAndPermPath, setSecurityCompanyPath } =
    routeChange.actions
export const routeChangeSelector = (state: AppState) => state.routeChange

export default routeChange.reducer
