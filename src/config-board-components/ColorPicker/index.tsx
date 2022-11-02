import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Radio, Space } from 'antd';
import { EColorPickerType } from '../../types/enum';

interface IColorPickerProps {
  onChange?: (event: any) => void;
  defaultValue?: string;
}

export default function ColorPicker(props: IColorPickerProps) {
  const [type, setType] = useState<EColorPickerType>(EColorPickerType.color16);
  const [color16, setColor16] = useState('');
  const [RGBA_R, setRGBA_R] = useState(0);
  const [RGBA_G, setRGBA_G] = useState(0);
  const [RGBA_B, setRGBA_B] = useState(0);
  const [RGBA_A, setRGBA_A] = useState(1);

  useEffect(function () {
    formatColor()
  }, [color16, type, RGBA_A, RGBA_B, RGBA_G, RGBA_R])
  function formatColor() {
    let str = '';
    if (type === EColorPickerType.color16) {
      if (/^([A-F|a-f|0-9]{3}){1,2}$/.test(color16)) {
        str = `#${color16}`;
      }
    }
    else if (type === EColorPickerType.rgba) {
      str = `rgba(${RGBA_R}, ${RGBA_G}, ${RGBA_B}, ${RGBA_A})`;
    }
    else {
      props.onChange && props.onChange({ target: { value: '' }});
    }
    if (!str) return;
    props.onChange && props.onChange({ target: {value: str} });
  }
  function renderColor16() {
    return (
      <Input addonBefore="#" onChange={(e) => setColor16(e.target.value)} value={color16} />
    )
  }
  function renderRGBA() {
    return (
      <Space direction="vertical">
        <InputNumber min={0} max={255} addonBefore="R" defaultValue={0} onChange={setRGBA_R} value={RGBA_R} />
        <InputNumber min={0} max={255} addonBefore="G" defaultValue={0} onChange={setRGBA_G} value={RGBA_G} />
        <InputNumber min={0} max={255} addonBefore="B" defaultValue={0} onChange={setRGBA_B} value={RGBA_B} />
        <InputNumber min={0} max={1} step={0.1} precision={1} addonBefore="A" onChange={setRGBA_A} value={RGBA_A} />
      </Space>
    )
  }
  return (
    <>
      <Radio.Group onChange={(e) => setType(e.target.value)} value={type}>
          <Radio value={EColorPickerType.none}>无</Radio>
          <Radio value={EColorPickerType.color16}>16进制</Radio>
          <Radio value={EColorPickerType.rgba}>RGBA</Radio>
      </Radio.Group>
      {type !== EColorPickerType.none && (type === EColorPickerType.color16 ? renderColor16() : renderRGBA())}
    </>
  )
}