import { combineReducers } from "redux"
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer', 'categoryReducer']
}

const rootReducer = combineReducers(
    {
        userReducer,
        categoryReducer
    }
)

export default persistReducer(persistConfig, rootReducer); 