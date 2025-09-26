import { Icon } from "@iconify/react";

export const BtnNewPost = () => {
    return (
        <button className="mt-4 flex bg-primary hover:bg-primary/90 font-semibold p-2 px-4 rounded-full items-center gap-2 transition cursor-pointer justify-center sm:justify-start">
            <Icon icon="material-symbols:add" width="24" height="24" />
            <span className="hidden sm:block"/*RESPONSIVE*/>NUEVA PUBLICACION</span>
        </button>
    );
};