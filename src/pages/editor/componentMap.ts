import Container from "../../components/Container";

export type componentTypeKeys = keyof typeof componentMap;
const componentMap = {
  'container': Container
};


export default componentMap;
