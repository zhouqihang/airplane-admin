import { Form, Input, message, Modal, Radio, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { createProject, updateProject, useGetProject } from '../../apis/projects';
import { EProjectStatus } from '../../types/projects';
import { statusLabel } from './constants';

interface ICreateModalProps {
  visible?: boolean;
  onClose?: () => void;
  editId?: number;
}
function CreateModal(props: ICreateModalProps) {
  const isEdit = !!props.editId;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const initialValues = { status: 1 };
  const { loading: editLoading, project, requestProject } = useGetProject();

  useEffect(function () {
    if (props.editId) {
      requestProject(props.editId);
    }
  }, [props.editId]);

  useEffect(function () {
    if (project) {
      form.setFieldsValue({
        name: project.name,
        desc: project.desc,
        status: project.status
      })
    }
  }, [project]);

  useEffect(function () {
    if (!props.visible) {
      form.resetFields();
    }
  }, [props.visible]);

  async function submitHandler() {
    try {
      setLoading(true);
      await form.validateFields();
      const value = form.getFieldsValue(true);
      if (isEdit) {
        await updateProject(props.editId as number, value);
      }
      else {
        await createProject(value);
      }
      message.success('操作成功');
      props.onClose && props.onClose();
    }
    catch(err) {
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <Modal
      title={`${isEdit ? '修改' : '新建'}项目`}
      visible={props.visible}
      okText={isEdit ? '修改' : '创建'}
      cancelText="取消"
      onOk={submitHandler}
      onCancel={props.onClose}
      confirmLoading={loading}
    >
      <Spin spinning={editLoading}>
      <Form form={form} initialValues={initialValues} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="项目名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="项目简介" name="desc">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="账号状态" name="status">
          <Radio.Group>
            <Radio value={EProjectStatus.enabled}>{statusLabel[EProjectStatus.enabled]}</Radio>
            <Radio value={EProjectStatus.disabled}>{statusLabel[EProjectStatus.disabled]}</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      </Spin>
    </Modal>
  )
}

export default CreateModal;