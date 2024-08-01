import axios from 'axios';
import { store } from '../store';
import { setCredentials } from '../../features/auth/authSlice';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true // Important for cookies
});

apiClient.interceptors.request.use(
    async (config) => {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        const originalRequest = config;

        if (response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await apiClient.get('/auth/refresh');
                store.dispatch(setCredentials({ accessToken: data.accessToken }));
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure
                console.error('Refresh token error:', refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
