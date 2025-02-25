import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/fetchAllTasks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/addTask`, { task });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
    }
};
