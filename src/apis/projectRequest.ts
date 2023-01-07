import {IProjectRequest, IUpdateParams} from "../types/projectRequests";
import {get, patch} from "../utils/request";
import {useCallback, useEffect, useMemo, useState} from "react";
import debounce from "../utils/debounce";

export function getProjectRequestConf(projectId: number | string) {
  return get<IProjectRequest>(`/api/projects/${projectId}/request`);
}

export function updateProjectRequestConf(projectId: number | string, params: IUpdateParams) {
  return patch<IProjectRequest>(`/api/projects/${projectId}/request`, params);
}

export function useProjectRequest(projectId: number | string) {
  const [projectConf, setProjectConf] = useState<IProjectRequest | null>(null);

  const prefixs = useMemo(function () {
    return projectConf ? projectConf.prefixs.prefixs : [];
  }, [projectConf?.prefixs])
  const domains = useMemo(function () {
    return projectConf ? projectConf.domains.domains : [];
  }, [projectConf?.domains])

  useEffect(function () {
    getProjectRequestConf(projectId).then(res => {
      setProjectConf(res.data);
    }).catch(() => {});
  }, []);

  async function updateByKey(key: keyof IProjectRequest, value: any) {
    try {
      let val = value;
      if (key === 'prefixs' || key === 'domains') {
        val = JSON.stringify(value);
      }
      const res = await updateProjectRequestConf(projectId, { [key]: val })
      setProjectConf({
        ...projectConf,
        ...res.data
      })
    }
    catch (err) {}
  }
  const updateTimeout = useCallback(debounce(function (val: number) {
    updateByKey('timeout', val);
  }, 1000), [])

  function timeoutChangeHandler(val: IProjectRequest['timeout']) {
    if (!projectConf) return;
    setProjectConf({
      ...projectConf,
      timeout: val
    })
    updateTimeout(val);
  }

  function httpsChangeHandler(val: IProjectRequest['isHttps']) {
    if (!projectConf) return;
    setProjectConf({
      ...projectConf,
      isHttps: val
    })
    updateByKey('isHttps', val);
  }

  return { projectConf, prefixs, domains, timeoutChangeHandler, httpsChangeHandler }
}
