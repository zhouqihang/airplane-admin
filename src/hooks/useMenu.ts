import { useState } from "react";

export function useMenu() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  function toggleSelectedKeys(key: string) {
    if (selectedKeys.includes(key)) {
      return;
    }
    const last = selectedKeys[selectedKeys.length];
    if (last) {
      if (key.startsWith(last)) {
        setSelectedKeys(([] as string[]).concat(...selectedKeys, key));
      }
    }
    setSelectedKeys([key]);
  }
  return {
    selectedKeys,
    toggleSelectedKeys
  }
}