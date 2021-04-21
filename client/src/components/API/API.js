import axios from "axios";
export default {
  getEmployees: function() {
    return axios.get("http://localhost:5000/employee")
  }
};