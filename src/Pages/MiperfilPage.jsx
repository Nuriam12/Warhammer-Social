
import { useUsuariosStore } from "../Store/UsuariosStore";

export const MiperfilPage = () => {
    const {dataUsuarioAuth} = useUsuariosStore()
    return (
        <div className="h-screen bg-amber-300 text-black flex flex-col">
            <span>MiperfilPage</span>
            <span>Usuario{dataUsuarioAuth?.nombre}</span>
        </div>
    );
};