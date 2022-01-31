import { Navigate } from "react-router-dom";

function AuthRoute({children}){
    let hasToken=JSON.parse(sessionStorage.getItem('auth'));
    if(!hasToken){
        return <Navigate to="/" />
    }
    return children;
}

export default AuthRoute;