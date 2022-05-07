// action - state management
import { UPDATE_APP, CLEAR_APP } from './actions';
import configuration from 'react-dappify/configuration/default.json';

const initialState = configuration;

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APP: {
            const newState = { ...state, ...action.configuration };
            console.log(newState);
            return newState;
        }
        case CLEAR_APP: {
            return { ...initialState };
        }
        default: {
            return { ...state };
        }
    }
};

export default appReducer;
