import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import MainLayout from './components/MainLayout'
import ProtectedRoutes from './layout/ProtectedRoutes'

function App() {

  // user useState yordamida yaratilinyabdi
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const navigate = useNavigate()

  // shu erda tekshiruv amalga oshybdi saqlanyabi yoki ochirilyabdi
  function userSetter(user) {
    setUser(() => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
      return user
    })
  }

  // agar user mavjud bolsa ✅ mavjud qaytaradi akisholda ❌
  useEffect(() => {
    console.log(user ? "Foydalanuvchi mavjud ✅" : "Foydalanuvchi mavjud emas ❌")
    if (user) navigate("/")
    else navigate("/login")
  }, [user])

  return (
    <div className='bg-slate-700 container mx-auto rounded-xl p-4'>
      <Routes>
        <Route index element={
          <MainLayout setUser={userSetter}>
            <Home></Home>
          </MainLayout>
        }
        ></Route>
        <Route path='/login' element={<Login setUser={userSetter}></Login>}></Route>
        <Route path='/register' element={<Register setUser={userSetter}></Register>}></Route>
        <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </div >
  )
}

export default App
