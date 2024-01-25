import { FC } from 'react'
import { Modal, Divider } from 'antd'
import { RightAnswerForm } from 'components'
import { useMyContext } from 'provider'
import { Type } from 'types'
import { getTitle } from './utils'

interface CreateTaskModalProps {
  taskType: Type | null
}

export const CreateTaskModal: FC<CreateTaskModalProps> = (props) => {
  const { taskType: taskTypeProps } = props

  const { isModalOpen, setModalStatus, chosenTaskID, data } = useMyContext()

  const currentType = data.find((item) => item.id === chosenTaskID)?.type
  const taskType = taskTypeProps || currentType || null

  return (
    <Modal
      title={`Завдання: ${getTitle(taskType)}`}
      destroyOnClose
      open={isModalOpen}
      onCancel={() => {
        setModalStatus(false)
      }}
      width={888}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <Divider style={{ margin: '16px 0' }} />
      {taskType === 'rightAnswerTask' && <RightAnswerForm />}
    </Modal>
  )
}
