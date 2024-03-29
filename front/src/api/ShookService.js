import { localAxios } from '../utils/http-commons';
// import { shookDataPropTypes } from '../types/shooksPropTypes';
// import { multiAxios } from '../utils/multipart-common';

const local = localAxios();
const BASE_URL = process.env.REACT_APP_BASE_URL;

// class ShookService {
//   async fetchShookList() {
//     try {
//       const res = await local.get(`${BASE_URL}/api/shook`, {
//         headers: {
//           'Authorization': localStorage.getItem('accessToken'),
//         },
//         withCredentials: true,
//       });
//       return res.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
//
// export { ShookService };

// export class ShookService {
//   fetchShook() {
//     console.log('GET SHOOK TRY');
//     local
//       .get(
//         `/api/shook`,
//         {
//           headers: {
//             'Authorization': localStorage.getItem('accessToken'),
//           },
//         },
//         { withCredentials: true },
//       )
//       .then((res) => {
//         console.log('GET SHOOK SUCCESS');
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((error) => {
//         console.log('GET SHOOK ERROR');
//         console.error(error);
//       });
//   }
// }
// const multi = multiAxios();

// export const likeShook = ({ authToken, refreshToken }) => {
//   local
//     .post(
//       `/api/shook/likes/${shookId}`,
//       {
//         headers: {
//           'Authorization': localStorage.getItem('accessToken'),
//         },
//       },
//       { withCredentials: true },
//     )
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// TODO : Flask 서버로 바꿈
// export const fetchShook = () => {
//   console.log('GET SHOOK TRY');
//   local
//     .get(
//       `/api/shook`,
//       {
//         headers: {
//           'Authorization': localStorage.getItem('accessToken'),
//         },
//       },
//       { withCredentials: true },
//     )
//     .then((res) => {
//       console.log('GET SHOOK SUCCESS');
//       console.log(res.data);
//       return res.data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

export const fetchShook = async () => {
  try {
    const response = await local.get(`${BASE_URL}/api/shook`, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
      },
    });
    console.log('FETCH ');
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching shook:', error);
    throw error;
  }
};
// export const postShook = () => {
//   multi
//     .post(
//       `/api/shook`,
//       {
//         headers: {
//           'Authorization': localStorage.getItem('accessToken'),
//         },
//       },
//       { withCredentials: true },
//     )
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
