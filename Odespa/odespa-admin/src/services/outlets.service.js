
import { API_PATHS } from "../utils/api.constants";
import apiService from "./apicall.service";


class OutletService {
  static getoutlets(data) {
    return apiService.get( `${API_PATHS.getoutlets}?page=${data.page}&limit=${data.limit}`);
  }

  static updateoutlets( data) {
    return apiService.patch(`${API_PATHS.updateoutlets}`, data);
  }

  static createoutlets(data) {
    return apiService.post( API_PATHS.createoutlets, data);
  }
  static viewoutlets(id) {
    return apiService.get(`${API_PATHS.getoutlets}?id=${id}`);
  }
}

export default OutletService;
