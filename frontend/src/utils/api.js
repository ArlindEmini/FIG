import axios from "axios";

class Api {
  constructor() {}

  GET = async (endpoint, config = {}) => {

    const response = await axios.get(endpoint, config);

    return response;
      
  }

  POST = async (endpoint, data, config = {}) => {

    const response = await axios.post(endpoint, data, config);
        
    return response;
    
  }

  setRequestHeaders = (headers) => {
    return {
      headers
    }
  }
  
}

export default Api
