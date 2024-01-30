/* eslint-disable consistent-return */
import { useState } from 'react'
import { Button, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { MenuItemInfo, MenuItemTask } from 'assets'
import { useMyContext } from 'provider'
import { types, Type } from 'types'
import { CreateTaskModal } from 'UI'
import s from './Panel.module.scss'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],

  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

export const Panel = () => {
  const [disabledBtn, setDisabledBtnStatus] = useState(true)
  const [chosenItem, setChosenItem] = useState<string | null>(null)

  const { addBlock, setModalStatus, setChosenTaskID } = useMyContext()

  const clickMenuItem: MenuProps['onClick'] = (e) => {
    const [item, category] = e.keyPath

    if (category === 'sub1' || category === 'sub2') {
      setDisabledBtnStatus(false)
      setChosenItem(item)
    } else {
      setChosenItem(null)
      setDisabledBtnStatus(true)
    }
  }

  const clickButton = () => {
    if (!!chosenItem && types.includes(chosenItem)) {
      if (chosenItem === 'rightAnswerTask') {
        setChosenTaskID('')
        setModalStatus(true)
      } else {
        const type = chosenItem as Type
        addBlock({ type, id: '' })
      }
    }
  }

  const items: MenuProps['items'] = [
    getItem('Інформаційнi блоки', 'sub1', null, [
      getItem('Заголовок розділу', 'title', <MenuItemInfo />),
      getItem('Підзаголовок', 'subtitle', <MenuItemInfo />),
      getItem('Розділ+Текст', 'text', <MenuItemInfo />),
      getItem('Примітки для викладача', 'note', <MenuItemInfo />),
      getItem('Картинка', 'image', <MenuItemInfo />),
      getItem('Власний блок', 'custom', <MenuItemInfo />),
    ]),
    getItem('Завдання та тести', 'sub2', null, [
      getItem('Правильна відповідь', 'rightAnswerTask', <MenuItemTask />),
    ]),
    getItem('Службові', 'sub3'),
  ]

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.title}>Панель керування</div>
        <div className={s.divider} />
        <Menu
          onClick={clickMenuItem}
          className={s.menu}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
        <Button disabled={disabledBtn} type="primary" shape="round" onClick={clickButton}>
          Додати блок
        </Button>
      </div>
      <CreateTaskModal taskType={chosenItem} />
    </>
  )
}
