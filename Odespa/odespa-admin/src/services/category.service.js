
import { API_PATHS } from "../utils/api.constants";
import apiService from "./apicall.service";


class CategoriesService {
  static getcategories(data) {
    return apiService.get( `${API_PATHS.getcategories}?page=${data.page}&limit=${data.limit}`);
  }

  static updatecategories( data) {
    return apiService.patch(`${API_PATHS.updatecategories}`, data);
  }

  static createcategories(data) {
    return apiService.post( API_PATHS.createcategories, data);
  }
  static viewcategories(id) {
    return apiService.get(`${API_PATHS.getcategories}?id=${id}`);
  }
  static getcategoriesbyoutlet(data) {
    return apiService.get(`${API_PATHS.getcategoriesbyoutlet}?outletId=${data?.outletId}&page=${data?.page}&limit=${data?.limit}`);
  }

}

export default CategoriesService;
