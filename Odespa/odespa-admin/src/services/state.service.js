import { API_PATHS } from '../utils/api.constants';
import apiService from './apicall.service';

class StateService {
  static getstates() {
    return apiService.get( API_PATHS.getstates);
  }

  static getstatesbycountry(id) {
    return apiService.get(`${API_PATHS.getstatebycountry}/?country_id=${id}`);
  }

  static updatestate(  data) {
    return apiService.patch(`${API_PATHS.updatestate}`, data);
  }

  static createstate(data) {
    return apiService.post( API_PATHS.createstate, data);
  }

  static viewstate(id) {
    return apiService.get(`${API_PATHS.getstates}?id=${id}`);
  }
 
 
}

export default StateService;
