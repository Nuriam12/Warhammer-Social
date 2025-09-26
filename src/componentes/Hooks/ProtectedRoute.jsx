import { Navigate } from "react-router-dom";
import { useSubcription } from "../../Store/AuthStore";
//usamos este hook para proteger las rutas , lo usamos para las paginas como login , solo dando acceso si el usuario esta autenticado
export const ProtectedRoute=({children,authenticated=true})=>{
    const {user} = useSubcription();
    if(authenticated===false){
    if(!user){
        return children;
    }else{
        return <Navigate to={"/"}replace/>;
    }}

    if(authenticated){
    if (user){
        return children;
    }else {
        return <Navigate to={"/login"} replace/> ;
    }}
    return <Navigate to="/login" replace/>
}



