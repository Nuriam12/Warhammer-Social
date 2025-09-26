import { useThemeStore } from "../../../Store/ThemeStore";

export const BtnToggleTheme = () => {
/* este button es el que permite cambiar entre temas (claro y oscuro) como se observa , se hace el llamado al zustand (ThemeStore) y se configura con un ternario el boton */
    const{theme,setTheme}=useThemeStore()
    return (
        <button className="flex items-center  gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-center sm:justify-start cursor-pointer"onClick={setTheme}>
            <span>{theme === "light" ? "☀️":"🌑"}</span>
            <span className="hidden sm:block"/*RESPONSIVE*/>{theme === "light" ? "claro" : "oscuro" }</span>
        </button>
    );
};