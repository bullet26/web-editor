import { FC } from 'react'
import { Modal, Divider } from 'antd'
import { useChosenTask, useModal } from 'store'
import { TaskForm } from 'components'
import { IsTaskType } from 'utils'
import { getTitle } from './utils'

export const CreateTaskModal: FC = () => {
  const taskType = useChosenTask((state) => state.taskType) || ''
  const isModalOpen = useModal((state) => state.isModalOpen)
  const closeModal = useModal((state) => state.closeModal)

  const IS_TASK_TYPES = IsTaskType(taskType)

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
      {IS_TASK_TYPES && <TaskForm taskType={taskType} />}
    </Modal>
  )
}

// destroyOnClose - unmount modal after close
