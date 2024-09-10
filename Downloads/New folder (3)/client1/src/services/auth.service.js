import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../utils/api.contants";


let logoutTimer;

class AuthService {
    static login(item) {
        return axios
            .post(API_PATHS.login, item)
            .then((response) => {
                if (response) {
                    const userData = response.data;
                    localStorage.setItem("user", JSON.stringify(userData));
                    // Set logout timer                 

const expiryTimeInSeconds = userData.expiryTime;

// Convert the expiration time from seconds to milliseconds
const expiryTimeInMilliseconds = expiryTimeInSeconds * 1000;

// Calculate the current time
const currentTime = Date.now();

// Calculate the remaining time until expiry in milliseconds
const remainingTime = expiryTimeInMilliseconds - currentTime;
                 AuthService.setLogoutTimer(remainingTime);
                }
                return response.data;
            });
    }

    static signup(item) {
        return axios
            .post(API_PATHS.signup, item)
            .then((response) => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    static getProfile() {
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user?.data?.accessToken; // Access token from the user data
        const config = {
            headers: {
                "access-token": token,
            },
        };
        return axios
            .get(API_PATHS.Getprofile, config)
            .then((response) => {
                if (response.data) {
                    // Do something with the response if needed
                }
                return response.data;
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // Token expired or unauthorized, log the user out
                    AuthService.logout();
                }
                throw error;
            });
    }

    static removeUserDetails() {
        localStorage.removeItem("user");
    }

    static getUserDetails() {
        return JSON.parse(localStorage.getItem("user"));
    }

    static logout() {
        AuthService.removeUserDetails();
        clearTimeout(logoutTimer);
        // Add additional logic here if needed, such as redirecting to login page
    }

    static setLogoutTimer(expirationTime) {
        logoutTimer = setTimeout(() => {
            AuthService.logout();
        }, expirationTime);
    }
}

export default AuthService;
