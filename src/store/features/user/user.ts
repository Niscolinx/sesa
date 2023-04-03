import { AppState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  firstName: '',
  lastName: '',
  email: '',
} as const

type StateKey = keyof typeof initialState
type StateValue = (typeof initialState)[StateKey]

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    updateUser(state, action) {
      const payload = action.payload;

      console.log(payload);

      const values = Object.entries(payload);

      values.forEach((item) => {
        const [key, value] = item;

        state[key as ] = value as string;
      });
    },
    clearUser(state, action) {
      console.log('++++++++++++++clearing user');
      state = initialState;
    },
  },

  extraReducers: (builder) => {},
});

export const { clearUser, updateUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
