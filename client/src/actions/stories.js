import * as api from '../api';

// action
export const getStories = () => async (dispatch) => {

    try {
        const { data } = await api.fetchStories();
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error);
    }

}

export const createStory = (story) => async (dispatch) => {

    try {
        const { data } = await api.createStory(story);
        dispatch({type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }

}