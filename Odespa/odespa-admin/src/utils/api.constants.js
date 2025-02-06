 //const API_BASE_URL = "http://ec2-3-109-139-233.ap-south-1.compute.amazonaws.com:8080/api/v1";
 const  API_BASE_URL= "http://localhost:8081/api/v1"
 //const  API_BASE_URL= "https://ode-spa-backend.onrender.com/api/v1"


export const API_PATHS = {
    API_BASE_URL,
    adminlogin: "/admin/login",
      //countries
      getcountries:"/admin/country/get",
      createcountry:"/admin/country/create",
      updatecountry :"/admin/country/update",
  // states
      getstates:"/admin/state/get",
      getstatebycountry:"/admin/states-by-country",
      createstate:"/admin/state/create",
      updatestate :"/admin/state/update",

    //banners
    getbanners:"/admin/banners/get",
    createbanner:"/admin/banner/create",
    updatebanner :"/admin/banner/update",

    //cities
    getcities:"/admin/cities/get",
    createcity:"/admin/city/create",
    updatecity :"/admin/city/update",
//services
getservices:"/admin/services/get",
createservices:"/admin/services/create",
updateservices :"/admin/services/update",
getservicesbyoutlet:"/admin/services-by-outlet/get",

//categories
getcategories:"/admin/categories/get",
createcategories:"/admin/categories/create",
updatecategories :"/admin/categories/update",
getcategoriesbyoutlet:"/admin/categories-by-outlet/get",
//outlets
getoutlets:"/admin/outlets/get",
createoutlets:"/admin/outlets/create",
updateoutlets :"/admin/outlets/update",

getbookings:"/admin/bookings/list",
getguests :"/admin/guest/list",

getusers :"/admin/users/list",
   
 

};