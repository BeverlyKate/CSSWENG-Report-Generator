import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

// Create an entity adapter with a custom `selectId` implementation
const tasksAdapter = createEntityAdapter({
    selectId: (task) => task._id, // Use `_id` as the unique identifier
});

const initialState = tasksAdapter.getInitialState()

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: () => '/table',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 60,
            transformResponse: responseData => {
                const loadedTasks = responseData.map(task => {
                    // task.repairId = task._id; // This can be removed if you don't need `repairId` separately
                    return task;
                });
                console.log('Transformed Response Data:', loadedTasks);
                return tasksAdapter.setAll(initialState, loadedTasks)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Task', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Task', id }))
                    ]
                } else return [{ type: 'Task', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetTasksQuery,
} = tasksApiSlice

// returns the query result object
export const selectTasksResult = tasksApiSlice.endpoints.getTasks.select()

// creates memoized selector
// Add console logs in your selectors
const selectTasksData = createSelector(
    selectTasksResult,
    tasksResult => {
        console.log('Select Tasks Result:', tasksResult);
        return tasksResult.data; // normalized state object with ids & entities
    }
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds
    // Pass in a selector that returns the tasks slice of state
} = tasksAdapter.getSelectors(state => selectTasksData(state) ?? initialState)
