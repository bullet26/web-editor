/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState, FC } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import DOMPurify from 'dompurify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js/dist/Draft.css'
import s from './DraftEditor.module.scss'

interface DraftEditorProps {
  defaultValue?: string
  placeholder?: string
  editorStyle?: object
  id?: string
  onChange: (inputText: string, id?: string) => void
}

export const DraftEditor: FC<DraftEditorProps> = (props) => {
  const { defaultValue, placeholder, editorStyle, onChange, id } = props

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    if (defaultValue) {
      const blocksFromHtml = htmlToDraft(defaultValue)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentStateFromHTML = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorStateInitial = EditorState.createWithContent(contentStateFromHTML)
      setEditorState(editorStateInitial)
    }
  }, [])

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const html = draftToHtml(rawContentState)
    // XSS sanitizer for HTML,
    const cleanHTML = DOMPurify.sanitize(html, {
      ALLOWED_URI_REGEXP: /^(blob:)?https?:/i,
    })
    onChange(cleanHTML, id)
  }, [editorState])

  const uploadImageCallBack = (fileInput: Blob | MediaSource) => {
    const localSrc = URL.createObjectURL(fileInput)
    // TODO - upload
    return new Promise((resolve, reject) => {
      resolve({ data: { link: localSrc } })
    })
  }

  // exclude 'image' from options
  return (
    <Editor
      toolbar={{
        options: [
          'inline',
          'blockType',
          'fontSize',
          'fontFamily',
          'list',
          'textAlign',
          'colorPicker',
          'link',
          'embedded',
          'emoji',
          'remove',
          'history',
        ],
        image: { previewImage: true, uploadCallback: uploadImageCallBack },
        inputAccept:
          'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel',
      }}
      editorState={editorState}
      placeholder={placeholder}
      onEditorStateChange={setEditorState}
      editorClassName={s.paragraph}
      editorStyle={{ height: 'fit-content', ...editorStyle }}
      wrapperStyle={{ width: '100%', maxHeight: '100%' }}
    />
  )
}
