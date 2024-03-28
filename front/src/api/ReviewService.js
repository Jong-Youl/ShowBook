import { localAxios } from '../utils/http-commons';
const axios = localAxios();
const BASE_URL = process.env.REACT_APP_BASE_URL

export const createBookReviews = (reviewInfo, bookId) => {
  const reviewRequest = {
    content : reviewInfo.content,
    createdAt : new Date(),
    rating : reviewInfo.rating
  }

  axios.post(`${BASE_URL}/api/review/${bookId}`, reviewRequest,{
  headers : {
    "Authorization" : localStorage.getItem("accessToken")
  }}
  )
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        window.history.back();
      }
    })
    .catch((error) => {
      // if (reviewInfo.content === '') {
      //   alert('한줄평을 입력해주세요!!');
      // }
      console.error(error)
    })
}

export const fetchBookReviewRating = async (bookId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/review/rating/${bookId}`, {
        headers: {
          "Authorization": localStorage.getItem("accessToken")
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error; 
    }
    
  }
  
// export const fetchBookReviews = ({ authToken, refreshToken,bookId }) => {
//   return apiClient.get(`/api/review/${bookId}`, {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//       RefreshToken: refreshToken
//     }
//   });
// };