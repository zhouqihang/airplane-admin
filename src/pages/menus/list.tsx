import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Radio, Space, Table } from 'antd';
import { useParams } from 'react-router-dom';
import { EStatus } from '../../types/enum';
import { statusLabel } from '../users/constants';
import { updateMenu, useGetMenusByPage, removeMenu } from '../../apis/menus';
import { IMenuItem } from '../../types/menus';
import CreateModal from './create';

function MenuList() {
  const routerParams = useParams();
  const { projectId } = routerParams;
  const [form] = Form.useForm();
  const [editId, setEditId] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const initFormValue = {
    status: ''
  };
  const columns = [
    { title: '菜单名称', dataIndex: 'title', key: 'title' },
    { title: '路由名', dataIndex: 'routerName', key: 'routerName' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (val: EStatus) {
      return statusLabel[val];
    } },
    { title: '上级菜单', dataIndex: 'parentMenu', key: 'parentMenu', render: function (val: string) {
      return val || '-';
    } },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: function (text: string, record: IMenuItem) {
        return (
          <Space size="middle">
            <a key="edit" onClick={() => openEditModal(record.id)}>修改</a>
            <a key="status" onClick={() => toggleStatus(record.id, record.status)}>{statusLabel[getDstatus(record.status)]}</a>
            <a key="remove" onClick={() => handleRemove(record.id)}>删除</a>
          </Space>
        )
      }
    }
  ]

  const { menus, pagination, loading, request } = useGetMenusByPage();
  const paginationProp = {
    current: pagination.page,
    pageSize: pagination.pageSize,
    total: pagination.total,
    onChange: onPageChange
  }
  useEffect(function () {
    searchHandler();
  }, []);
  function openEditModal(menuId = 0) {
    setEditId(menuId);
    setShowEditModal(true);
  }
  function closeEditModal() {
    setEditId(0);
    setShowEditModal(false);
    searchHandler();
  }
  async function toggleStatus(menuId: number, status: EStatus) {
    try {
      await updateMenu(menuId, projectId as string, { status: getDstatus(status) });
      message.success('操作成功');
      searchHandler();
    }
    catch (err) {}
  }
  function getDstatus(status: EStatus) {
    return status === EStatus.disabled ? EStatus.enabled : EStatus.disabled;
  }
  function searchHandler(val = form.getFieldsValue(true)) {
    request({
      ...val,
      page: 1,
      pageSize: 20
    }, projectId as string)
  }
  function onPageChange(page: number, pageSize: number) {
    request({
      ...form.getFieldsValue(true),
      page,
      pageSize
    }, projectId as string)
  }
  async function handleRemove(id: number) {
    try {
      removeMenu(projectId as string, id);
      message.success('操作成功');
      searchHandler();
    }
    catch (err) {
      // nothing
    }
  }
  return (
    <>
      <Form layout="inline" form={form} initialValues={initFormValue} onFinish={searchHandler}>
        <Form.Item label="菜单名" name="title">
          <Input />
        </Form.Item>
        <Form.Item name="status">
          <Radio.Group>
            <Radio value="">全部</Radio>
            <Radio value={EStatus.enabled}>{statusLabel[EStatus.enabled]}</Radio>
            <Radio value={EStatus.disabled}>{statusLabel[EStatus.disabled]}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="reset">重置</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>查找</Button>
        </Form.Item>
      </Form>
      <div className="flex-x-end m-y-8">
        <Button type="default" htmlType="button" onClick={() => openEditModal()}>新建项目</Button>
      </div>
      <Table rowKey="id" columns={columns} dataSource={menus} pagination={paginationProp} loading={loading} />
      <CreateModal editId={editId} visible={showEditModal} onClose={closeEditModal} />
    </>
  )
}

 
export default MenuList;