import HOCEditorContainer from "../HOCEditorContainer";
import Title from "./Component";
import TitleConfigBoard from "./ConfigBoard";

const index = {
  Component: Title,
  ConfigBoard: TitleConfigBoard,
  EditorComponent: HOCEditorContainer(Title)({}),
  defaultProps: {
    style: {
      margin: '0px',
      padding: '0px',
      color: '#333',
      textAlign: 'left',
      fontWeight: 500,
      fontSize: '34px'
    },
    type: 'h1',
    content: 'Title'
  },
  contains: []
}

export default index;