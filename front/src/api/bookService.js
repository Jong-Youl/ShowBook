import apiClient from '../api';
import { localAxios } from '../utils/http-commons';
const axios = localAxios();

export const fetchBookRecommendations = ({ authToken, refreshToken }) => {
    return apiClient.get('/api/book/recommend', { authToken, refreshToken });
};

