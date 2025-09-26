import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { MainLayout } from "../Layouts/MainLayout";
import { LoginPage } from "../Pages/LoginPage";
import {ProtectedRoute} from "../componentes/Hooks/ProtectedRoute"
import { MiperfilPage } from "../Pages/MiperfilPage";

export function Myroutes (){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="login" element ={
                <ProtectedRoute authenticated={false} >
                    <LoginPage/>
                </ProtectedRoute>}/>
            <Route path="/" element={
                <ProtectedRoute authenticated={true}>
                    <MainLayout/>
                </ProtectedRoute>
                }>
                <Route index element = {<Home/>}/>
                <Route path="/miperfilpage" element = {<MiperfilPage/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}