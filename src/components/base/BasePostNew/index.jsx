import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const BasePostEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async () => {
    const response = await fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content,
        author: 'admin'
      })
    });
    if (response.ok) {
      // Handle success
    }
  };

  return (
    <div>
      <h1>Tạo bài viết mới</h1>
      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        apiKey="your-tinymce-api-key"
        value={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: function (cb, value, meta) {
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = async function () {
              let file = this.files[0];
              let formData = new FormData();
              formData.append('file', file);

              let response = await fetch('/upload', {
                method: 'POST',
                body: formData
              });
              let data = await response.json();
              cb(data.filePath, { title: file.name });
            };
            input.click();
          }
        }}
        onEditorChange={handleEditorChange}
      />
      <button onClick={handleSubmit}>Lưu bài viết</button>
    </div>
  );
};

export default BasePostEditor;


//wysiwyg