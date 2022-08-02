import { get, patch, post, delet } from '../utils/request';
import { IUsersItem, IUsersRequestParams, ICreateUserParams, IUpdateUserParams } from '../types/users';
import { IPaginationResponse } from '../types/request';
import { useEffect, useState } from 'react';

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

export function updateUser(id: number, params: IUpdateUserParams) {
  return patch<IUsersItem>('/api/users/' + id, params);
}

export function removeUser(id: number) {
  return delet('/api/users/' + id);
}

export function getCurrentUserInfo() {
  return get<IUsersItem>('/api/users/self');
}

export function useCurrentUser() {
  const [user, setUser] = useState<IUsersItem | undefined>(undefined);
  useEffect(function () {
    getCurrentUserInfo().then(res => {
      setUser(res.data);
    })
  }, []);

  return user;
}

export function getUser(id: number) {
  return get<IUsersItem>('/api/users/' + id);
}

export function useGetUser() {
  const [user, setUser] = useState<IUsersItem>();
  const [loading, setLoading] = useState<boolean>(false);
  async function requestUser(id: number) {
    try {
      setLoading(true);
      const res = await getUser(id);
      setUser(res.data);
    }
    catch(err) {}
    finally {
      setLoading(false);
    }
  }
  return {
    user,
    loading,
    requestUser
  }
}

export function getUsersCreatedByMyself() {
  return get<IUsersItem[]>('/api/users/self');
}