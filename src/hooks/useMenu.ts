import { useState } from "react";

export function useMenu() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  function toggleSelectedKeys(key: string) {
    if (selectedKeys.includes(key)) {
      return;
    }
    setSelectedKeys(([] as string[]).concat(...selectedKeys, key))
  }
  return {
    selectedKeys,
    toggleSelectedKeys
  }
}