import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../app/store'

export type RenderEstatePath = 'renderedEstates' | 'addEstate'
export type RenderAdminPath = 'renderedAdmins' | 'addAdmin'
export type RenderEstateManagerPath =
    | 'renderedEstateManagers'
    | 'addEstateManager'
export type RenderRolesAndPerm = 'renderRolesAndPerm' | 'addRolesAndPerm'
export type RenderAdditionalResidentPath = 'renderedAdditionalResidents' | 'addResidentUserPackage'
interface RouteChangeState {
    adminPath: RenderAdminPath
    estatePath: RenderEstatePath
    estateManagerPath: RenderEstateManagerPath
    rolesAndPermPath: RenderRolesAndPerm
    additionalResidentPath: RenderAdditionalResidentPath
}


const initialState = {
    estatePath: 'renderedEstates',
    adminPath: 'renderedAdmins',
    estateManagerPath: 'renderedEstateManagers',
    rolesAndPermPath: 'renderRolesAndPerm',
    additionalResidentPath: 'renderedAdditionalResidents'
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
        setAdditionalResidentPath: (state, action) => {
            state.additionalResidentPath = action.payload
        }
    },
})

export const { setEstatePath, setAdminPath, setEstateManagerPath, setRolesAndPermPath, setAdditionalResidentPath } =
    routeChange.actions
export const routeChangeSelector = (state: AppState) => state.routeChange

export default routeChange.reducer
