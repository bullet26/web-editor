import { useEffect, FC } from 'react'
import { Input } from 'antd'

interface SearchInputProps {
  onSearch: (searchString: string) => void
  inputValue: string
  onChange: (value: string) => void
}

// eslint-disable-next-line react/display-name
const SearchInput: FC<SearchInputProps> = (props) => {
  const { onSearch, inputValue, onChange } = props
  const { Search } = Input

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputValue) {
        onSearch(inputValue)
      }
    }, 500)
    return () => clearInterval(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return (
    <Search
      placeholder="Введіть потрібне слово"
      value={inputValue}
      onSearch={onChange}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      enterButton
    />
  )
}

export default SearchInput
