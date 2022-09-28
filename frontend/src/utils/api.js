import axios from "axios";

class Api {
  constructor() {}

  GET = async (endpoint, config = {}) => {
    try {
      const response = await axios.get(endpoint, config);

      return response;
        
    } catch (error) {
      console.error("Error @GET", error);
      
      return error;
    }
      
  }

  POST = async (endpoint, data, config = {}) => {
    try {
      const response = await axios.post(endpoint, data, config);
        
      return response;
    } catch (error) {
      console.error("Error @Api.POST", error);

      return error;
    }
    
  }

  setRequestHeaders = (headers) => {
    return {
      headers
    }
  }
  
}

export default Api
