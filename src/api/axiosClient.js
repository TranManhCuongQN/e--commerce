import axios from 'axios';

// trong create truyền vào những config
const axiosClient = axios.create({
  // tức là khi gọi API luôn luôn bắt đầu bằng 1 cái đường dẫn nó khác là chỉ khác cái path name thôi (khi mình gọi API thì mình chỉ cần chỉ định cái phía sau thôi)
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'Content-Type': 'application/JSON',
  },
});

//* Interceptors
// mình muốn làm cái gì đấy cho tất cả các request hoặc cho tất cả các response mình có thể gắn cái Interceptors này vào
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('Error response:', error.response);
    const { config, status, data } = error.response;
    const URLs = ['/auth/local/register', '/auth/local'];
    if (URLs.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message);
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
