import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import globalStateContext, { getDefaultState, IGlobalState, stateWithoutSet } from './utils/global-state-context';
import Layout from './pages/layout';
import Login from './pages/login';
import Users from './pages/users/list';
import Projects from './pages/projects/list';
import Menus from './pages/menus/list';
import { SESSION_STORAGE_PROJECT_KEY } from './utils/constants';
import 'antd/dist/antd.css';
import './assets/styles/common.scss';

function App() {
  const cache = sessionStorage.getItem(SESSION_STORAGE_PROJECT_KEY);
  const [globalState, setGlobalState] = useState<IGlobalState>({
    ...getDefaultState(),
    projectId: Number(cache),
    setGlobalState: function (state: stateWithoutSet) {
      setGlobalState(Object.assign({}, globalState, state));
    }
  });

  const subMenus = globalState.projectId ? [
    <Route path=":projectId/menus" key="menus" element={<Menus />} />
  ] : [];

  return (
    <globalStateContext.Provider value={globalState}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="users" element={<Users />} />
            <Route path="projects" element={<Projects />} />
            {subMenus}
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </globalStateContext.Provider>
  );
}

export default App;
