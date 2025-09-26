import { Icon } from "@iconify/react";
import { useAuthStore } from "../../../Store/AuthStore";

export const BtnLogout = () => {
    const {CerrarSesion} = useAuthStore()
    return (
        <div className="flex items-center gap-3 p-2 rounder-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-center sm:justify-start cursor-pointer"onClick={CerrarSesion}>
            <Icon icon="material-symbols:logout" width="24" height="24" />
            <span className="hidden sm:block"/*RESPONSIVE*/>Cerrar Sesion</span>
        </div>
    );
};