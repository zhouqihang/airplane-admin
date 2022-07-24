import { Form, Input, message, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import { createUser } from '../../apis/users';
import { EUserStatus } from '../../types/users';

interface ICreateUserProps {
  visible?: boolean;
  onClose: () => void;
}

function CreateUser(props: ICreateUserProps) {
  const { visible, onClose } = props;
  const [form] = Form.useForm();
  const formRules = {
    username: [
      { required: true },
      { max: 64 }
    ],
    account: [
      { required: true },
      { max: 16 }
    ],
    password: [
      { required: true },
      { max: 16 }
    ],
    confirmPassword: [
      { required: true },
      { validator: function (rule: any, val: string) {
        if (val === form.getFieldValue('password')) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('password and confirm password is not equal'))
      }}
    ],
    email: [
      { required: true },
      { max: 64 }
    ]
  }
  const initFormValue = {
    status: EUserStatus.enabled
  }
  const [loading, setLoading] = useState(false);
  async function submitHandler() {
    setLoading(true);
    try {
      await form.validateFields();
      const value = form.getFieldsValue(true);
      await createUser(value);
      message.success('操作成功');
      onClose();
      form.resetFields()
    }
    catch(error) {

    }
    finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      title="新建账户"
      visible={visible}
      okText="创建"
      cancelText="取消"
      onOk={submitHandler}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <Form form={form} initialValues={initFormValue} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="用户名" name="username" rules={formRules.username}>
          <Input />
        </Form.Item>
        <Form.Item label="账号" name="account" rules={formRules.account}>
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={formRules.password}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="确认密码" name="confirmPassword" rules={formRules.confirmPassword}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="邮箱地址" name="email" rules={formRules.email}>
          <Input />
        </Form.Item>
        <Form.Item label="账号状态" name="status">
          <Radio.Group>
            <Radio value={EUserStatus.enabled}>启用</Radio>
            <Radio value={EUserStatus.disabled}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser;