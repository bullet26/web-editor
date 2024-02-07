import { FC, useRef } from 'react'
import type { Identifier, XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'
import { useMyContext } from 'provider'
import { RightAnswerTask, Type, DataTypeItem } from 'types'
import { Paragraph } from './Paragraph'

interface ParagraphProps {
  type: Type
  text?: string
  url?: string
  imageCaption?: string
  tableColumns?: DataTypeItem[]
  taskData?: RightAnswerTask
  id: string
  index: number
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const DragAndDropParagraph: FC<ParagraphProps> = (props) => {
  const { moveBlock } = useMyContext()
  const { id, index } = props

  const ref = useRef<HTMLDivElement>(null)
  const dragType = 'PARAGRAPH'

  // handlerId - handler id is using for proper definition of drop item and handlerId !== id

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: dragType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset() //  Determine mouse position
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveBlock(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: dragType,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  })

  drag(drop(ref)) //  Initialize drag and drop into the element

  return (
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: `5px dotted ${isDragging ? 'grey' : 'transparent'}`,
      }}
      data-handler-id={handlerId}
      ref={ref}>
      <Paragraph {...props} />
    </div>
  )
}
