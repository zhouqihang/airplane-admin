import { Form, Input, message, Modal, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createMenu, findAllMenus, findOne, updateMenu } from '../../apis/menus';
import { EStatus } from '../../types/enum';
import { IMenuItem } from '../../types/menus';
import { statusLabel } from '../users/constants';

interface ICreateModal {
  editId: number;
  visible: boolean;
  onClose: () => void;
}

function CreateModal(props: ICreateModal) {
  const [form] = Form.useForm();
  const { projectId } = useParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [parentMenus, setParentMenus] = useState<IMenuItem[]>([]);

  const initFormValue = {
    parentMenu: -1,
    status: EStatus.enabled
  }

  useEffect(function () {
    requestParentMenu()
  }, [])
  useEffect(function () {
    if (!props.editId) return;
    findOne(parseInt(projectId || '', 10), props.editId)
      .then(res => {
        form.setFieldsValue({
          title: res.data.title,
          routerName: res.data.routerName,
          query: JSON.stringify(res.data.query),
          parentMenu: res.data.parentMenu,
          status: res.data.status,
        })
      })
  }, [props.editId])

  async function requestParentMenu() {
    try {
      const res = await findAllMenus(parseInt(projectId || '', 10));
      setParentMenus(res.data);
    }
    catch (err) {
      // nothing
    }
  }

  async function handleSubmit() {
    setSubmitLoading(true);
    try {
      await form.validateFields();
      const value = form.getFieldsValue();
      if (props.editId) {
        await updateMenu(props.editId, parseInt(projectId || '', 10), value);
      }
      else {
        await createMenu(parseInt(projectId || '', 10), value);
      }
      message.success('操作成功');
      props.onClose && props.onClose();
    }
    catch (err) {
      // message.error('操作失败')
    }
    finally {
      setSubmitLoading(false);
    }
  }

  return (
    <Modal
      title={`${props.editId ? '修改' : '新增'}菜单项`}
      visible={props.visible}
      onCancel={props.onClose}
      okText="确定"
      cancelText="取消"
      onOk={handleSubmit}
      confirmLoading={submitLoading}
    >
      <Form form={form} initialValues={initFormValue} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="菜单名称" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="路由名" name="routerName">
          <Input />
        </Form.Item>
        <Form.Item label="路由参数" name="query">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="所属菜单" name="parentMenu">
          <Select>
            <Select.Option value={-1}>一级菜单</Select.Option>
            {
              parentMenus.map(item => (
                <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label="菜单状态" name="status">
          <Radio.Group>
            <Radio value={EStatus.enabled}>{statusLabel[EStatus.enabled]}</Radio>
            <Radio value={EStatus.disabled}>{statusLabel[EStatus.disabled]}</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateModal;