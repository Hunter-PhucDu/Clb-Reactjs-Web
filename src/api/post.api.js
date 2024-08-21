import { AxiosAuth } from '../services/AxiosService';

const addPost = async (formData) => {
  try {
    const response = await AxiosAuth.post('/posts', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const updatePost = async (postId, formData) => {
  try {
    const response = await AxiosAuth.put(`/posts/update/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getPost = async (postId) => {
  try {
    const response = await AxiosAuth.get(`/posts/details/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const publishPost = async (postId) => {
  try {
    const response = await AxiosAuth.put(`/posts/publish/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const getPosts = async () => {
  try {
    const response = await AxiosAuth.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const searchPosts = async (searchParams = {}) => {
  try {
    const response = await AxiosAuth.get('/posts/search', { params: searchParams });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const deletePost = async (postId) => {
  try {
    const response = await AxiosAuth.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

const postServiceAPI = {
  addPost,
  updatePost,
  getPost,
  publishPost,
  getPosts,
  searchPosts,
  deletePost,
};

export default postServiceAPI;
// import axios from 'axios';

// // Tạo một instance của axios với cấu hình cơ bản
// const AxiosAuth = axios.create({
//   baseURL: 'http://your-api-url.com', // Đặt URL cơ sở cho API của bạn
//   headers: {
//     'Content-Type': 'application/json', // Tiêu đề mặc định cho tất cả các yêu cầu
//   },
// });

// // Hàm để thêm token xác thực vào tiêu đề
// const addAuthToken = (token) => {
//   if (token) {
//     AxiosAuth.defaults.headers['Authorization'] = `Bearer ${token}`;
//   }
// };

// // Thực hiện yêu cầu POST để thêm bài viết
// const addPost = async (formData, token) => {
//   try {
//     addAuthToken(token); // Thêm token vào tiêu đề
//     const response = await AxiosAuth.post('/posts', formData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Thực hiện yêu cầu PUT để cập nhật bài viết
// const updatePost = async (postId, formData, token) => {
//   try {
//     addAuthToken(token); // Thêm token vào tiêu đề
//     const response = await AxiosAuth.put(`/posts/update/${postId}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Thực hiện yêu cầu GET để lấy thông tin bài viết
// const getPost = async (postId, token) => {
//   try {
//     addAuthToken(token); // Thêm token vào tiêu đề
//     const response = await AxiosAuth.get(`/posts/details/${postId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Thực hiện yêu cầu PUT để công bố bài viết
// const publishPost = async (postId, token) => {
//   try {
//     addAuthToken(token); // Thêm token vào tiêu đề
//     const response = await AxiosAuth.put(`/posts/publish/${postId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Thực hiện yêu cầu GET để lấy danh sách bài viết
// const getPosts = async (token) => {
//   try {
//     addAuthToken(token); // Thêm token vào tiêu đề
//     const response = await AxiosAuth.get('/posts');
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Thực hiện yêu cầu GET để tìm kiếm bài viết
// const searchPosts = async (searchParams = {}, token) => {
//   try {
//     addAuthToken(token); // Thêm token vào tiêu đề
//     const response = await AxiosAuth.get('/posts/search', { params: searchParams });
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Thực hiện yêu cầu DELETE để xóa bài viết
// const deletePost = async (postId, token) => {
//   try {
//     addAuthToken(token); // Thêm token vào tiêu đề
//     const response = await AxiosAuth.delete(`/posts/${postId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Xử lý lỗi API
// const handleApiError = (error) => {
//   // Kiểm tra lỗi từ phản hồi của server
//   if (error.response) {
//     // Lỗi trả về từ server
//     console.error('Lỗi API:', error.response.data);
//     throw new Error(error.response.data.message || 'Đã xảy ra lỗi khi kết nối với API.');
//   } else if (error.request) {
//     // Không có phản hồi từ server
//     console.error('Yêu cầu không được phản hồi:', error.request);
//     throw new Error('Không nhận được phản hồi từ server.');
//   } else {
//     // Lỗi khác
//     console.error('Lỗi:', error.message);
//     throw new Error(error.message || 'Đã xảy ra lỗi.');
//   }
// };

// const postServiceAPI = {
//   addPost,
//   updatePost,
//   getPost,
//   publishPost,
//   getPosts,
//   searchPosts,
//   deletePost,
// };

// export default postServiceAPI;
