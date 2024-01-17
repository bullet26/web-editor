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

interface DraftEditorProps {
  defaultValue?: string
  placeholder?: string
  editorClassName?: string
}

export const DraftEditor: FC<DraftEditorProps> = (props) => {
  const { defaultValue, editorClassName, placeholder } = props

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [convertedInHTMLContent, setConvertedInHTMLContent] = useState<TrustedHTML | string>('')

  useEffect(() => {
    if (defaultValue) {
      const blocksFromHtml = htmlToDraft(defaultValue)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentStateFromHTML = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorStateInitial = EditorState.createWithContent(contentStateFromHTML)
      setEditorState(editorStateInitial)
    }
  }, [defaultValue])

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const html = draftToHtml(rawContentState)
    const cleanHTML = DOMPurify.sanitize(html) // XSS sanitizer for HTML,
    setConvertedInHTMLContent(cleanHTML)
  }, [editorState])

  return (
    <Editor
      editorState={editorState}
      placeholder={placeholder}
      onEditorStateChange={setEditorState}
      editorClassName={editorClassName}
      editorStyle={{ height: 'fit-content' }}
      wrapperStyle={{ width: '100%', maxHeight: '100%' }}
      toolbar={{
        //  remove some default toolbar option
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
    />
  )
}
