import HOCEditorContainer from "../HOCEditorContainer";
import Paragraph from "./Component";
import ParagraphConfigBoard from "./ConfigBoard";

const index = {
  Component: Paragraph,
  ConfigBoard: ParagraphConfigBoard,
  EditorComponent: HOCEditorContainer(Paragraph)({}),
  defaultProps: {
    style: {
      lineHeight: '1.1',
      color: '#333',
      fontSize: '14px',
      textAlign: 'left',
      backgroundColor: '#fff',
      margin: '8px 0',
      padding: '0px'
    },
    content: 'Please input text.'
  },
  contains: []
};

export default index;