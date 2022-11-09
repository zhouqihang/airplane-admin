import React, { HTMLAttributes, useMemo } from 'react';
import { Table as AntTable, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';

export interface ITableProps extends TableProps<any> {}
interface ITableColumnItem {
  title: string;
  dataIndex?: string;
}

export default function Table(props: ITableProps) {
  const { columns, ...others } = props;
  // 给columns添加key
  const computedColumns = useMemo(function () {
    if (!columns) {
      return [];
    }
    return columns.map((item: ColumnType<any>) => {
      return {
        ...item,
        key: item.dataIndex as string
      }
    })
  }, [props.columns]);
  return (
    <AntTable {...others} columns={computedColumns} />
  )
}