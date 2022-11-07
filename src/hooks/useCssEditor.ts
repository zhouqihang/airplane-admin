import React, { useState, CSSProperties, cloneElement, useEffect } from "react";

interface ICustomState {
  // hasBorder: boolean;
}

type stateType = ICustomState & CSSProperties;

interface IBindVaueParams {
  event: string;
  field: keyof stateType;
}

export default function useCssEditor(defaultValue?: stateType) {
  const [cssState, setCssState] = useState<stateType>({
    padding: '',
    margin: '',
    backgroundColor: '',
    borderRadius: '',
    border: '',
    ...defaultValue
  });
  const keys: Array<keyof CSSProperties> = ['padding', 'margin', 'backgroundColor', 'borderRadius', 'border'];
  const [style, setStyle] = useState<CSSProperties>({})

  useEffect(function () {
    setStyle(getStyleObject());
  }, [cssState]);

  function getStyleObject() {
    const computedStyle: CSSProperties = {};
    keys.forEach(k => {
      assignValid<CSSProperties>(computedStyle, k, cssState[k]);
    })

    // border
    // if (cssState.hasBorder) {
    //   style.border = `${cssState.borderWidth}px ${cssState.borderStyle} ${cssState.borderColor}`;
    // }
    return computedStyle;
  }

  function bindValue(node: React.ReactElement) {
    return function (options: IBindVaueParams) {
      let onChangeEvent = null;
      if (options.event === 'onChange') {
        onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
          setCssState(Object.assign({}, cssState, options.field ? {
            [options.field]: event.target.value
          } : event.target.value))
        }
      }
      if (options.event === 'onChangeWithValue') {
        onChangeEvent = (value: unknown) => {
          setCssState(Object.assign({}, cssState, options.field ? {
            [options.field]: value
          } : value))
        }
      }
      return cloneElement(node, {
        onChange: onChangeEvent,
        value: cssState[options.field]
      })
    }
  }

  function updateCssState(state?: stateType) {
    setCssState({
      ...cssState,
      ...state
    })
  }

  return { style, getStyleObject, bindValue, updateCssState };
}

function assignValid<T>(obj: T, key: keyof T, value: any) {
  if (value) {
    obj[key] = value;
  }
}