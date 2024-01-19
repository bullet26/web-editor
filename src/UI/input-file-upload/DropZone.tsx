/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react'
import { ImageIcon, UploadIcon, DeleteIcon } from 'assets'
import { message, Upload } from 'antd'
import type { GetProp, UploadProps } from 'antd'
import s from './DropZone.module.scss'

interface DropZoneProps {
  label: string
  url?: string
  placeholder: string
  onChange: (inputUrl: string) => void
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
  const { label, url = '', placeholder, onChange } = props
  const [imageUrl, setImageURL] = useState(url)
  const [file, setFile] = useState<Blob | null>(null)

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done') {
      console.log(info.file)

      getBase64(info.file.originFileObj as FileType, (inputUrl) => {
        setImageURL(inputUrl)
      })
    }
  }

  useEffect(() => {
    onChange(imageUrl)
  }, [imageUrl])

  const handleCancel = () => {
    setFile(null)
    setImageURL('')
  }

  const handleUpload = async () => {
    const formData = new FormData()
    !!file && formData.append(label, file)

    try {
      // TODO make request
      // action	Uploading URL
      // либо заюзать customRequest	/ см доку
      // body: formData
    } catch (e) {
      message.error('Нажаль зображення не вдалось завантажити')
    }
  }

  return (
    <div className={s.wrapper}>
      <Upload
        name="avatar"
        listType="picture"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          <div className={s.uploadWrapper}>
            <ImageIcon />
            <div>{placeholder}</div>
          </div>
        )}
      </Upload>
      {imageUrl && (
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
    </div>
  )
}
