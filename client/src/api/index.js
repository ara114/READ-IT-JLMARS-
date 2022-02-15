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
export const deleteStory = (id) => API.delete(`/stories/${id}`);

export const login = (formData) => API.post('/users/login', formData);
export const signup = (formData) => API.post('/users/signup', formData);