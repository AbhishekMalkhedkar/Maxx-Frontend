import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import {Route, Routes} from 'react-router-dom';
import Nav from './component/Nav';
import { useContext } from 'react';
import { userDataContext } from './context/UserContext';

function App() {

    const {userData} = useContext(userDataContext);

  return (
    <>
      {userData && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      
    </>
  )
}

export default App
