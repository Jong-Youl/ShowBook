import { localAxios } from '../utils/http-commons';

const axios = localAxios();
const BASE_URL = process.env.REACT_APP_BASE_URL
const RECOM_URL = process.env.REACT_APP_RECOM_URL

class BookService {
  async getBookDetail(book_id) {
    try {
      const res = await axios.get(`${BASE_URL}/api/book/${book_id}`,
        {headers : {
          "Authorization" : localStorage.getItem("accessToken")
          },withCredentials: true })
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getRecommendedBook(memberId) {
    try {
      const res = await axios.get(`${RECOM_URL}/ml/api/book/recommend/${memberId}`)
      return res.data.data;
    } catch (error){
      console.error(error)
    }
  }

  async getPurchaseUrl(book_id) {
    try {
      const res = await axios.post(`${BASE_URL}/api/book/purchase/${book_id}`, {}
        ,{headers : {
            "Authorization" : localStorage.getItem("accessToken")
          },withCredentials: true })
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async doBookmark(book_id) {
    try {
      await axios.post(`${BASE_URL}/api/book/bookmark/${book_id}`, {}
        ,{headers : {
            "Authorization" : localStorage.getItem("accessToken")
          },withCredentials: true })
    } catch (error) {
      console.error(error);
    }
  }

  async deleteBookmark(book_id) {
    try {
      await axios.delete(`${BASE_URL}/api/book/bookmark/${book_id}`
        ,{headers : {
            "Authorization" : localStorage.getItem("accessToken")
          },withCredentials: true })
    } catch (error) {
      console.error(error);
    }
  }
}

export {BookService};

