import axios from "axios";

class Api {
  constructor() {}

  GET = async (endpoint, config = {}) => {
    try {
      
      const response = await axios.get(endpoint, config);
  
      return response;
    } catch (error) {
      // debug error here
    }
      
  }

  POST = async (endpoint, data, config = {}) => {
    try {
      
      const response = await axios.post(endpoint, data, config);

      return response;
    } catch (error) {
      // debug error here
    }
    
  }

  DELETE = async (endpoint, data, config = {}) => {
    try {
      
      const response = await axios.delete(endpoint, data, config);

      return response;
    } catch (error) {
      // debug error here
    }
    
  }

  PUT = async (endpoint, data, config = {}) => {
    try {
      
      const response = await axios.put(endpoint, data, config);

      return response;
    } catch (error) {
      // debug error here
    }
    
  }

  PATCH = async (endpoint, data, config = {}) => {
    try {
      
      const response = await axios.patch(endpoint, data, config);

      return response;
    } catch (error) {
      // debug error here
    }
    
  }

  setRequestHeaders = (headers) => {
    return {
      headers
    }
  }
  
}

export default Api
