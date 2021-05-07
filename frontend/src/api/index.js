import axios from "axios"
require("dotenv").config();

//REMINDER: Replace the baseURL at a later point when this is deployed. Currently we can have it localhost
export default axios.create ({
    baseURL: (process.env.NODE_ENV === "production" ? "https://samplecompany-health-check.herokuapp.com/" : "http://localhost:5000/api/v1/")
});
