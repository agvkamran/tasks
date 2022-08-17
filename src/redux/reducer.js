import { ActionTypes } from "./action-types";

const initialState = {
    tasks: [{
        taskId: 1,
        taskName: "Cable Installation",
        taskStatus: 0,
        parentId: null
    },
    {
        taskId: 2,
        taskName: "Cable Tray Installation",
        taskStatus: 0,
        parentId: 1
    },
    {
        taskId: 11,
        taskName: "Cable Tray Installation 2",
        taskStatus: 0,
        parentId: 2
    },
    {
        taskId: 3,
        taskName: "Tray Installation",
        taskStatus: 0,
        parentId: 2
    },
    {
        taskId: 4,
        taskName: " Tray Connection",
        taskStatus: 0,
        parentId: 2
    },
    {
        taskId: 5,
        taskName: "Cable Installation",
        taskStatus: 0,
        parentId: 1
    },
    {
        taskId: 6,
        taskName: "Gaugeing",
        taskStatus: 0,
        parentId: null
    }],
    sure: false,
    started: {},
    startedItems: []
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.START_TASK:
            let currentTask = action.payload;

            let tasksStart = [];

            while (currentTask != null) {

                currentTask.taskStatus = 1;

                let index = state.tasks.findIndex((e, i, a) => e.taskId === currentTask.taskId);

                tasksStart =
                    [
                        ...state.tasks.slice(0, index),
                        currentTask,
                        ...state.tasks.slice(index + 1, state.length)
                    ]

                currentTask = state.tasks.find((e, i, a) => e.taskId === currentTask.parentId);
            }

            return {
                ...state,
                tasks: tasksStart
            };
        case ActionTypes.SET_SURE:
            return {
                ...state,
                sure: action.payload
            }
        case ActionTypes.SET_STARTED_ITEMS:
            return {
                ...state,
                startedItems: [...action.payload]
            }
        case ActionTypes.DELETE_TASK:
            let parents = [action.payload];

            for (let i = 0; i < parents.length; i++) {
                const parent = parents[i];

                for (let j = 0; j < state.tasks.length; j++) {
                    const task = state.tasks[j];

                    if (task.parentId === parent.taskId) {
                        parents.push(task);
                    }
                }
            }

            let tasksDelete = state.tasks;

            for (let i = 0; i < parents.length; i++) {
                let index = tasksDelete.findIndex((e, j, a) => e.taskId === parents[i].taskId);

                tasksDelete =
                    [
                        ...tasksDelete.slice(0, index),
                        ...tasksDelete.slice(index + 1, state.length)
                    ]
            }

            return {
                ...state,
                tasks: tasksDelete
            }
        default: return state;
    }
}

export default tasksReducer;