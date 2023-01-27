import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import configsReducer from '../features/configs/configsSlice';
import errorsReducer from '../features/errors/errorsSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    configs: configsReducer,
    errors: errorsReducer
  },
})