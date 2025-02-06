import axios from 'axios';
import { API_PATHS } from '../utils/api.constants';

class AuthService {
  static login(item) {
    return axios
      .post(API_PATHS.API_BASE_URL + API_PATHS.adminlogin, item)

      .then((response) => {
        if (response.data) {
          localStorage.setItem('userdata', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}

export default AuthService;
