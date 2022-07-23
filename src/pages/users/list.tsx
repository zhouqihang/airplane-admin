import { Button, Form, Input, Radio, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetUsers } from '../../apis/users';
import { EUserStatus } from '../../types/users';
import { statusLabel } from './constants';
import CreateUser from './create';

function UserListPage() {
  const { users, total, loading, requestUsers } = useGetUsers();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();
  const initFormValue = {
    status: ''
  }
  const tableColumns = [
    { title:'用户名', dataIndex: 'username', key: 'username' },
    { title:'登录账号', dataIndex: 'account', key: 'account' },
    { title:'邮箱', dataIndex: 'email', key: 'email' },
    { title:'账号状态', dataIndex: 'status', key: 'status', render: function (val: EUserStatus) {
      return statusLabel[val];
    } },
    { title:'创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '操作', key: 'action', render: function () {
      return (
        <Space size="middle">
          <a>启用</a>
          <a>删除</a>
          <a>修改信息</a>
        </Space>
      )
    } }
  ]
  useEffect(function () {
    const search = form.getFieldsValue(true);
    searchUsers(search);
  }, []);
  function searchUsers(value: any) {
    requestUsers({
      ...value,
      page: 1,
      pageSize: 20
    })
  }
  return (
    <>
      <Form layout="inline" form={form} initialValues={initFormValue} onFinish={searchUsers}>
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="账号状态" name="status">
          <Radio.Group>
            <Radio value="">全部</Radio>
            <Radio value={EUserStatus.enabled}>{statusLabel[EUserStatus.enabled]}</Radio>
            <Radio value={EUserStatus.disabled}>{statusLabel[EUserStatus.disabled]}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="reset">重置</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">查找</Button>
        </Form.Item>
      </Form>
      <div className="flex-x-end">
        <Button
          className="m-y"
          type="default"
          htmlType="button"
          onClick={() => setShowCreateModal(true)}
        >新建账号</Button>
      </div>
      <Table columns={tableColumns} dataSource={users} loading={loading} rowKey="id"></Table>
      <CreateUser visible={showCreateModal} onClose={() => setShowCreateModal(false)}/>
    </>
  )
}

export default UserListPage;