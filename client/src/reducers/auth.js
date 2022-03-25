// import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case 'AUTH':
      
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };

    case 'AUTH-FAIL':

      return { errors: action.payload };

    case 'FORGOT-FAIL':

      return { error: action.payload };

    case 'RESET-FAIL':

      return { errorss: action.payload };  

    case 'LOGINMOD':

      return { ...state, authData: action.data, loading: false, errors: null };

    case 'UPDATE':
      // localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      const user = JSON.parse(localStorage.getItem('profile'));
      return user._id === action.payload._id ? action.payload : user;
    case 'LOGOUT':
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    
    case 'FORGOT':
      return { ...state, authData: action.payload, loading: false, error: null };
    default:
      return state;
  }
};

export default authReducer;