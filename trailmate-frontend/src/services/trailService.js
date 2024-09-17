// src/services/trailService.js
import axios from 'axios';

// Define the base URL of your backend API
const baseURL = 'http://localhost:5000/api';

/**
 * searchTrails
 * This function sends a POST request to the backend to search for trails
 * based on a natural language query (e.g., "Find easy trails near Berkeley").
 * 
 * @param {string} query - The user's natural language search query.
 * @returns {Promise} - A promise that resolves to the list of trails.
 */
const searchTrails = async (query) => {
  try {
    const response = await axios.post(`${baseURL}/search/natural`, { query });
    return response.data;  // Return the list of trails from the backend.
  } catch (error) {
    console.error('Error fetching trails:', error);
    throw error;  // Rethrow the error to be handled by the calling component.
  }
};

/**
 * getTrailDetails
 * This function sends a GET request to fetch detailed information
 * about a specific trail based on its ID.
 * 
 * @param {string} id - The ID of the trail to fetch.
 * @returns {Promise} - A promise that resolves to the trail's details.
 */
const getTrailDetails = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/trails/${id}`);
    return response.data;  // Return trail details from the backend.
  } catch (error) {
    console.error('Error fetching trail details:', error);
    throw error;  // Handle error gracefully.
  }
};

// Export the service functions for use in components
export default { searchTrails, getTrailDetails };
