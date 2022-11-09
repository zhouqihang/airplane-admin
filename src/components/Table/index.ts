import HOCEditorContainer from "../HOCEditorContainer";
import Table, { ITableProps } from './Component';
import TableConfigBoard from "./ConfigBoard";

const index = {
  Component: Table,
  ConfigBoard: TableConfigBoard,
  EditorComponent: HOCEditorContainer<ITableProps>(Table)({
    rewriteProps: (props) => {
      let data = [];
      data.push(
        props.columns?.reduce((res: Record<string, string>, item: any) => {
          res[item.dataIndex] = 'data';
          return res;
        }, { id: '1' })
        )
      return { ...props, dataSource: data };
    }
  }),
  defaultProps: {
    columns: [],
    rowKey: 'id'
  }
}

export default index;