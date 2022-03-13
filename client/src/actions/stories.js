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

export const likeStory = (id) => async (dispatch) => {

    try {
        const { data } = await api.likeStory(id);
        dispatch({type: 'LIKE', payload: data});
    } catch (error) {
        console.log(error);
    }

}

export const commentStory = (value, id) => async (dispatch) => {
    
    try {
        const { data } = await api.commentStory(value, id);
        dispatch({type: 'COMMENT', payload: data});
        return data.comments;
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