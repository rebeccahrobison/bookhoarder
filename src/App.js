import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/auth/Login';
import { Authorized } from './views/Authorized';
import { ApplicationViews } from './views/ApplicationViews';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>

      <Route path="*" element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      } />
    </Routes>
  );
}

export default App;