import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Card, Dropdown, Layout, Menu, Modal } from 'antd';
import Menus from './Menus';
import { useCurrentUser } from '../../apis/users';
import { logout } from '../../apis/auth';
import './index.scss';
import { useGetProjectsIncludesMyself } from '../../apis/projects';
import { useState } from 'react';
import { IProjectItem } from '../../types/projects';
import { CheckCircleOutlined } from '@ant-design/icons';
import globalStateContext from '../../utils/global-state-context';
import { SESSION_STORAGE_PROJECT_KEY } from '../../utils/constants';

const { Sider, Header, Content } = Layout;

function LayoutPage() {

  const globalState = useContext(globalStateContext);
  const user = useCurrentUser();
  const projects = useGetProjectsIncludesMyself();
  const currentPoj = projects.find(item => item.id === globalState.projectId);

  const [projectModalVisible, setProjectModalVisible] = useState(false);
  useEffect(function () {
    if (!globalState.projectId) {
      setProjectModalVisible(true);
    }
  }, [])

  const userMenu = (
    <Menu items={[
      {
        key: 'logout',
        label: (<a onClick={logout}>注销</a>)
      }
    ]} />
  )

  function checkProject(project: IProjectItem) {
    globalState.setGlobalState({ projectId: project.id });
    setProjectModalVisible(false);
    sessionStorage.setItem(SESSION_STORAGE_PROJECT_KEY, '' + project.id);
  }

  return (
    <Layout className="air-layout">
      <Sider>
        <Menus />
      </Sider>
      <Layout>
        <Header className="air-layout__header">
          <div>
            <span className="selected-pro">{currentPoj?.name}</span><a onClick={() => setProjectModalVisible(true)}>{currentPoj ? '切换' : '选择'}项目</a>
          </div>
          <Dropdown overlay={userMenu}>
            <a>{user?.username}</a>
          </Dropdown>
        </Header>
        <Content className="air-content">
          <Outlet />
        </Content>
      </Layout>
      <Modal
        title={currentPoj ? '切换' : '选择' + '项目'}
        visible={projectModalVisible}
        onCancel={() => setProjectModalVisible(false)}
        width={600}
        footer={null}
      >
        {projects.map(project => (
          <Card
            key={project.id}
            className='air-procard'
            actions={[<CheckCircleOutlined key="check" onClick={() => checkProject(project)} />]}
          >
            <Card.Meta
              title={project.name}
              description={project.desc}
            />
          </Card>
        ))}
      </Modal>
    </Layout>
  )
}

export default LayoutPage;