import { NavLink,} from "react-router-dom";
import { Icon } from "@iconify/react";
import { BtnToggleTheme } from "../UI/buttons/BtnToggleTheme";
import { BtnLogout } from "../UI/buttons/BtnLogout";
import { BtnNewPost } from "../UI/buttons/BtnNewPost";

export const Sidebar = () => {
    const links =[
        {
            label : "Inicio",
            icon:"raphael:home",
            to:"/"
        },
        {
            label : "Notificaciones",
            icon:"ion:notifications",
            to:"/notificaciones"
        },
        {
            label : "Mensajes",
            icon:"tabler:message-2-filled",
            to:"/mensajes"
        },
        {
            label : "Colecciones",
            icon:"ic:baseline-collections",
            to:"/colecciones"
        },
        {
            label : "Suscripciones",
            icon:"stash:subscription-list",
            to:"/suscripciones"
        },
        {
            label : "Añadir tarjeta",
            icon:"bytesize:creditcard",
            to:"/tarjeta"
        },
        {
            label : "Mi Perfil",
            icon:"gg:profile",
            to:"/miperfilpage"
        }, 
              
    ]
    return (
        <div className="h-screen p-2 bg-white dark:bg-bg-dark transition-all duration-300 flex flex-col">
            {/*LOGO*/}
            <div className="flex justify-center items-center h-8 w-8 rounded-full bg-blue-100 text-primary font-bold text-xs M-2">
                OD
            </div>
            {/*logo*/}
            <nav className="flex-1 flex flex-col gap-4 items-center p-3 ">
            {links.map((item,index)=>{
                return (
                <NavLink key={index} to={item.to}className={({isActive})=>`flex items-center gap-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-primary/10 dark:hover:text-primary transition-all w-full justify-center sm:justify-start ${
                    isActive ? "text-blue-600 dark:text-red-600":"text-gray-600 dark:text-gray-400"
                }`}>
                <Icon icon={item.icon} width={24} height={24}/> 
                <span className="hidden sm:block"/*RESPONSIVE*/>{item.label}</span>   
                </NavLink> )
            }
            )}
            </nav>
            <BtnToggleTheme/>
            <BtnLogout/>
            <BtnNewPost/>
        </div>
    );
};