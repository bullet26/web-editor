import { FC } from 'react'
import { Modal, Divider } from 'antd'
import { useChosenTask, useModal } from 'store'
import { RightAnswerForm } from 'components'
import { getTitle } from './utils'

export const CreateTaskModal: FC = () => {
  const taskType = useChosenTask((state) => state.taskType)
  const isModalOpen = useModal((state) => state.isModalOpen)
  const closeModal = useModal((state) => state.closeModal)

  return (
    <Modal
      title={`Завдання: ${getTitle(taskType)}`}
      open={isModalOpen}
      destroyOnClose
      onCancel={() => {
        closeModal()
      }}
      width={1088}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <Divider style={{ margin: '16px 0' }} />
      {taskType === 'rightAnswerTask' && <RightAnswerForm />}
    </Modal>
  )
}

// destroyOnClose - unmount modal after close
