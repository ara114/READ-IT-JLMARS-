import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchStories = () => API.get('/stories');
export const createStory = (newStory) => API.post('/stories', newStory);
export const likeStory = (id) => API.patch(`/stories/${id}/likeStory`);
export const reviewStory = (value, id) => API.post(`/stories/${id}/reviewStory`, {value});
export const reportStory = (id) => API.patch(`/stories/${id}/reportStory`);
export const unreportStory = (id) => API.patch(`/stories/${id}/unreportStory`);
export const deleteStory = (id) => API.delete(`/stories/${id}`);

export const login = (formData) => API.post('/users/login', formData);
export const signup = (formData) => API.post('/users/signup', formData);

export const loginMod = (formData) => API.post('/moderator/loginMod', formData);

export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);