import { Route, Routes } from 'react-router-dom';

import SignInPage from './pages/SignInPage'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage';
import { UserProvider } from "./providers/UserProvider"; 

function App() {
  return (
    <div className="App bg-white min-h-screen">
      <UserProvider>
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
