
import { API_PATHS } from "../utils/api.constants";
import apiService from "./apicall.service";


class ServicesService {
  static getservices(data) {
    if(data){
    return apiService.get( `${API_PATHS.getservices}?page=${data.page}&limit=${data.limit}`);
  }else{
    return apiService.get( `${API_PATHS.getservices}`)
  }
}


  static updateservices( data) {
    return apiService.patch(`${API_PATHS.updateservices}`, data);
  }

  static createservices(data) {
    return apiService.post( API_PATHS.createservices, data);
  }
  static viewservices(id) {
    return apiService.get(`${API_PATHS.getservices}?id=${id}`);
  }
  static getservicesbyoutlet(data) {
    return apiService.get(`${API_PATHS.getservicesbyoutlet}?outletId=${data?.outletId}&page=${data?.page}&limit=${data?.limit}`);
  }

}

export default ServicesService;
