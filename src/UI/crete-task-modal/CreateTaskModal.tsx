import { FC } from 'react'
import { Modal, Divider } from 'antd'
import { useBlocks, useChosenTask, useModal } from 'store'
import { RightAnswerForm } from 'components'
import { Type } from 'types'
import { getTitle } from './utils'

interface CreateTaskModalProps {
  taskType: Type | null
}

export const CreateTaskModal: FC<CreateTaskModalProps> = (props) => {
  const { taskType: taskTypeProps } = props

  const data = useBlocks((state) => state.data)
  const chosenTaskID = useChosenTask((state) => state.chosenTaskID)
  const isModalOpen = useModal((state) => state.isModalOpen)
  const closeModal = useModal((state) => state.closeModal)

  const currentType = data.find((item) => item.id === chosenTaskID)?.type
  const taskType = currentType || taskTypeProps || null

  return (
    <Modal
      title={`Завдання: ${getTitle(taskType)}`}
      open={isModalOpen}
      destroyOnClose
      onCancel={() => {
        closeModal()
      }}
      width={888}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <Divider style={{ margin: '16px 0' }} />
      {taskType === 'rightAnswerTask' && <RightAnswerForm />}
    </Modal>
  )
}

// destroyOnClose - unmount modal after close
