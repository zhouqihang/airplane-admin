import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Radio, Select, Space, Table } from 'antd';
import { EStatus } from '../../types/enum';
import { statusLabel } from '../users/constants';
import { removePage, updatePages, useFindByPage } from '../../apis/pages';
import { useParams } from 'react-router-dom';
import { IPageItem } from '../../types/pages';
import CreatePage from './create';
import { findAllMenus } from '../../apis/menus';
import { IMenuItem } from '../../types/menus';

interface IModalDetail {
  editId?: number;
  visible?: boolean;
}

function Pages() {
  const params = useParams();
  const [form] = Form.useForm();
  const [modalDetail, setModelDetail] = useState<IModalDetail>({
    editId: undefined,
    visible: false
  });
  const [menus, setMenus] = useState<IMenuItem[]>([]);
  const initialValues = {
    status: '',
    menu: ''
  }
  const columns = [
    { title: '页面名称', dataIndex: 'pageName', key: 'pageName' },
    { title: '页面状态', dataIndex: 'status', key: 'status', render: function (val: EStatus) {
      return statusLabel[val];
    } },
    { title: '所属菜单', key: 'menus', render: function (text: string, record: IPageItem) {
      return record.menus.map(item => item.title).join('、') || '-';
    }},
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    { title: '最后更新人', key: 'updator', render: function (text: string, record: IPageItem) {
      return record.updator.username;
    } },
    {
      title: '操作',
      key: 'actions',
      render: function (text: string, record: IPageItem) {
        return (
          <Space size="middle">
            <a onClick={() => showEditModal(record.id)}>修改基础信息</a>
            <a>编辑</a>
            <a>构建历史</a>
            <a onClick={() => toggleStatus(record.id, record.status)}>{statusLabel[getDstatus(record.status)]}</a>
            <a onClick={() => handleRemove(record.id)}>删除</a>
          </Space>
        )
      }
    }
  ]
  const { request, pages, pagination, loading} = useFindByPage(params.projectId as string);

  const paginationProp = {
    current: pagination.page,
    pageSize: pagination.pageSize,
    total: pagination.total,
    onChange: onPageChange
  }

  useEffect(function () {
    requestList();
    getAllMenus();
  }, []);

  function showEditModal(editId?: number) {
    setModelDetail({
      visible: true,
      editId
    })
  }
  function closeEditModal() {
    setModelDetail({
      editId: undefined,
      visible: false
    })
    requestList();
  }

  function onPageChange(page: number, pageSize: number) {
    request({
      ...form.getFieldsValue(true),
      page,
      pageSize
    })
  }

  function requestList(val = form.getFieldsValue(true)) {
    request({
      ...val,
      page: 1,
      pageSize: 20
    })
  }
  function getDstatus(status: EStatus) {
    return status === EStatus.disabled ? EStatus.enabled : EStatus.disabled;
  }
  async function toggleStatus(pageId: number, status: EStatus) {
    try {
      await updatePages(params.projectId as string, pageId, { status: getDstatus(status) });
      message.success('操作成功');
      requestList();
    }
    catch (err) {}
  }
  async function getAllMenus() {
    try {
      const res = await findAllMenus(parseInt(params.projectId as string, 10));
      setMenus(res.data);
    }
    catch (err) {}
  }
  async function handleRemove(pageId: number) {
    try {
      await removePage(params.projectId as string, pageId);
      requestList();
    }
    catch (err) {}
  }
  return (
    <>
      <Form layout="inline" initialValues={initialValues} form={form} onFinish={requestList}>
        <Form.Item label="页面名" name="pageName">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="页面状态">
          <Radio.Group>
            <Radio value="">全部</Radio>
            <Radio value={EStatus.enabled}>{statusLabel[EStatus.enabled]}</Radio>
            <Radio value={EStatus.disabled}>{statusLabel[EStatus.disabled]}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="所属菜单" name="menu">
          <Select dropdownMatchSelectWidth>
            <Select.Option value="">全部</Select.Option>
            {
              menus.map(menu => (<Select.Option key={menu.id} value={menu.id}>{menu.title}</Select.Option>))
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="reset">重置</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>查找</Button>
        </Form.Item>
      </Form>
      <div className="flex-x-end m-y-8">
        <Button type="default" htmlType="button" onClick={() => showEditModal()}>新建页面</Button>
      </div>
      <Table rowKey="id" columns={columns} dataSource={pages} pagination={paginationProp} loading={loading} />
      <CreatePage {...modalDetail} onClose={closeEditModal} />
    </>
  )
}

export default Pages;