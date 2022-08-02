import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, FormListOperation, Input, Modal, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProjectUsers, removeProjectUsers, updateProjectUsers } from '../../apis/projects';
import { getUsersCreatedByMyself } from '../../apis/users';
import HOCSpinButton from '../../components/HOCSpinButton';
import { IUserProjectItem } from '../../types/projects';
import { roleOpts } from '../../types/role';
import { IUsersItem } from '../../types/users';

interface IUsersModalProps {
  projectId?: number;
  onClose?: () => void;
}

function UsersModal(props: IUsersModalProps) {

  const [users, setUsers] = useState<IUsersItem[]>([]);
  const [maps, setMaps] = useState<IUserProjectItem[]>([]);
  const [form] = Form.useForm();
  const SpinButton = HOCSpinButton();

  const initFormVal = {
    rels: [
      { user: '', role: '' }
    ]
  }

  useEffect(function () {
    if (props.projectId) {
      getUsersCreatedByMyself()
        .then(({ data }) => {
          setUsers(data);
          return getProjectUsers(props.projectId as number);
        })
        .then(res => {
          setMaps(res.data)
        })
    }
  }, [props.projectId]);
  useEffect(function () {
    form.setFieldsValue({
      rels: [...maps, { user: '', role: '' }],
    })
  }, [maps]);

  function isUserOptDisabled(uid: number) {
    const rels = form.getFieldValue('rels') || [];
    return rels.some((item: any) => item?.userId === uid);
  }
  function isUserSelectDisabled(field: any) {
    return !!form.getFieldValue(['rels', field.name, 'id']);
  }
  async function addItem(index: number, add: FormListOperation['add']) {
    try {
      await updateProjectUsers(props.projectId as number, form.getFieldValue(['rels', index]));
      add();
    }
    catch (err) {

    }
  }
  async function removeItem(index: number, remove: FormListOperation['remove']) {
    try {
      const record = form.getFieldValue(['rels', index]);
      await removeProjectUsers(props.projectId as number, record.id);
      remove(index);
    }
    catch (err) {

    }
  }
  return (
    <Modal
      title="项目人员配置"
      visible={!!props.projectId}
      onCancel={props.onClose}
      footer={[(<Button key="footer-ok" type="primary" onClick={props.onClose}>完成</Button>)]}
    >
      <Form form={form} initialValues={initFormVal}>
        <Form.List name="rels">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Space key={field.key} align="baseline">
                  <Form.Item label="用户" name={[field.name, 'userId']}>
                    <Select style={{ width: 130}} disabled={isUserSelectDisabled(field)}>
                      {users.map(item => (<Select.Option key={item.id} value={item.id} disabled={isUserOptDisabled(item.id)}>{item.username}</Select.Option>))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="角色" name={[field.name, 'role']}>
                  <Select style={{ width: 130}}>
                      {roleOpts.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>))}
                    </Select>
                  </Form.Item>
                  {/* 有数据的，显示删除图标；默认会有一个不能删除的空条目，后面显示添加图标 */}
                  {index + 1 < fields.length && <Button type="default" shape="circle" icon={<DeleteOutlined />} onClick={() => removeItem(index, remove)}></Button>}
                  {index + 1 === fields.length && <SpinButton type="primary" shape="circle" icon={<CheckOutlined />} onClick={() => addItem(index, add)}></SpinButton>}
                </Space>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}

export default UsersModal;
