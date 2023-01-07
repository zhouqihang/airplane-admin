export interface IProjectRequest {
  id: number;
  timeout: number;
  isHttps: boolean;
  updateTime: string;
  domains: {
    domains: IDomainItem[]
  },
  prefixs: {
    prefixs: IDomainItem[]
  }
}

export interface IUpdateParams {
  timeout?: number;
  isHttps?: boolean;
  domains?: string;
  prefixs?: string;
}

export interface IDomainItem {
  name: string;
  value: string;
}
