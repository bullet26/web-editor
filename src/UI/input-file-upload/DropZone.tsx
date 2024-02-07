/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from 'react'
import { ImageIcon, UploadIcon, DeleteIcon } from 'assets'
import { Input, message, Upload } from 'antd'
import type { GetProp, UploadProps } from 'antd'
import s from './DropZone.module.scss'

interface DropZoneProps {
  label: string
  url?: string
  placeholder: string
  imageCaption: string
  id?: string
  onChange: (inputUrl: string, inputImageCaption?: string, id?: string) => void
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('Ви можете завантажувати лише файл JPG/PNG!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Розмір зображення має бути менше 2 МБ!')
  }
  return isJpgOrPng && isLt2M
}

export const DropZone: FC<DropZoneProps> = (props) => {
  const { label, url = '', imageCaption = '', placeholder, onChange, id } = props
  const [file, setFile] = useState<Blob | null>(null)

  const handleChange: UploadProps['onChange'] = (info) => {
    console.log(info.file)

    getBase64(info.file.originFileObj as FileType, (inputUrl) => {
      onChange(inputUrl, imageCaption, id)
    })
  }

  const handleCancel = () => {
    setFile(null)
    onChange('', '', id)
  }

  const handleUpload = async () => {
    const formData = new FormData()
    if (file) {
      formData.append(label, file)
    }

    try {
      // TODO make request
      fetch('https://dummyjson.com/products/1').then((res) => res.json())
    } catch (e) {
      message.error('Нажаль зображення не вдалось завантажити')
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.dropZoneWrapper}>
        <Upload
          name="avatar"
          listType="picture"
          showUploadList={false}
          customRequest={handleUpload}
          beforeUpload={beforeUpload}
          onChange={handleChange}>
          {url ? (
            <img src={url} alt="avatar" style={{ width: '100%' }} />
          ) : (
            <div className={s.uploadWrapper}>
              <ImageIcon />
              <div>{placeholder}</div>
            </div>
          )}
        </Upload>
        {url && (
          <div className={s.buttonWrapper}>
            <UploadIcon
              onClick={() => {
                handleUpload()
              }}
            />
            <DeleteIcon
              fill="#ffdb29"
              onClick={() => {
                handleCancel()
              }}
            />
          </div>
        )}
      </div>
      {url && (
        <Input
          placeholder="Введіть текст (не обо`язково)"
          className={s.input}
          value={imageCaption}
          onChange={(event) => onChange(url, event.target.value, id)}
        />
      )}
    </div>
  )
}
