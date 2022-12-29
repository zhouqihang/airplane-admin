import { Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { IMenuItem } from '../types/menus';
import './layout.scss';

const { Sider, Header, Content } = Layout;

interface ICompisitionLayoutProps {
  menus?: IMenuItem[];
  getPagePath: (pageId: number) => string;
}
export default function CompositionLayout(props: ICompisitionLayoutProps) {
  const navigate = useNavigate();
  
  const menusItem = useMemo(function () {
    if (!props.menus) return [];
    const map: Record<number, IMenuItem[]> = {};
    props.menus.forEach(item => {
      map[item.parentMenu] = [...(map[item.parentMenu] || []), item];
    })
    return (map[-1] || []).map((item) => {
      const res: any = {
        label: item.title,
        key: item.id
      };
      if (map[item.id] && !!map[item.id].length) {
        res.children = getMenuItem(map[item.id])
      }
      return res;
    })
  }, props.menus);

  function menuClickHandler(info: MenuInfo) {
    const menu = props.menus?.find(item => '' + item.id === info.key);
    if (menu && menu.page) {
      const path = props.getPagePath(menu.page.id);
      const query = menu.query ? Object.keys(menu.query).map(key => {
        return `${key}=${menu.query[key]}`
      }).join('&') : '';
      navigate(path + '?' + query);
    }
  }

  return (
    <Layout className="air-layout">
      <Sider>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          items={menusItem}
          onClick={menuClickHandler}
        />
      </Sider>
      <Layout>
        <Header className="air-layout__header">Header</Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

function getMenuItem(menus: IMenuItem[]) {
  return menus.map((item) => {
    // item.children = ;
    return {
      label: item.title,
      key: item.id,
    };
  })
}