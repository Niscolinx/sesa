import { RenderEstatePath } from './../../Context/EstatePageContext';
import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../app/store'


interface RouteChangeState {
    estatePage: RenderEstatePath
}

const initialState: RouteChangeState = {
    estatePage: 'renderedEstates'
} 

const routeChange = createSlice({
    name: 'routeChange',
    initialState,
    reducers: {
        
    },
})


export const routeChangeSelector = (state: AppState) => state.routeChange

export default routeChange.reducer
