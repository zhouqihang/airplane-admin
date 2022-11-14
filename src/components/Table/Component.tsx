import React, { HTMLAttributes, useMemo, useState } from 'react';
import { Table as AntTable, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { console_err } from '../../utils/console';

export interface ITableProps extends TableProps<any> {
  __datasource: 'json' | 'ajax';
  __JSONDatasource: string;
}
interface ITableColumnItem {
  title: string;
  dataIndex?: string;
}

export default function Table(props: ITableProps) {
  const { columns, ...others } = props;
  const [data, setTableData] = useState([]);
  const tableData = useMemo(function () {
    if (props.__datasource === 'json') {
      try {
        return JSON.parse(props.__JSONDatasource);
      }
      catch (err) {
        console_err.prod('The JSON data for table component is wrong.');
        return [];
      }
    }
    return data;
  }, [props.__JSONDatasource, props.__datasource, data]);
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
  }, [columns]);
  return (
    <AntTable {...others} columns={computedColumns} dataSource={tableData} />
  )
}