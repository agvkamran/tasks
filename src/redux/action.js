import { ActionTypes } from "./action-types";

export const startTaskAC = (payload) => {
    return {
        type: ActionTypes.START_TASK,
        payload: payload
    }
}

export const deleteTaskAC = (payload) => {
    return {
        type: ActionTypes.DELETE_TASK,
        payload: payload
    }
}

export const setStartedItemsAC = (payload) => {
    return {
        type: ActionTypes.SET_STARTED_ITEMS,
        payload: payload
    }
}