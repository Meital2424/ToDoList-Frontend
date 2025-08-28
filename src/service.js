import axios from 'axios';

// הגדרת ברירת מחדל של כתובת הבסיס (Config Defaults)
axios.defaults.baseURL = 'http://localhost:5101'; // שימי לב - צריך לוודא שזה הפורט שבו רץ ה-API שלך
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptor לשגיאות
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

const service = {
  // שליפת משימות
  getTasks: async () => {
    const result = await axios.get('/tasks');
    return result.data;
  },

  // הוספת משימה
  addTask: async (name) => {
    console.log('addTask', name);
    const result = await axios.post('/tasks', { name, isCompleted: false });
    return result.data;
  },

  // עדכון סטטוס השלמה של משימה
  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });

    // תחילה נשלוף את המשימה הקיימת (כדי לשמור על ה-Name הקיים)
    const { data: existingTask } = await axios.get('/tasks');
    const taskToUpdate = existingTask.find(t => t.id === id);

    if (!taskToUpdate) throw new Error('Task not found');

    const updated = {
      ...taskToUpdate,
      isCompleted: isComplete
    };

    await axios.put(`/tasks/${id}`, updated);
  },

  // מחיקת משימה
  deleteTask: async (id) => {
    console.log('deleteTask', id);
    await axios.delete(`/tasks/${id}`);
  }
};
export default service;