import { FC } from 'react'
import { Input } from './Input'
import s from './FormElements.module.scss'

interface InputsTitleAndDescriptionProps {
  isOneDifficultyLevel: boolean
}

export const InputsTitleAndDescription: FC<InputsTitleAndDescriptionProps> = (props) => {
  const { isOneDifficultyLevel } = props

  return (
    <div className={isOneDifficultyLevel ? s.inputWrapperOneTab : s.inputWrapperThreeTab}>
      <Input
        placeholder="Введіть назву"
        name="title"
        style={{ marginBottom: '16px', width: '514px', fontWeight: 700 }}
      />
      <Input
        placeholder="Введіть що потрібно зробити"
        name="description"
        style={{ width: '514px' }}
      />
    </div>
  )
}
