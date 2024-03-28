import { localAxios } from '../utils/http-commons';

const axios = localAxios();
const BASE_URL = process.env.REACT_APP_BASE_URL

class BookService {
  async getBookDetail(book_id) {
    try {
      const res = await axios.get(`${BASE_URL}/api/book/${book_id}`,
        {headers : {
          "Authorization" : localStorage.getItem("accessToken")
          },withCredentials: true })
      return res.data;
    } catch (error) {
      alert('');
      console.error(error);
    }
  }

}

export {BookService};

