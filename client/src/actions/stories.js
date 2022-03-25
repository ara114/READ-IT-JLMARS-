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

export const getStoriesBySearch = (searchQuery) => async (dispatch) => {

    try {
        const { data } = await api.fetchStoriesBySearch(searchQuery);
        dispatch({type: 'FETCH_BY_SEARCH', payload: data});
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

export const likeStory = (id) => async (dispatch) => {

    try {
        const { data } = await api.likeStory(id);
        dispatch({type: 'LIKE', payload: data});
    } catch (error) {
        console.log(error);
    }

}

export const reviewStory = (value, id) => async (dispatch) => {
    
    try {
        const { data } = await api.reviewStory(value, id);
        dispatch({type: 'REVIEW', payload: data});
        return data.reviews;
    } catch (error) {
        console.log(error);
    }

}

export const reportStory = (id) => async (dispatch) => {

    try {
        const { data } = await api.reportStory(id);
        dispatch({type: 'REPORT', payload: data});
    } catch (error) {
        console.log(error);
    }

}

export const unreportStory = (id) => async (dispatch) => {

    try {
        const { data } = await api.unreportStory(id);
        dispatch({type: 'UNREPORT', payload: data});
    } catch (error) {
        console.log(error);
    }

}

export const deleteStory = (id) => async (dispatch) => {

    try {
        await api.deleteStory(id);
        dispatch({type: 'DELETE', payload: id});
    } catch (error) {
        console.log(error);
    }

}