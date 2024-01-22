import { FC } from 'react'
import { Modal, Divider } from 'antd'
import { RightAnswerPut } from 'components'
import { useMyContext } from 'provider'
import { getTitle } from './utils'

interface CreateTaskModalProps {
  taskType?: string
}

export const CreateTaskModal: FC<CreateTaskModalProps> = (props) => {
  const { taskType: taskTypeProps } = props

  const { isModalOpen, setModalStatus, chosenTaskID, data } = useMyContext()

  const initialTaskData = data.find((item) => item.id === chosenTaskID)
  const taskType = taskTypeProps || initialTaskData?.type

  return (
    <Modal
      title={`Завдання: ${getTitle(taskType)}`}
      open={isModalOpen}
      onCancel={() => {
        setModalStatus(false)
      }}
      width={888}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <Divider style={{ margin: '16px 0' }} />
      {taskType === 'rightAnswerTask' && <RightAnswerPut taskData={initialTaskData} />}
    </Modal>
  )
}
