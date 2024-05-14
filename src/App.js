import NavBar from './components/NavBar/NavBar'
import {Routes, Route} from 'react-router-dom'
import Cadastrar from './Pages/Cadastro/Cadastrar'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
function App() {
  return (
    <div className='App'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cadastro' element={<Cadastrar/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App