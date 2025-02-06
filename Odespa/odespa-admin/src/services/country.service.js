import { API_PATHS } from '../utils/api.constants';
import apiService from './apicall.service';

class CountryService {
  static getcountries() {
    return apiService.get( API_PATHS.getcountries);
  }
  static updatecountry(data) {
    return apiService.patch(`${API_PATHS.updatecountry}`, data);
  }

  static createcountry(data) {
    return apiService.post( API_PATHS.createcountry, data);
  }

  static viewcountry(id) {
    return apiService.get(`${API_PATHS.getcountries}?id=${id}`);
  }
  
}

export default CountryService;
