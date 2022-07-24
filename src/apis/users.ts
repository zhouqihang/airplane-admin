import { get, post } from '../utils/request';
import { IUsersItem, IUsersRequestParams, ICreateUserParams } from '../types/users';
import { IPaginationResponse } from '../types/request';
import { useState } from 'react';

export function getUsers(params: IUsersRequestParams) {
  return get<IPaginationResponse<IUsersItem>>('/api/users', params);
}

export function useGetUsers() {
  const [users, setUsers] = useState<IUsersItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0
  });

  async function requestUsers(params: IUsersRequestParams) {
    setLoading(true);
    try {
      const res = await getUsers(params);
      const { total, list } = res.data;
      setUsers(list);
      setPagination({
        page: res.data.page,
        pageSize: res.data.pageSize,
        total: total
      })
    }
    catch(err) {
      // nothing
    }
    finally {
      setLoading(false)
    }
  }

  return { users, pagination, loading, requestUsers };
}

export function createUser(params: ICreateUserParams) {
  return post<IUsersItem>('/api/users', params);
}