import { Form, InputNumber, Radio, Space, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import ColorPicker from '../ColorPicker';

interface IBorderPicker {
  onChange?: (value: string) => void;
  value?: string;
}

const borderStyles = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
];

export default function BorderPicker(props: IBorderPicker) {
  let defaultValue = { hasBorder: false, borderWidth: 0, borderColor: '', borderStyle: '' };
  if (props.value) {
    const [width, style, ...colors] = props.value.split(' ');
    defaultValue = { hasBorder: true, borderWidth: parseInt(width, 10), borderColor: colors.join(' '), borderStyle: style }
  }

  const [hasBorder, setHasBorder] = useState(defaultValue.hasBorder);
  const [borderWidth, setBorderWidth] = useState(defaultValue.borderWidth);
  const [borderColor, setBorderColor] = useState(defaultValue.borderColor);
  const [borderStyle, setBorderStyle] = useState(defaultValue.borderStyle);


  useEffect(function () {
    changeHandler();
  }, [borderWidth, borderColor, borderStyle, hasBorder]);

  function changeHandler() {
    props.onChange && props.onChange(dispatch());
  }

  function dispatch() {
    if (!hasBorder) {
      return '';
    }
    if (!borderWidth) {
      return '';
    }
    return `${borderWidth}px ${borderStyle} ${borderColor || 'transparent'}`;
  }

  function renderBorderConfig() {
    return (
      <Space direction="vertical">
          <Space>
            <span>边框宽度</span>
            <InputNumber
              min={0}
              defaultValue={0}
              addonAfter="px"
              value={defaultValue.borderWidth}
              onChange={setBorderWidth}
            />
          </Space>
          <Space>
            <span>边框颜色</span>
            <ColorPicker
              value={defaultValue.borderColor}
              onChange={(event) => setBorderColor(event.target.value)}
            ></ColorPicker>
          </Space>
          <Space>
            <span>边框样式</span>
            <Select value={defaultValue.borderStyle} onChange={setBorderStyle}>
              {
                borderStyles.map((item) => {
                  return <Select.Option value={item} key={item}>{item}</Select.Option>
                })
              }
            </Select>
          </Space>
      </Space>
    )
  }
  return (
    <>
      <Radio.Group onChange={(e) => setHasBorder(e.target.value)} value={hasBorder}>
        <Radio value={false}>无</Radio>
        <Radio value={true}>有</Radio>
      </Radio.Group>
      { hasBorder ? renderBorderConfig() : null }
    </>
  )
}
