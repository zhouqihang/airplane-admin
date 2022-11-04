import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Radio, Space } from 'antd';
import { EColorPickerType } from '../../types/enum';

interface IColorPickerProps {
  onChange?: (event: any) => void;
  value?: string;
}

export default function ColorPicker(props: IColorPickerProps) {
  const [type, setType] = useState<EColorPickerType>(() => {
    if (!props.value) return EColorPickerType.none;
    if (props.value.includes('#')) return EColorPickerType.color16;
    if (/^(rgba|RGBA)\((.*)\)$/.test(props.value)) return EColorPickerType.rgba;
    return EColorPickerType.none;
  });
  const [color16, setColor16] = useState(() => {
    if (props.value) {
      return props.value.replace('#', '');
    }
    return '';
  });
  const [RGBA_R, setRGBA_R] = useState(getRGBAFromProps()[0]);
  const [RGBA_G, setRGBA_G] = useState(getRGBAFromProps()[1]);
  const [RGBA_B, setRGBA_B] = useState(getRGBAFromProps()[2]);
  const [RGBA_A, setRGBA_A] = useState(getRGBAFromProps()[3]);

  /**
   * 将默认颜色值字符串转换成state
   */
  useEffect(function () {
    if (!props.value) {
      return setType(EColorPickerType.none);
    }
    if (props.value.includes('#')) {
      setType(EColorPickerType.color16);
      setColor16(props.value.replace('#', ''));
      return;
    }

    if (/^(rgba|RGBA)\((.*)\)$/.test(props.value)) {
      const matcher = props.value.match(/^(rgba|RGBA)\((.*)\)$/);
      if (!matcher || matcher.length === 0) return;
      const [r, g, b, a] = matcher[2].split(',');
      setType(EColorPickerType.rgba);
      setRGBA_A(parseFloat(a));
      setRGBA_R(parseInt(r, 10));
      setRGBA_G(parseInt(g, 10));
      setRGBA_B(parseInt(b, 10));
      return;
    }
  }, [props.value])

  useEffect(function () {
    formatColor()
  }, [color16, type, RGBA_A, RGBA_B, RGBA_G, RGBA_R])
  function getRGBAFromProps() {
    if (!props.value || !/^(rgba|RGBA)\((.*)\)$/.test(props.value)) return [0, 0, 0, 1];
    const matcher = props.value.match(/^(rgba|RGBA)\((.*)\)$/);
    if (!matcher || matcher.length === 0) return [0, 0, 0, 1];
    const [r, g, b, a] = matcher[2].split(',');
    return [parseInt(r, 10), parseInt(g, 10), parseInt(b, 10), parseFloat(a)]
  }
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
    if (str !== props.value) {
      props.onChange && props.onChange({ target: {value: str} });  
    }
    // else {
    //   props.onChange && props.onChange({ target: { value: '' }});
    // }
    // if (!str) return;
    // props.onChange && props.onChange({ target: {value: str} });
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