import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import {Route, Routes} from 'react-router-dom';

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      
    </>
  )
}

export default App
