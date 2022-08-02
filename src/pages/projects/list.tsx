import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Radio, Space, Table } from 'antd';
import { EProjectStatus, IProjectItem } from '../../types/projects';
import { statusLabel } from './constants';
import { removeProject, updateProject, useGetProjectsCreatedByCurrent } from '../../apis/projects';
import CreateModal from './create';
import UsersModal from './users';

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
            <a onClick={() => toggleStatus(record.id, record.status)}>{statusLabel[getDstatus(record.status)]}</a>
            <a onClick={() => setUserModalId(record.id)}>人员配置</a>
            <a onClick={() => removeHandler(record.id)}>删除</a>
            <a onClick={() => openEditModal(record.id)}>修改信息</a>
          </Space>
        )
      }
    }
  ];
  const [form] = Form.useForm();
  const { projects, pagination, loading, requestProjects } = useGetProjectsCreatedByCurrent();
  const paginationProp = {
    current: pagination.page,
    pageSize: pagination.pageSize,
    total: pagination.total,
    onChange: onPageChange
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState<number>();
  const [userModalId, setUserModalId] = useState<number>();

  useEffect(function () {
    searchHandler();
  }, []);
  function searchHandler(val = form.getFieldsValue(true)) {
    requestProjects({
      ...val,
      page: 1,
      pageSize: 20
    })
  }
  function onPageChange(page: number, pageSize: number) {
    requestProjects({
      ...form.getFieldsValue(true),
      page,
      pageSize
    })
  }
  function getDstatus(status: EProjectStatus) {
    return status === EProjectStatus.disabled ? EProjectStatus.enabled : EProjectStatus.disabled;
  }
  async function removeHandler(id: number) {
    try {
      await removeProject(id);
      message.success('操作成功');
      searchHandler();
    }
    catch (err) {}
  }
  async function toggleStatus(id: number, status: EProjectStatus) {
    try {
      await updateProject(id, { status: getDstatus(status) });
      message.success('操作成功');
      searchHandler();
    }
    catch (err) {}
  }
  function openEditModal(id: number) {
    setEditId(id);
    setModalVisible(true);
  }
  function afterCreate() {
    setModalVisible(false)
    setEditId(undefined);
    searchHandler();
  }
  return (
    <>
    <Form layout="inline" form={form} onFinish={searchHandler}>
      <Form.Item label="项目名称" name="name">
        <Input />
      </Form.Item>
      <Form.Item name="status">
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
        <Button type="primary" htmlType="submit">查找</Button>
      </Form.Item>
    </Form>
    <div className="flex-x-end m-y">
      <Button type="default" htmlType="button" onClick={() => setModalVisible(true)}>新建项目</Button>
    </div>
    <Table rowKey="id" columns={tableColumns} dataSource={projects} pagination={paginationProp} loading={loading} />
    <CreateModal editId={editId} visible={modalVisible} onClose={afterCreate} />
    <UsersModal projectId={userModalId} onClose={() => setUserModalId(undefined)} />
    </>
  )
}

export default ProjectsPage;