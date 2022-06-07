import { bindActionCreators, combineReducers } from "redux"
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";
import { RESET } from "../constants/userConstants";
import { orderReducer } from "./orderReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer', 'categoryReducer', 'orderReducer']
}


const appReducer = combineReducers({
    userReducer,
    categoryReducer,
    orderReducer
})
const rootReducer = (state, action) => {
    if (action.type === RESET) {
        //reset state
        state = undefined
        //reset local storage
        localStorage.clear()
    }
    return appReducer(state, action)

}


export default persistReducer(persistConfig, rootReducer); 