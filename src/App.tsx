import { HashRouter, Route, Routes } from 'react-router-dom';
import HomeView from './page/HomeView';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<HomeView />} />
      </Routes>
    </HashRouter>
  );
}
