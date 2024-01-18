/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useRef, DragEvent, ChangeEvent, useEffect } from 'react'
import { ImageIcon, UploadIcon, DeleteIcon } from 'assets'
import s from './DropZone.module.scss'

interface DropZoneProps {
  label: string
  url?: string
  placeholder: string
  onChange: (inputUrl: string) => void
}

export const DropZone: FC<DropZoneProps> = (props) => {
  const { label, url = '', placeholder, onChange } = props
  const [fileURL, setFileURL] = useState(url)
  const [file, setFile] = useState<Blob | string>('')
  const [error, setError] = useState(false)

  useEffect(() => {
    onChange(fileURL)
  }, [fileURL])

  const dropzoneRef = useRef<HTMLDivElement>(null)

  const handleClickDropZone = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
      setFileURL(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()

    if (event.dataTransfer?.files.length) {
      setFile(event.dataTransfer.files[0])
      setFileURL(URL.createObjectURL(event.dataTransfer.files[0]))
    }
  }

  const handleCancel = () => {
    setFile('')
    setFileURL('')
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append(label, file)

    try {
      // TODO make request
      // body: formData
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
          {fileURL ? (
            <img src={fileURL} alt="uploaded" />
          ) : (
            <>
              <ImageIcon />
              <div>{placeholder}</div>
            </>
          )}
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
      {fileURL && (
        <div className={s.buttonWrapper}>
          <UploadIcon
            onClick={() => {
              handleUpload()
            }}
          />
          <DeleteIcon
            onClick={() => {
              handleCancel()
            }}
          />
        </div>
      )}

      {!!error && <div>Нажаль зображення не вдалось завантажити</div>}
    </div>
  )
}
