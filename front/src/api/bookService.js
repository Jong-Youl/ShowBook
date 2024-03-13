import apiClient from '../api';

export const fetchBookRecommendations = ({ authToken, refreshToken }) => {
    return apiClient.get('/api/book/recommend', { authToken, refreshToken });
};
