import { FC, useState } from 'react'
import { Modal, Divider } from 'antd'
import { WordItem } from './WordItem'
import s from '../Dictionary.module.scss'
import SearchInput from './SearchInput'

interface AddWordModalProps {
  isModalOpen: boolean
  closeModal: () => void
}

export const AddWordModal: FC<AddWordModalProps> = (props) => {
  const { isModalOpen, closeModal } = props
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (searchString: string) => {
    console.log(searchString)
    // TODO  makeSearch({ variables: { searchString } })
  }
  const handleInputChange = (value: string) => {
    setSearchValue(value)
  }

  return (
    <Modal
      title="Додати слово"
      open={isModalOpen}
      onCancel={closeModal}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <Divider style={{ margin: '16px 0' }} />
      <SearchInput onSearch={handleSearch} inputValue={searchValue} onChange={handleInputChange} />
      <WordItem buttonType="add" word="hi" transcription="[haɪ]" translation="Приві́t" />
      <div className={s.sectionTitle}> Слова додані до уроку</div>
      <Divider style={{ margin: '10px 0' }} />
      <WordItem
        buttonType="delete"
        word="Ambulance "
        transcription="[æm.bjə.ləns]"
        translation="Швидка допомога"
      />
    </Modal>
  )
}
