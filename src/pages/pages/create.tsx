import { Form, Input, message, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createPage, getOnePage, updatePages, useGetOnePage } from '../../apis/pages';
import { EStatus } from '../../types/enum';
import { statusLabel } from '../users/constants';

interface ICreatePageProps {
  editId?: number;
  visible?: boolean;
  onClose?: () => void;
}

function CreatePage(props: ICreatePageProps) {
  const initialValues = {
    status: EStatus.enabled
  }
  const [form] = Form.useForm();
  const { projectId } = useParams();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { page, loading, requestPage } = useGetOnePage();

  useEffect(function () {
    if (!props.visible) {
      return;
    }
    if (props.editId) {
      requestPage(projectId as string, props.editId);
    }
  }, [props.visible])

  useEffect(function () {
    form.setFieldsValue({
      pageName: page?.pageName,
      status: page?.status
    })
  }, [page])

  async function handleSubmit() {
    setConfirmLoading(true);
    try {
      await form.validateFields()
      const values = await form.getFieldsValue(true);
      if (props.editId) {
        await updatePages(projectId as string, props.editId, values);
      }
      else {
        await createPage(projectId as string, values);
      }
      message.success('操作成功');
      props.onClose && props.onClose();
    }
    catch (err) {}
    finally {
      setConfirmLoading(false)
    }
  }
  return (
    <Modal
      title={`${props.editId ? '修改' : '新建'}页面`}
      visible={props.visible}
      okText="确定"
      cancelText="取消"
      onCancel={props.onClose}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
    >
      <Form initialValues={initialValues} form={form}>
        <Form.Item label="页面名称" name="pageName">
          <Input />
        </Form.Item>
        <Form.Item label="页面状态" name="status">
          <Radio.Group>
            <Radio value={EStatus.enabled}>{statusLabel[EStatus.enabled]}</Radio>
            <Radio value={EStatus.disabled}>{statusLabel[EStatus.disabled]}</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreatePage;