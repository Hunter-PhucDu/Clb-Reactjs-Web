import React, { useState, useMemo } from 'react'
import {
  CButton,
  CCardBody,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import JoditEditor from 'jodit-react'
import PostService from '../../../services/PostService'
import './index.scss'

const BasePostEditor = ({ notify }) => {
  const [errMsg, setErrMsg] = useState({})
  const [statusMessage, setStatusMessage] = useState('')
  const [postData, setPostData] = useState({
    title: "",
    richTextContent: "",
    author: "CLB Lập Trình UTB"
  })

  const onChangePost = (e) => {
    const { name, value } = e.target
    setPostData({
      ...postData,
      [name]: value
    })
    setErrMsg({ ...errMsg, [name]: '' })
  }

  const onRichTextChange = (content) => {
    setPostData({
      ...postData,
      richTextContent: content,
    })
    setErrMsg({ ...errMsg, richTextContent: '' })
  }

  const validatePostData = () => {
    const errors = {}

    if (!postData.title.trim()) {
      errors.title = "Tiêu đề không được để trống."
    }

    if (!postData.richTextContent.trim()) {
      errors.richTextContent = "Nội dung không được để trống."
    }

    if (!postData.author.trim()) {
      errors.author = "Tác giả không được để trống."
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validatePostData()
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors)
      return
    }

    try {
      console.log("Post data: ", postData)
      await PostService.addPost(postData)
      notify('Bài viết đã được lưu thành công!', 'success')
      setStatusMessage('Bài viết đã được lưu thành công!')
    } catch (error) {
      const errorMessage = 'Có lỗi xảy ra khi lưu bài viết.'
      notify(errorMessage, 'ERROR')
      setStatusMessage(errorMessage)
    }
  }


  const editorConfig = useMemo(() => ({
    readonly: false,
    toolbar: true,
    uploader: {
      insertImageAsBase64URI: false,
    },
    height: 500,
  }), [])


  return (
    <div className="add-post-container">
      <CContainer>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <h1>Tạo bài viết</h1>
            <p className="text-body-secondary">Tạo bài viết mới</p>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                name="title"
                placeholder="Tiêu đề của bài viết"
                autoComplete="title"
                value={postData.title}
                onChange={onChangePost}
              />
            </CInputGroup>
            {errMsg.title && <div className="text-danger mb-3">{errMsg.title}</div>}

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                name="author"
                placeholder="Tác giả"
                autoComplete="author"
                value={postData.author}
                onChange={onChangePost}
              />
            </CInputGroup>
            {errMsg.author && <div className="text-danger mb-3">{errMsg.author}</div>}

            <JoditEditor
              value={postData.richTextContent}
              config={editorConfig}
              onBlur={onRichTextChange}
            />
            {errMsg.richTextContent && <div className="text-danger mb-3">{errMsg.richTextContent}</div>}

            <div className="d-grid">
              <CButton color="success" type="submit">Lưu bài viết</CButton>
            </div>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </CForm>
        </CCardBody>
      </CContainer>
    </div>
  )
}

export default BasePostEditor
