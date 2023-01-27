import { createSlice } from '@reduxjs/toolkit';

export const configsSlice = createSlice({
    name: 'configs',
    initialState: {
        minimize: true
    },
    reducers: {
        changeMinimize: (state, { payload }) => {
            state.minimize = payload;
        }
    },
})

export const {
    changeMinimize
} = configsSlice.actions

export const dashboardMinimizer = state => state.configs.minimize;

export default configsSlice.reducer;