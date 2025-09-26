import { Icon } from "@iconify/react";
import { usePostStore } from "../../Store/PostStore";

export const InputPublicar = () => {
    const {setStateForm} = usePostStore()
    return (
        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <input value={""} onClick={setStateForm}
            placeholder="Escribir Nueva Publicacion" className="w-full p-2 rounded focus:outline-none placeholder-gray-500" />

            <div className="flex gap-4 mt-2 text-gray-400">
                <Icon icon="material-symbols:image-outline" width="24" height="24" />
                <Icon icon="material-symbols:list" width="24" height="24" />
                <Icon icon="lsicon:text-outline" width="20" height="20" />
                <Icon icon="material-symbols:gif-2-rounded" width="24" height="24" />
            </div>
        </div>
    );
};