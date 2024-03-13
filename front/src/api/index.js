const HTTPMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

function handleError(response) {
  // 오류 처리를 위한 함수, 예를 들어 상태 코드에 따른 다른 동작을 수행할 수 있습니다.
  throw new Error(`${response.status}: ${response.statusText}`);
}

function requestServer(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          handleError(response);
        }
        return response.json(); // 성공적인 응답의 경우 JSON 파싱
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

const apiServer = {
  get: (url) =>
    requestServer(url, {
      method: HTTPMethods.GET,
      headers: {
        Authorization: 'Bearer your_access_token_here',
        RefreshToken: 'your_refresh_token_here',
      },
    }),

  post: (url, bodyObject) => {
    const body = JSON.stringify(bodyObject);
    return requestServer(url, {
      method: HTTPMethods.POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your_access_token_here',
        RefreshToken: 'your_refresh_token_here',
      },
      body,
    });
  },

  delete: (url) =>
    requestServer(url, {
      method: HTTPMethods.DELETE,
      headers: {
        Authorization: 'Bearer your_access_token_here',
        RefreshToken: 'your_refresh_token_here',
      },
    }),

  put: (url, bodyObject) => {
    const body = JSON.stringify(bodyObject);
    return requestServer(url, {
      method: HTTPMethods.PUT,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your_access_token_here',
        RefreshToken: 'your_refresh_token_here',
      },
      body,
    });
  },
};

export default apiServer;
