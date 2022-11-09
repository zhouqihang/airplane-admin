import React, { CSSProperties } from 'react';
import { Button, Form, Input, Space, Tabs } from 'antd';
import ColorPicker from '../../config-board-components/ColorPicker';
import BorderPicker from '../../config-board-components/BorderPicker';
import { ITableProps } from './Component';
import { ColumnType } from 'antd/lib/table';
import { MinusCircleTwoTone, PlusOutlined, SearchOutlined } from '@ant-design/icons';

interface ITableConfigBoardProps {
  onChange: (props: ITableProps) => void;
  propConfig?: ITableProps;
}

export default function TableConfigBoard(props: ITableConfigBoardProps) {
  
  // TODO
  // 表头配置（一列一列的配置，数据列直接写name；操作列只能勾选，勾选后表格自动多出一列，可以自由添加组件）
  // 表格数据来源（JSON：通过JSON字符串获取，用于设置固定值）（API：通过API获取，API的参数可以指定为一个表单）


  function columnsChangeHandler(index: number, key: 'title' | 'dataIndex') {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      props.onChange({
        ...props.propConfig,
        columns: props.propConfig?.columns?.map((column, columnIdx) => {
          if (index === columnIdx) {
            return { ...column, [key]: event.target.value }
          }
          return column;
        })
      })
    }
  }
  function removeColumnItem(index: number) {
    props.onChange({
      ...props.propConfig,
      columns: props.propConfig?.columns?.filter((column, columnIdx) => {
        return columnIdx !== index;
      })
    })
  }
  function addColumns() {
    props.onChange({
      ...props.propConfig,
      columns: [
        ...props.propConfig?.columns || [],
        {
          title: '新增列',
          dataIndex: 'new_column'
        }
      ]
    })
  }

  function renderColumns() {
    return props.propConfig?.columns?.map((column: ColumnType<any>, index) => {
      return (
        <Form.Item label={column.title as string} key={index + 1}>
          <Space>
            <Space direction="vertical">
              <Input addonBefore="标题" value={column.title as string} onChange={columnsChangeHandler(index, 'title')} />
              <Input addonBefore="字段" value={column.dataIndex as string} onChange={columnsChangeHandler(index, 'dataIndex')} />
            </Space>
            <Button type="text" icon={<MinusCircleTwoTone twoToneColor="#eb2f96" />} onClick={() => removeColumnItem(index)} />
          </Space>
        </Form.Item>
      )
    })
  }

  return (
      <Tabs>
        <Tabs.TabPane tab="样式" key="style">
          样式
        </Tabs.TabPane>
        <Tabs.TabPane tab="配置" key="setting">
          <Form labelCol={{ span: 6 }}>
            <Form.Item label="表头配置：">
            </Form.Item>
            { renderColumns() }
            <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
              <Space direction="vertical">
                <Button block type="dashed" icon={<PlusOutlined />} onClick={addColumns}>添加数据列</Button>
                <Button block type="dashed" icon={<PlusOutlined />} onClick={addColumns}>添加操作列</Button>
              </Space>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
  )
}