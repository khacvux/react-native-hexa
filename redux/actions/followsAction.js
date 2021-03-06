import * as TYPES from '../constants/follows'
 

export const getListFollower = ({userId, token}) => {
    return {
        type: TYPES.GET_LIST_FOLLOWER,
        payload: {userId, token}
    }
}

export const getListFollowerSuccess = (data) => {
    return {
        type: TYPES.GET_LIST_FOLLOWER_SUCCESS,
        payload: data
    }
}


export const getListFollowing = ({userId, token}) => {
    return {
        type: TYPES.GET_LIST_FOLLOWING,
        payload: {userId, token}
    }
}

export const getListFollowingSuccess = payload => {
    return {
        type: TYPES.GET_LIST_FOLLOWING_SUCCESS,
        payload
    }
}


export const getListFollowRequest = payload => {
    return {
        type: TYPES.GET_LIST_FOLLOW_REQUEST,
        payload
    }
}

export const getListFollowRequestSuccess = (data) => {
    return {
        type: TYPES.GET_LIST_FOLLOW_REQUEST_SUCCESS,
        payload: data
    }
}




export const getFail = (error) => {
    return {
        type: TYPES.GET__FAILURE,
        error
    }
}