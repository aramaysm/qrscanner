
export default class Services {
      

    //Routes
    static getAxiosConfig(token) {
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
          },
        };
        return axiosConfig;
      }
      static getAxiosConfigWithParams(token, param) {
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
          params: {
            id:param
          },
        };
    
        return axiosConfig;
      }

      
      static loginAdminUrl() {
        return apiUrl + "/auth/login/";
      }

      static authUserUrl() {
        return apiUrl + "/auth/user";
      }

      //Workers
      static getAllWorkersUrl() {
        return apiUrl + "/user";
      }
      static getAllWorkersNamesUrl() {
        return apiUrl + "/user/names";
      }
      static updateWorkersUrl() {
        return apiUrl + "/user/update/";
      }

      static changeStatusWorkersUrl(){
        return apiUrl + "/user/status/";
      }


      //Users
      static getAllUsersNamesUrl() {
        return apiUrl + "/user-details/names";
      }
      static changeStatusUsersUrl(){
        return apiUrl + "/user-details/status/";
      }
      static updateUserUrl() {
        return apiUrl + "/user-details/update/";
      }
      static getAllUsersUrl(){
        return apiUrl + "/user-details/";
      }


      ///Devices
      static getAllDevicesUrl() {
        return apiUrl + "/devices";
      }
      static changeStatusDevicesUrl(){
        return apiUrl + "/devices/status/";
      }

      static getAllUsersHandlerDevicesUrl() {
        return apiUrl + "/user-details/names";
      }

      //Roles
      static getAllRolesUrl() {
        return apiUrl + "/role";
      }

      static getDeviceHandlerCredentials(){
        return apiUrl + "/devices-handlers/getCredentials";
      }

      static isDeviceAllowed(){
        return apiUrl + "/devices-handlers/isAllowed";
      }

      static deviceAuth(){
        return apiUrl + "/devices/login/";
      }
}


let apiUrl = "https://iot-platform-api-nest.onrender.com";
let encripted_Token = '';

/*
"extra": {
      "eas": {
        "projectId": "14ad1e04-efc3-4a3f-bec5-1ea777a78032"
      }
    }
*/