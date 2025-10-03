import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/SignIn'
import Main from './pages/Main'
import { UserProvider } from "./providers/UserProvider"; 

function App() {
  return (
    <div className="App bg-white min-h-screen">
      <UserProvider>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
