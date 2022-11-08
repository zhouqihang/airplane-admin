import { Form, InputNumber, Radio, Space, Select, RadioChangeEvent } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import usePropsChange from '../../hooks/usePropsChange';
import ColorPicker from '../ColorPicker';

interface IBorderPicker {
  onChange?: (value: string) => void;
  value?: string;
}

interface IBorderState {
  hasBorder: boolean;
  borderWidth: number;
  borderColor: string;
  borderStyle: string;
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
  const callbackGetConfigFromProps = useCallback<() => IBorderState>(function () {
    let defaultValue = { hasBorder: false, borderWidth: 0, borderColor: '', borderStyle: '' };
    if (props.value) {
      const [width, style, ...colors] = props.value.split(' ');
      defaultValue = { hasBorder: true, borderWidth: parseInt(width, 10), borderColor: colors.join(' '), borderStyle: style }
    }
    return defaultValue;
  }, [props.value]);
  const [border, setBorder] = useState<IBorderState>(callbackGetConfigFromProps())

  const computedBorder = useMemo(function() {
    if (!border.hasBorder) {
      return '';
    }
    if (!border.borderWidth) {
      return '';
    }
    return `${border.borderWidth}px ${border.borderStyle} ${border.borderColor}`;
  }, [border])

  usePropsChange(function () {
    setBorder(callbackGetConfigFromProps());
  }, props, ['value']);

  useEffect(function () {
    props.onChange && props.onChange(computedBorder);
  }, [computedBorder]);

  function updateBorder(key: keyof IBorderState) {
    return function (event: unknown) {
      if (event && typeof event === 'object') {
        setBorder({
          ...border,
          [key]: (event as RadioChangeEvent).target.value
        })
      }
      else {
        setBorder({
          ...border,
          [key]: event
        })
      }
    }
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
              value={border.borderWidth}
              onChange={updateBorder('borderWidth')}
            />
          </Space>
          <Space>
            <span>边框颜色</span>
            <ColorPicker
              value={border.borderColor}
              onChange={updateBorder('borderColor')}
            ></ColorPicker>
          </Space>
          <Space>
            <span>边框样式</span>
            <Select value={border.borderStyle} onChange={updateBorder('borderStyle')}>
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
      <Radio.Group onChange={updateBorder('hasBorder')} value={border.hasBorder}>
        <Radio value={false}>无</Radio>
        <Radio value={true}>有</Radio>
      </Radio.Group>
      { border.hasBorder ? renderBorderConfig() : null }
    </>
  )
}
