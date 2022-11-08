import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, InputNumber, Radio, Space } from 'antd';
import { EColorPickerType } from '../../types/enum';
import usePropsChange from '../../hooks/usePropsChange';

interface IColorPickerProps {
  onChange?: (event: any) => void;
  value?: string;
}

export default function ColorPicker(props: IColorPickerProps) {
  const callbackGetColor16FromProps = useCallback(function () {
    if (props.value?.startsWith('#')) {
      return props.value.replace('#', '');
    }
    return '';
  }, [props.value])
  const callbackGetTypeFromProps = useCallback(function () {
    if (!props.value) {
      return EColorPickerType.none
    }
    if (props.value.startsWith('#')) {
      return EColorPickerType.color16;
    }
    return EColorPickerType.rgba;
  }, [props.value]);

  /**
   * 从props中解析出rgba颜色值
   */
    const callbackGetRGBAFromProps = useCallback(function () {
      if (!props.value || !/^(rgba|RGBA)\((.*)\)$/.test(props.value)) return [0, 0, 0, 1];
      const matcher = props.value.match(/^(rgba|RGBA)\((.*)\)$/);
      if (!matcher || matcher.length === 0) return [0, 0, 0, 1];
      const [r, g, b, a] = matcher[2].split(',');
      return [parseInt(r, 10), parseInt(g, 10), parseInt(b, 10), parseFloat(a)]
    }, [props.value])

  const [type, setType] = useState<EColorPickerType>(callbackGetTypeFromProps());
  const [color16, setColor16] = useState(callbackGetColor16FromProps());
  const [r, g, b, a] = callbackGetRGBAFromProps();
  const [RGBA_R, setRGBA_R] = useState<string | number>(r);
  const [RGBA_G, setRGBA_G] = useState<string | number>(g);
  const [RGBA_B, setRGBA_B] = useState<string | number>(b);
  const [RGBA_A, setRGBA_A] = useState<string | number>(a);
  const computedColor = useMemo(function () {
    let str = '';
    if (type === EColorPickerType.color16) {
      str = `#${color16}`;
    }
    else if (type === EColorPickerType.rgba) {
      str = `rgba(${RGBA_R}, ${RGBA_G}, ${RGBA_B}, ${RGBA_A})`;
    }
    return str;
  }, [type, color16, RGBA_R, RGBA_G, RGBA_B, RGBA_A])
  
  usePropsChange<IColorPickerProps>(function (prevProps) {
    if (!props.value) {
      setType(EColorPickerType.none);
    }
    else {
      if (props.value.includes('#')) {
        setType(EColorPickerType.color16);
        setColor16(props.value.replace('#', ''));
      }
      else {
        if (/^(rgba|RGBA)\((.*)\)$/.test(props.value)) {
          setType(EColorPickerType.rgba);
          const [r, g, b, a] = callbackGetRGBAFromProps();
          setRGBA_R(r);
          setRGBA_G(g);
          setRGBA_B(b);
          setRGBA_A(a);
        }
      }
    }
  }, props, ['value']);
  // state中数据变化，触发change
  useEffect(function () {
    props.onChange && props.onChange({ target: {value: computedColor} });
  }, [computedColor])
    
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