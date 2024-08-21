import React, { useState, useCallback, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import postServiceAPI from '../../../api/post.api';
import './index.scss'; // Import file SCSS

const BasePostEditor = () => {
  const [errMsg, setErrMsg] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [postData, setPostData] = useState({
    title: "",
    richTextContent: "",
    author: "CLB Lập Trình UTB"
  });

  // Hàm cập nhật nội dung từ editor
  const handleEditorChange = useCallback((content) => {
    setPostData((prevData) => ({
      ...prevData,
      richTextContent: content,
    }));
    setErrMsg((prevErr) => ({ ...prevErr, richTextContent: '' }));
  }, []);

  // Hàm xử lý nhập liệu của form
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrMsg((prevErr) => ({ ...prevErr, [name]: '' }));
  }, []);

  // Hàm gửi dữ liệu
  const handleSubmit = async () => {
    try {
      console.log("Dữ liệu gửi đi: ", postData);
      const response = await postServiceAPI.addPost(postData);
      console.log("Dữ liệu trả về: ", response);
      setStatusMessage('Bài viết đã được lưu thành công!');
    } catch (error) {
      console.error("Lỗi khi lưu bài viết:", error);
      setStatusMessage('Có lỗi xảy ra khi lưu bài viết.');
    }
  };

  // Cấu hình Jodit Editor
  const editorConfig = useMemo(() => ({
    readonly: false,
    toolbar: true,
    uploader: {
      insertImageAsBase64URI: true, // hỗ trợ tải ảnh trực tiếp dưới dạng Base64
    },
    height: 500,
  }), []);

  return (
    <div className='new-container'>
      <h1>Tạo bài viết mới</h1>
      <input
        type="text"
        name="title"
        placeholder="Tiêu đề"
        value={postData.title}
        onChange={handleInputChange}
      />
      <JoditEditor
        value={postData.richTextContent}
        onChange={handleEditorChange}
        config={editorConfig}
      />
      <button onClick={handleSubmit}>Lưu bài viết</button>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default BasePostEditor;
