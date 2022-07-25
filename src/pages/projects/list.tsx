import React from 'react';
import { Button, Form, Input, Radio, Space, Table } from 'antd';
import { EProjectStatus, IProjectItem } from '../../types/projects';
import { statusLabel } from './constants';

function ProjectsPage() {
  const tableColumns = [
    { title:'项目名称', dataIndex: 'name', key: 'name' },
    { title:'项目简介', dataIndex: 'desc', key: 'desc' },
    { title:'状态', dataIndex: 'status', key: 'status', render: function (val: EProjectStatus) {
      return statusLabel[val];
    } },
    {
      title: '操作',
      key: 'action',
      render: function (text: string, record: IProjectItem) {
        return (
          <Space size="middle">
            <a href="javascript: void(0);">{statusLabel[getDstatus(record.status)]}</a>
            <a>删除</a>
            <a>修改信息</a>
          </Space>
        )
      }
    }
  ];
  function getDstatus(status: EProjectStatus) {
    return status === EProjectStatus.disabled ? EProjectStatus.enabled : EProjectStatus.disabled;
  }
  return (
    <>
    <Form layout="inline">
      <Form.Item label="项目名称">
        <Input />
      </Form.Item>
      <Form.Item>
        <Radio.Group>
          <Radio value="">全部</Radio>
          <Radio value={EProjectStatus.enabled}>{statusLabel[EProjectStatus.enabled]}</Radio>
          <Radio value={EProjectStatus.disabled}>{statusLabel[EProjectStatus.disabled]}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="default" htmlType="reset">重置</Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="button">查找</Button>
      </Form.Item>
    </Form>
    <div className="flex-x-end m-y">
      <Button type="default" htmlType="button">新建项目</Button>
    </div>
    <Table rowKey="id" columns={tableColumns} />
    </>
  )
}

export default ProjectsPage;