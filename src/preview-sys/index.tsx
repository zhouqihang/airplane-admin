import React, { useEffect, useState } from 'react';
import { getProjectConf } from '../apis/projects';
import Composition from '../composition';
import { get } from '../utils/request';

// 这里要区分一下
// preview系统要从api获取整个项目的配置，然后从配置生成页面
// build系统要从json文件或js文件中获取配置（本质还是从api获取配置，但是node把配置写入文件中去），然后从配置生成页面
export default function PreviewSystem() {

  const [config, setConfig] = useState<any>(null);
  useEffect(function () {
    getProjectConf(1).then((res) => {
      setConfig(res.data)
    })
  }, []);

  return (
    config ? <Composition config={config} /> : null
  )
}