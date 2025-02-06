
import { API_PATHS } from "../utils/api.constants";
import apiService from "./apicall.service";


class CityService {
  static getcities() {
    return apiService.get( API_PATHS.getcities);
  }

  static updatecity( data) {
    return apiService.patch(`${API_PATHS.updatecity}`, data);
  }

  static createcity(data) {
    return apiService.post( API_PATHS.createcity, data);
  }
  static viewcity(id) {
    return apiService.get(`${API_PATHS.getcities}?id=${id}`);
  }
}

export default CityService;
