import { RenderEstateManagerPath } from './../../Context/EstateManagerPageContext';
import { RenderAdminPath } from './../../Context/AdminPageContext';
import { RenderEstatePath } from './../../Context/EstatePageContext';
import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../app/store'


interface RouteChangeState {
    adminPage: RenderAdminPath
    estatePage: RenderEstatePath
    estateManagerPage: RenderEstateManagerPath
}

const initialState: RouteChangeState = {
    estatePage: 'renderedEstates',
    adminPage: 'renderedAdmins',
    estateManagerPage: 'renderedEstateManagers'
} 

const routeChange = createSlice({
    name: 'routeChange',
    initialState,
    reducers: {
        setEstatePage: (state, action) => {
            state.estatePage = action.payload
        },
        setAdminPage: (state, action) => {
            state.adminPage = action.payload
        },
        setEstateManagerPage: (state, action) => {
            state.estateManagerPage = action.payload
        }
        

    },
})


export const routeChangeSelector = (state: AppState) => state.routeChange

export default routeChange.reducer
