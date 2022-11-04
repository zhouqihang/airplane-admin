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
  const [hasBorder, setHasBorder] = useState(() => {
    return getDefaultConfFromProps().hasBorder
  });
  const [borderWidth, setBorderWidth] = useState(() => {
    return getDefaultConfFromProps().borderWidth
  });
  const [borderColor, setBorderColor] = useState(() => {
    return getDefaultConfFromProps().borderColor
  });
  const [borderStyle, setBorderStyle] = useState(() => {
    return getDefaultConfFromProps().borderStyle
  });

  useEffect(function () {
    if (!props.value) {
      return setHasBorder(false);
    }

    const [width, style, color] = props.value.split(' ');
    setBorderWidth(parseInt(width, 10));
    setBorderColor(color);
    setBorderStyle(style);
    setHasBorder(true);
  }, [props.value])

  useEffect(function () {
    changeHandler();
  }, [borderWidth, borderColor, borderStyle, hasBorder]);

  function getDefaultConfFromProps() {
    if (!props.value) {
      return { hasBorder: false, borderWidth: 0, borderColor: '', borderStyle: '' }
    }
    const [width, style, color] = props.value.split(' ');
    return { hasBorder: true, borderWidth: parseInt(width, 10), borderColor: color, borderStyle: style }
  }

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
              value={borderWidth}
              onChange={setBorderWidth}
            />
          </Space>
          <Space>
            <span>边框颜色</span>
            <ColorPicker
              value={borderColor}
              onChange={(event) => setBorderColor(event.target.value)}
            ></ColorPicker>
          </Space>
          <Space>
            <span>边框样式</span>
            <Select defaultValue={borderStyle} value={borderStyle} onChange={setBorderStyle}>
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