
import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../app/store'

export type RenderEstatePath = 'renderedEstates' | 'addEstate'
export type RenderAdminPath = 'renderedAdmins' | 'addAdmin'
export type RenderEstateManagerPath = 'renderedEstateManagers' | 'addEstateManager'


interface RouteChangeState {
    adminPath: RenderAdminPath
    estatePath: RenderEstatePath
    estateManagerPath: RenderEstateManagerPath
}

const initialState = {
    estatePath: 'renderedEstates',
    adminPath: 'renderedAdmins',
    estateManagerPath: 'renderedEstateManagers'
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
        }


    },
})

export const { setEstatePath, setAdminPath, setEstateManagerPath } = routeChange.actions
export const routeChangeSelector = (state: AppState) => state.routeChange

export default routeChange.reducer
