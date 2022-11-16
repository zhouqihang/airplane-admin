import React, { useContext, useMemo, useState } from 'react';
import { Button, Space, Modal, Input, message } from 'antd';
import { editorContext } from './editorContext';
import './header.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getNextVersion, savePageConfig } from '../../apis/pageConfig';

const confirm = Modal.confirm;

function EditorHeader() {
  const { editorState } = useContext(editorContext);
  const params = useParams();
  const navigate = useNavigate();
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [version, setVersion] = useState('');
  const [action, setAction] = useState<'none' | 'save' | 'publish'>('none')

  const saveBtnText = useMemo(function () {
    if (action === 'publish') {
      return '保存并发布';
    }
    return '保存';
  }, [action])

  async function openVersionModal() {
    // 查询当前最新版本
    try {
      const res = await getNextVersion(params.projectId as string, params.pageId as string);
      setVersion(res.data);
      setShowVersionModal(true);
    }
    catch (err) {
      // message.error
    }
  }

  function closeVersionModal() {
    setVersion('');
    setShowVersionModal(false);
    setAction('none');
  }

  function saveConfig() {
    setAction('save');
    openVersionModal();
    // savePageConfig
  }

  function preview() {
    // setAction('publish');
    // openVersionModal();
  }

  function publish() {
    setAction('publish');
    openVersionModal();
  }

  async function saveOrPublish() {
    // 保存配置
    try {
      await savePageConfig(params.projectId as string, params.pageId as string, {
        version,
        jsonConfig: JSON.stringify({ components: editorState.tree }),
        pageId: parseInt(params.pageId as string, 10)
      })
      if (action === 'save') {
        message.success(`版本 ${version} 配置保存成功`)
        closeVersionModal();
      }
      else if (action === 'publish') {
        // TODO 触发发布操作，并转至发布页面
      }
    }
    catch (err) {
    }
  }

  function back() {
    confirm({
      title: '确定返回上一页吗？',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将不会保存您所做的修改',
      okText: '返回',
      okType: 'dashed',
      cancelText: '取消',
      onOk() {
        navigate(-1);
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
  
  return (
    <div className="editor-header p-x-16">
      <Button onClick={back}>返回上一页</Button>
      <div className="m-l-auto">
        <Space>
          <Button type="dashed" onClick={preview}>预览</Button>
          <Button type="primary" onClick={saveConfig}>保存</Button>
          <Button type="primary" onClick={publish}>发布</Button>
        </Space>
      </div>
      <Modal
        title="版本号"
        visible={showVersionModal}
        onCancel={closeVersionModal}
        onOk={saveOrPublish}
        okText={saveBtnText}
        cancelText="取消"
      >
        <Input value={version} onChange={(event) => setVersion(event.target.value)} />
      </Modal>
    </div>
  )
}

export default EditorHeader;