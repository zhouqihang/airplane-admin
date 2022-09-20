import React, { useContext } from 'react';
import { Menu } from 'antd';
import { ItemType,  } from 'antd/lib/menu/hooks/useItems';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useMenu } from '../../hooks/useMenu';
import { useNavigate } from 'react-router-dom';
import globalStateContext from '../../utils/global-state-context';

function getMenuItems(projectId?: number) {
  const menuItems: ItemType[] = [
    {
      label: '用户管理',
      key: '/users',
    },
    {
      label: '项目管理',
      key: '/projects'
    },
  ] 
  if (!projectId) return menuItems;
  return menuItems.concat(
    {
      label: '菜单管理',
      key: `/${projectId}/menus`
    },
    {
      label: '页面管理',
      key: `/${projectId}/pages`
    }
  )
}

function Menus() {
  const { selectedKeys, toggleSelectedKeys } = useMenu();
  const navigate = useNavigate();
  const globalState = useContext(globalStateContext);

  function selectMenuHandler({ key }: MenuInfo) {
    toggleSelectedKeys(key);
    navigate(key);
  }

  return (
    <Menu items={getMenuItems(globalState.projectId)} selectedKeys={selectedKeys} onClick={selectMenuHandler} />
  )
}

export default Menus;