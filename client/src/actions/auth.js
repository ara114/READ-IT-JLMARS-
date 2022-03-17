import * as api from '../api';

export const login = (formData, navigate) => async (dispatch) => {
 
    try {

        const { data } = await api.login(formData);

        dispatch({ type: 'AUTH', data});
        
        navigate('/home');
    } catch (error) {
        dispatch({ type: 'AUTH-FAIL', payload: error.response.data.message});
    }
};

export const signup = (formData,navigate) => async (dispatch) => {
 
    try {

        const { data } = await api.signup(formData);

        dispatch({ type: 'AUTH', data});


        navigate('/home');
    } catch (error) {
        console.log(error);
    }
}

export const loginMod = (formData,navigate) => async (dispatch) => {
 
    try {

        const { data } = await api.loginMod(formData);

        dispatch({ type: 'LOGINMOD', data});


        navigate('/modhome');
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (id, user) => async (dispatch) => {
    try {
      const { data } = await api.updateUser(id, user);
  
      dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
      console.log(error);
    }
  };