import { UPDATE_APP } from 'store/actions';

export const setField = (dispatch, state, field, value) => {
    const current = state;
    current[field] = value;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setImage = (dispatch, state, field, value) => {
    const current = state;
    current.images[field] = value;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setBoolean = (dispatch, state, field, enabled) => {
    const current = state;
    current[field] = enabled;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setColor = (dispatch, state, field, value) => {
    const current = state;
    current[field] = value.hex;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setMoralis = (dispatch, state, field, value) => {
    const current = state;
    if (!current.moralis) current.moralis = {};
    current.moralis[field] = value;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setSocial = (dispatch, state, field, value) => {
    const current = state;
    current.social[field] = value;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setFeature = (dispatch, state, field, enabled) => {
    console.log(enabled);
    const current = state;
    current.feature[field] = enabled;
    dispatch({ type: UPDATE_APP, configuration: current });
};

export const setNetwork = (dispatch, state, network) => {
    console.log(network);
    const current = state;
    current.network = network;
    dispatch({ type: UPDATE_APP, configuration: current });
};
