import React from 'react';
import { useParams } from 'react-router-dom';

function MenuList() {
  const routerParams = useParams();
  return (
    <div>menus page. project id is {routerParams.projectId}</div>
  )
}

 
export default MenuList;