import {Button, Card, Slider, Switch} from 'antd';
import React, {useMemo, useState} from 'react';
import { useParams } from 'react-router-dom';
import {useProjectRequest} from '../../apis/projectRequest';
import './list.scss';

export default function ApiPage() {

  const params = useParams();
  const [isExpand, setExpand] = useState(false);
  const { projectConf, prefixs, domains, timeoutChangeHandler, httpsChangeHandler } = useProjectRequest(params.projectId as string);
  const expandBtnLabel = useMemo(function () {
    return isExpand ? '收起' : '展开';
  }, [isExpand]);

  return (
    <>
      <Card>
        <div className="api-page__form">
          <div>
            超时时间(毫秒): <Slider defaultValue={0} value={projectConf?.timeout} max={10000} min={1000} style={{ width: '50%' }} step={1000} onChange={timeoutChangeHandler} />
          </div>
          <div>
            开启https: <Switch checked={projectConf?.isHttps} onChange={httpsChangeHandler} />
          </div>
        </div>
        <div className="api-page__form" style={{ height: isExpand ? 'auto' : '0px' }}>
          <div>
            <p>域名映射<Button type="link">修改</Button></p>
            {domains.map((item, index) => (
              <p key={index}>{item.name} - {item.value}</p>
            ))}
          </div>
          <div>
            <p>API前缀映射<Button type="link">修改</Button></p>
            {prefixs.map((item, index) => (
                <p key={index}>{item.name} - {item.value}</p>
            ))}
          </div>
        </div>
        <div className="flex-x-center">
          <Button type="link" ghost onClick={() => setExpand(!isExpand)}>{expandBtnLabel}</Button>
        </div>
      </Card>
    </>
  )
}
