import { FC } from 'react'
import { Input } from './Input'
import { useFormContext } from '../utils'
import s from './FormElements.module.scss'

export const InputsTitleAndDescription: FC = () => {
  const { isOneDifficultyLevel } = useFormContext()

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
