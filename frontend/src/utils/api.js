import axios from "axios";

class Api {
  constructor() {}

  GET = async (endpoint, config) => {
    try {
      const response = await axios.get(endpoint, config);

      return response;
        
    } catch (error) {
      return error
    }
      
  }

  POST = async (endpoint, data, config = {}) => {
    try {
      const response = await axios.post(endpoint, data, config);
        
      return response;
    } catch (error) {
      return error;
    }
    
  }
  
}

export default Api