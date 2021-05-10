const authDefaultState = {
    accessList: []
}

const authReducer = (state = authDefaultState, action) => {
    switch (action.type){
        case 'SET_AUTH':
                return [...state, action.auth]
        default:
            return state;
    }
}

export default authReducer;