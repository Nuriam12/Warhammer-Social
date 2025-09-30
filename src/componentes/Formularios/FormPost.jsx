import { BtnClose } from "../UI/buttons/BtnClose";
import {useUsuariosStore} from "../../Store/UsuariosStore"
import { useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import { Icon } from "@iconify/react";
import { ImageSelector } from "../Hooks/useImageSelector";
import { usePostStore } from "../../Store/PostStore";
import { useInsetartPostMutate } from "../../stack/PostStack";
import { useForm } from "react-hook-form";

export const FormPost = () => {
    const {dataUsuarioAuth} = useUsuariosStore();
    {/*introduciomos los emojis al input */}
    const [showEmojPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);
    const pickerRef = useRef(null); //Con esto nos permite cerrar la ventana de emojis
    const [postText, setPostText]=useState("");
    const{stateImage,setStateImage,setStateForm,file} = usePostStore(); //usamos setStateForm para entrar o salir de "CREAR PUBLICACION"
    const {mutate,isPending} = useInsetartPostMutate();
    const {handleSubmit,setValue} = useForm ();
    const puedePublicar = postText.trim().length > 0 || file!==null
    const addEmoji = (emojiData) => {
        const emojiChar = emojiData.emoji;
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const originalText = textarea.value;

        const newText = originalText.substring(0, start) + emojiChar + originalText.substring(end);

        setPostText(newText);
    };
    const handleTextChange = (e) => {
        setPostText (e.target.value);
        setValue("descripcion",e.target.value)
    };
    useEffect (()=>{
        const handleClickOutside = (e) => {
            if(pickerRef.current && !pickerRef.current.contains(e.target)){
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
            return ()=> document.removeEventListener("mousedown",handleClickOutside);
    },
    []);
        //TODO EL CONTENIDO PARA CREAR PUBLICACION//
    return (
        <section className="fixed z-50 flex items-center justify-center inset-0">
            {/*fondo difuminado*/}
            <div className="absolute inset-0 backdrop-blur-sm cursor-pointer"></div>
                <section className="bg-white relative text-withe w-full max-w-md dark:bg-bg-dark rounded-lg shadow-xl">
                    {/*header*/}
                    <header className="flex items-center justify-between p-4 border-b border-gray-500/40">
                        <h2 className="text-xl font-semibold">Crear Publicacion</h2>
                        <BtnClose funcion={setStateForm}/>
                    </header>
                    {/*User info*/}
                    <main className="p-4 space-y-4">
                        <section className="flex items-center gap-3">
                            <img className="w-10 h-10 rounded-full mr-3 object-cover " src={dataUsuarioAuth?.foto_perfil} alt="" />
                            <div>
                                <span className="font-medium">{dataUsuarioAuth?.nombre}</span>
                            </div>
                        </section>
                        <form onSubmit={handleSubmit(()=>mutate({descripcion:postText}))} >
                            <div className="relative">
                                <textarea ref={textareaRef} value={postText}  onChange={handleTextChange} placeholder="¿Que estas pensando?" className="w-full placeholder-gray-500 outline-none" />
                                {
                                    showEmojPicker &&( <div className="absolute top-10 left-10 mt-2 z-1 " ref={pickerRef}>
                                        
                                         <EmojiPicker onEmojiClick={addEmoji} theme="auto" searchDisabled  /> </div> )      
                                }
                                <div className="mt-4 flex items-center justify-between">
                                    <button disabled={!puedePublicar || isPending} type="submit" className={`py-2 px-4 rounded-lg font-medium ${puedePublicar?"bg-primary cursor-pointer":"bg-gray-400 cursor-not-allowed"}`}>Publicar</button>
                                    <button onClick={()=>setShowEmojiPicker(!showEmojPicker)} type="button" className="p-1 text-black/50 dark:text-white/50 cursor-pointer hover:bg-gray-700 rounded-full">
                                        <Icon icon="mdi:emoji-outline" width="24" height="24" />
                                    </button>
                                </div>
                            </div>
                        </form>
                        {
                            stateImage && <ImageSelector/> 
                        }
                    </main>
                    <footer className="p-4 border-t border-gray-500/40">
                        <div className="flex items-center justify-between p-3 border border-gray-500/40 rounded-lg">
                                <span className="text-sm dark:text-white">Agregar a tu Publicacion</span>
                                <div className="flex space-x-4">
                                    <button onClick={setStateImage} className="p-1 rounded-full text-black/50 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" aria-label="agregar imagen">
                                        <Icon icon="material-symbols:image-outline" width="24" height="24" />
                                    </button>
                                </div>
                        </div>
                    </footer>
                </section>
        </section>
        
    );
};