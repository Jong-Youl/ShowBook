import { localAxios } from '../utils/http-commons';
const axios = localAxios();
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 읽고 싶은 책 등록
export const createWishBook = (bookId) => {
  try {
    axios.post(
      `${BASE_URL}/api/library/registration`,
      {},
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
        },
        params: { book_id: bookId },
      },
    );
    //console.log('response.data 타입확인 : ' + typeof response.data);
    console.log('bookId 확인: ' + bookId);
    //return response;
  } catch (error) {
    console.error('Error fetching shook:', error);
    throw error;
  }
};

// 서재별 책 조회
export const getAllbooks = async (readStatus) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/library`, {
      params: { read_status: readStatus },
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
      },
    });
    console.log('FETCH ');
    //console.log('response.data 타입확인 : ' + typeof response.data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching shook:', error);
    throw error;
  }
};

// 서재 간 책 이동
// Todo: RequestBody 추가
export const moveBooks = (readStatus) => {
  axios
    .patch(
      `/api/library?read_status=${readStatus}`,
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
        },
        data: {},
      },
      { withCredentials: true },
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// 서재 내 책 삭제
export const deleteBook = (bookId) => {
  axios.delete(`${BASE_URL}/api/library`, {
    params: { book_id: bookId },
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
    },
  });
};

export const fetchAllLibrary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/library/all`, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all library:', error);
    throw error;
  }
};

export const fetchAllLibraryByQuery = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/library/search?query=${query}`,
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all library by query:', error);
    throw error;
  }
};
