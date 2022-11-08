import { useEffect, useRef } from "react";

/**
 * 模拟 componentDidUpdate 生命周期，当props指定的key值发生变化，执行cb回调函数
 * 
 * @param cb deps指定的属性变更后，触发的回调函数
 * @param props 组件当前props
 * @param deps 要监听的props key，只要有一个指定的key值发生了变化，就会触发cb函数
 */
export default function usePropsChange<P extends object>(
  cb: (prevProps: P | null) => void,
  props: P,
  deps: Array<keyof P>
) {
  const prevProps = useRef<P | null>(null);
  useEffect(function () {
    if (prevProps.current === props) return;

    let changed = false;
    if (!prevProps.current) {
      if (props) {
        changed = true;
      }
    }
    else {
      changed = deps.some(dep => {
        if ((prevProps.current as P)[dep] !== props[dep]) {
          return true;
        }
        return false;
      })
    }

    if (changed) {
      cb(prevProps.current);
    }
    prevProps.current = props;
  })
}