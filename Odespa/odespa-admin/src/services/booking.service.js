
import { API_PATHS } from "../utils/api.constants";
import apiService from "./apicall.service";


class BookingService {
  static getbookings(data) {
    return apiService.get( `${API_PATHS.getbookings}?page=${data.page}&limit=${data.limit}`);
  }
  static getguests(data) {
    return apiService.get( `${API_PATHS.getguests}?page=${data.page}&limit=${data.limit}`);
  }

}

export default BookingService;
