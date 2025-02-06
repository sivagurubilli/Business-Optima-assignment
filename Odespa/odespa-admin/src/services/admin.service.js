import axios from 'axios';
import { API_PATHS } from '../utils/api.constants';
import apiService from './apicall.service';

class AdminService {
static getRoles() {
    return apiService.get(API_PATHS.getroles);
  }

  static createRole(data) {
    return apiService.post(API_PATHS.createroles, data);
  }

  static updateRole({ id, data }) {
    return apiService.patch(`${API_PATHS.updateroles}/${id}`, data);
  }

  
  static viewrole(id) {
    return apiService.get(`${API_PATHS.viewrole}/${id}`);
  }

  static createAdmin(data) {
    return apiService.post(API_PATHS.createadmin, data);
  }

  static getAllAdmins() {
    return apiService.get(API_PATHS.getadmins);
  }
  static getAllUsers() {
    return apiService.get(API_PATHS.getusers);
  }
  static viewuser(id) {
    return apiService.get(`${API_PATHS.getusers}/${id}`);
  }


  static ChangeAdminPassword({id,data}) {
    return apiService.patch(`${API_PATHS.changeadminpassword}/${id}`,data);
  }
}
export default AdminService;
