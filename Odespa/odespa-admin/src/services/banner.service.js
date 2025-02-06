
import { API_PATHS } from "../utils/api.constants";
import apiService from "./apicall.service";


class BannerService {
  static getbanners() {
    return apiService.get( API_PATHS.getbanners);
  }

  static updatebanner(data) {
    return apiService.patch(`${API_PATHS.updatebanner}`, data);
  }

  static createbanner(data) {
    return apiService.post( API_PATHS.createbanner, data);
  }


  static viewbanner(id) {
    return apiService.get(`${API_PATHS.getbanners}?id=${id}`);
  }
}

export default BannerService;
