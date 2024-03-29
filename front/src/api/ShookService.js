import { localAxios } from '../utils/http-commons';
// import { multiAxios } from '../utils/multipart-common';
import { jwtDecode } from 'jwt-decode';
// import { bool } from 'prop-types';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const RECOM_URL = process.env.REACT_APP_RECOM_URL;

const local = localAxios();
// const multi = multiAxios();

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

// export const postShook = async () => {
//   try {
//     await multi.post(`${BASE_URL}/api/shook`, {
//       headers: {
//         'Authorization': localStorage.getItem('accessToken'),
//       },
//     });
//   } catch (error) {
//     console.error('ERROR posting shook: ', error);
//     throw error;
//   }
// };
