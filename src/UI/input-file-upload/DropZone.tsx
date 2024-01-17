import { Button } from 'antd'
import { FC, useState, useRef, DragEvent, ChangeEvent } from 'react'
import s from './DropZone.module.scss'

interface DropZoneProps {
  label: string
  url?: string
}

export const DropZone: FC<DropZoneProps> = (props) => {
  const { label, url = '' } = props
  const [fileURL, setFileURL] = useState(url)
  const [file, setFile] = useState<Blob | string>('')
  const [text, setText] = useState('Перетягніть сюди зображення або натисніть')
  const [error, setError] = useState(false)

  const dropzoneRef = useRef<HTMLDivElement>(null)

  const handleClickDropZone = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
      setFileURL(URL.createObjectURL(event.target.files[0]))
    }
    if (dropzoneRef.current) {
      dropzoneRef.current.style.border = ''
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setText('Перетягніть сюди зображення')
    if (dropzoneRef.current) {
      dropzoneRef.current.style.border = ''
      dropzoneRef.current.style.backgroundColor = 'lightgray'
      dropzoneRef.current.style.color = '#000'
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
    if (dropzoneRef.current) {
      dropzoneRef.current.style.backgroundColor = ''
      dropzoneRef.current.style.color = ''
    }

    if (event.dataTransfer?.files.length) {
      setFile(event.dataTransfer.files[0])
      setFileURL(URL.createObjectURL(event.dataTransfer.files[0]))
    }
  }

  const handleCancel = () => {
    setText('Перетягніть сюди зображення або натисніть')
    setFile('')
    setFileURL('')

    if (dropzoneRef.current) {
      dropzoneRef.current.style.border = ''
    }
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append(label, file)

    try {
      // TODO make request
      // body: formData

      if (dropzoneRef.current) {
        dropzoneRef.current.style.border = '3px solid green'
      }
    } catch (e) {
      setError(true)
    }
  }

  return (
    <div className={s.wrapper}>
      <label htmlFor={label}>
        <div
          className={s.dropZoneWrapper}
          ref={dropzoneRef}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e)}>
          {fileURL ? <img src={fileURL} alt="uploaded" /> : text}
        </div>
      </label>
      <input
        type="file"
        id={label}
        name={label}
        accept=".jpg, .jpeg, .png, .webp"
        style={{ display: 'none' }}
        onChange={(e) => handleClickDropZone(e)}
      />
      <div className={s.buttonWrapper}>
        <Button
          type="primary"
          size="middle"
          onClick={() => {
            handleUpload()
          }}>
          Звантажити
        </Button>
        <Button
          type="default"
          size="middle"
          onClick={() => {
            handleCancel()
          }}>
          Видалити
        </Button>
      </div>
      {!!error && <div>Нажаль зображення не вдалось завантажити</div>}
    </div>
  )
}
