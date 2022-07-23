import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../apis/auth';
import { ILoginParams } from '../../types/auth';
import './index.scss';

function LoginPage() {
  const navigate = useNavigate();
  async function onFinish(val: ILoginParams) {
    await login(val);
    message.success('登录成功')
    navigate('/', { replace: true });
  }

  return (
    <div className="login-page">
      <Form className="login-form" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
        <Form.Item label="账号" name="account" rules={[{ required: true, message: '请输入账号!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="pwd" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" block htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage;