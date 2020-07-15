const initialState = {
    events: [],
    loading: false,
    error: null,
}

const reducers = (state = initialState, actions) => {
    switch (actions.type) {
        case "SET_EVENT":
            return {
                ...state, events: actions.payload
            }
        case "ADD_EVENT":
            const id = state.events.length + 1
            const payload = {...actions.payload, id}
            return {
                ...state, events: [...state.events, payload]
            }
        case "SET_LOADING":
            return {
                ...state, loading: actions.payload
            }
        case "SET_ERROR":
            return {
                ...state, error: actions.payload
            }
        default:
            return state;
    }
}

export default reducers