import { Button, Form, Input, message, Radio, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { removeUser, updateUser, useGetUsers } from '../../apis/users';
import { EUserStatus, IUsersItem } from '../../types/users';
import { statusLabel } from './constants';
import CreateUser from './create';

function UserListPage() {
  const { users, loading, pagination, requestUsers } = useGetUsers();
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
    { title: '操作', key: 'action', render: function (text: string, record: IUsersItem) {
      return (
        <Space size="middle">
          <a href="javascript: void(0);" onClick={() => changeUserStatus(record.id, record.status)}>{statusLabel[getDstatus(record.status)]}</a>
          <a onClick={() => removeUserHandler(record.id)}>删除</a>
          <a>修改信息</a>
        </Space>
      )
    } }
  ]
  useEffect(function () {
    const search = form.getFieldsValue(true);
    searchUsers(search);
  }, []);
  const tablePagination = Object.assign({
    onChange: function (page: number, pageSize: number) {
      requestUsers({
        ...form.getFieldsValue(true),
        page,
        pageSize
      })
    },
    current: pagination.page,
  }, pagination);

  function searchUsers(value: any = form.getFieldsValue(true)) {
    requestUsers({
      ...value,
      page: 1,
      pageSize: 20
    })
  }
  function afterCreatedUser() {
    setShowCreateModal(false)
    searchUsers()
  }
  async function changeUserStatus(id: number, status: EUserStatus) {
    const wantStatus = getDstatus(status);
    try {
      await updateUser(id, { status: wantStatus });
      message.success('操作成功');
      await requestUsers({
        ...form.getFieldsValue(true),
        page: pagination.page,
        pageSize: pagination.pageSize
      })
    }
    catch (err) {}
  }
  async function removeUserHandler(id: number) {
    try {
      await removeUser(id);
      message.success('操作成功');
      await requestUsers({
        ...form.getFieldsValue(true),
        page: pagination.page,
        pageSize: pagination.pageSize
      })
    }
    catch(err) {

    }
  }
  function getDstatus(status: EUserStatus) {
    return status === EUserStatus.disabled ? EUserStatus.enabled : EUserStatus.disabled;
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
      <Table columns={tableColumns} dataSource={users} loading={loading} rowKey="id" pagination={tablePagination}></Table>
      <CreateUser visible={showCreateModal} onClose={afterCreatedUser}/>
    </>
  )
}

export default UserListPage;