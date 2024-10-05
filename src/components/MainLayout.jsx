import React from 'react'
import { useNavigate } from 'react-router-dom'

function MainLayout({ children, setUser }) {

    const navigate = useNavigate()


    return (
        <div className='container mx-auto'>
            <div className="navbar ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">LOGO</a>
                </div>
                <div className="flex-none">
                {/* LOGOUT tugmasi bosilganda, setUser(null) chaqiriladi, bu esa foydalanuvchini tizimdan chiqaradi */}
                    <button onClick={() => setUser(null)} className="btn btn-outline btn-success">
                        LOGOUT
                    </button>
                </div>
            </div>
            <div className='bg-green-200 text-black font-bold rounded-xl mt-4 p-2'>{children}</div>
        </div>
    )
}

export default MainLayout