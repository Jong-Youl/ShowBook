import { localAxios } from '../utils/http-commons';
import { multiAxios } from '../utils/multipart-common';
import { jwtDecode } from 'jwt-decode';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const RECOM_URL = process.env.REACT_APP_RECOM_URL;

const local = localAxios();
const multi = multiAxios();

export const fetchShook = async () => {
  try {
    const memberId = jwtDecode(localStorage.getItem('accessToken')).id;
    const response = await local.get(
      `${RECOM_URL}/ml/api/shook/recommend/${memberId}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching shook:', error);
    throw error;
  }
};

export const likeShook = ({ shookId }) => {
  try {
    local.post(
      `${BASE_URL}/api/shook/likes/${shookId}`,
      {},
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
        },
      },
    );
    return true;
  } catch (error) {
    console.error('ERROR posting shook like: ', error);
    throw error;
  }
};

export const postShook = async ({ data, image }) => {
  try {
    const requestData = new FormData();
    requestData.append(
      'data',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );
    requestData.append('image', image);
    await multi.post(`${BASE_URL}/api/shook`, requestData, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
      },
    });
    return true;
  } catch (error) {
    console.error('ERROR posting shook: ', error);
    throw error;
  }
};
