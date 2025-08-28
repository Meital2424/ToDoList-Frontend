import axios from 'axios';

const apiUrl = "https://localhost:7097";

const service = {
  getTasks: async () => {
    try {
      const result = await axios.get(`${apiUrl}/tasks`);
      return result.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  addTask: async (item) => {
    try {
      const result = await axios.post(`${apiUrl}/tasks`, item);
      return result.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  setCompleted: async (id, item) => {
    try {
      const result = await axios.put(`${apiUrl}/tasks/${id}`, item, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return result.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};


export default service;
