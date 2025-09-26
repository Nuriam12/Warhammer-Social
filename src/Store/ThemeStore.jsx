import { create } from "zustand";
import { persist } from "zustand/middleware";
/*aqui aplicamos el cambio de tema (claro y oscuro) y usamos un ternario */
export const useThemeStore = create(persist((set)=>({
    theme:"light",
    setTheme:()=>set((state)=>{
        const newTheme=state.theme === "light" ? "dark" : "light"
        document.documentElement.classList.remove(state.theme);
        document.documentElement.classList.add(newTheme);
        return {theme:newTheme};
    }),
}),
    {name:"theme-storage-onlydevs"}
),)