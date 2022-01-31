import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchStories = () => API.get('/stories');
export const createStory = (newStory) => API.post('/stories', newStory);
export const likeStory = (id) => API.patch(`/stories/${id}/likeStory`);
export const deleteStory = (id) => API.delete(`/stories/${id}`);

export const login = (formData) => API.post('/users/login', formData);
export const signup = (formData) => API.post('/users/signup', formData);