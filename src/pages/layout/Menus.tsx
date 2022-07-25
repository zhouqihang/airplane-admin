import React from 'react';
import { Menu } from 'antd';
import { ItemType,  } from 'antd/lib/menu/hooks/useItems';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useMenu } from '../../hooks/useMenu';
import { useNavigate } from 'react-router-dom';

const menuItems: ItemType[] = [
  {
    label: '用户管理',
    key: '/users',
  },
  {
    label: '项目管理',
    key: '/projects'
  }
]

function Menus() {
  const { selectedKeys, toggleSelectedKeys } = useMenu();
  const navigate = useNavigate();

  function selectMenuHandler({ key }: MenuInfo) {
    toggleSelectedKeys(key);
    navigate(key);
  }

  return (
    <Menu items={menuItems} selectedKeys={selectedKeys} onClick={selectMenuHandler} />
  )
}

export default Menus;