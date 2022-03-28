import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchStories = () => API.get('/stories');
export const fetchStoriesBySearch = (searchQuery) => API.get(`/stories/search?searchQuery=${searchQuery}`);
export const createStory = (newStory) => API.post('/stories', newStory);
export const likeStory = (id) => API.patch(`/stories/${id}/likeStory`);
export const reviewStory = (value, id) => API.post(`/stories/${id}/reviewStory`, {value});
export const reportStory = (id) => API.patch(`/stories/${id}/reportStory`);
export const unreportStory = (id) => API.patch(`/stories/${id}/unreportStory`);
export const deleteStory = (id) => API.delete(`/stories/${id}`);
export const warnAuthor = (story, details) => API.post(`/users/warn`, {story, details});

export const login = (formData) => API.post('/users/login', formData);
export const signup = (formData) => API.post('/users/signup', formData);

export const loginMod = (formData) => API.post('/moderator/loginMod', formData);

export const getUsers = () => API.get(`/users/viewProfile`);
export const updateUser = (id, updatedUser) => API.patch(`/users/update/${id}`, updatedUser);
export const forgotPassword = (details) => API.post(`/users/forgotPassword`, details);
export const resetPassword = (id, details) => API.patch(`/users/reset/${id}`, details);
export const updatePassword = (id, formData) => API.patch(`/users/security/${id}`, formData);
export const deleteUser = (id) => API.delete(`/users/${id}`);