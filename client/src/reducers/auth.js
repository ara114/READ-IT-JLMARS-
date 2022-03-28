// import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, otherUsers: null }, action) => {
  switch (action.type) {

    case 'FETCH_USER':

      return { ...state, otherUsers: action.payload, authData: action.data, loading: false, errors: null, errorSignUp: null }

    case 'AUTH':
      
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null, errorSignUp: null };

    case 'AUTH-FAIL':

      return { errors: action.payload };

    case 'AUTH-FAILS':

      return { errorSignUp: action.payload };

    case 'FORGOT-FAIL':

      return { error: action.payload };

    case 'RESET-FAIL':

      return { errorss: action.payload }; 

    case 'CHANGE-FAIL':

      return { errorsss: action.payload, errorssss: null };  

    case 'LOGINMOD':

      return { ...state, authData: action.data, loading: false, moderror: null };

    case 'LOGINMOD-FAIL':

      return { moderror: action.payload };

    case 'UPDATE':
      // localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      const user = JSON.parse(localStorage.getItem('profile'));
      return user._id === action.payload._id ? action.payload : user;
    case 'LOGOUT':
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    
    case 'FORGOT':
      return { ...state, authData: action.payload, loading: false, error: null };
    
    case 'RESET':
      return { ...state, authData: action.payload, loading: false, error: null, errorss: null };
    case 'DELETE-FAIL':
      return { errorssss: action.payload, errorsss: null };  
    default:
      return state;
  }
};

export default authReducer;