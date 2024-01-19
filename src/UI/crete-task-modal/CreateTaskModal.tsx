import { FC, useState } from 'react'
import { Modal } from 'antd'
import { getTitle } from './utils'
import s from './CreateTaskModal.module.scss'

interface CreateTaskModalProps {
  isModalOpen: boolean
  handleCancel: () => void
  taskType: string | null
}

export const CreateTaskModal: FC<CreateTaskModalProps> = (props) => {
  const { isModalOpen, taskType, handleCancel } = props

  const handleOk = () => {} // TODO api

  return (
    <Modal
      title={`Завдання: ${getTitle(taskType)}`}
      open={isModalOpen}
      okText="Зберегти"
      cancelText="Скасувати"
      cancelButtonProps={{ className: s.cancelBtn, shape: 'round' }}
      okButtonProps={{ shape: 'round' }}
      onOk={handleOk}
      onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}
