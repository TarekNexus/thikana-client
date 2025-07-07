import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import { use } from "react";
import Loading from "../components/Loading";



const PrivateRoute = ({children}) => {
    const {user,loading}=use(AuthContext)
    const location=useLocation()
   
    if(loading){
        return <Loading></Loading>
    }

    if(user&&user?.email){
        return children
    }
   return <Navigate state={location.pathname} to="/auth/login"></Navigate>
};

export default PrivateRoute;