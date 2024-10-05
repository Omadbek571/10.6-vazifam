import { useNavigate } from "react-router-dom"

export default function ProtectedRoutes({ user, children }) {
    console.log("Protected routes ishladi");

    // const navigate = useNavigate()
    // return user ? children : console.log(user)
}   
