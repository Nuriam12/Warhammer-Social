import { create } from "zustand";
import {supabase} from "../supabase/supabase.config"
const tabla = "publicaciones";
const InsertarPost = async(p,file)=>{
    const{data,error}= await supabase
    .from(tabla)
    .insert(p)
    .select()
    .maybeSingle();
    if(error) {
        throw new Error(error.message);
    }
    if(file){
        const nuevo_id = data?.id
        const urlImagen = await subirArchivo(nuevo_id, file)
        const pUrl = {
            url:urlImagen.publicUrl,
            id:nuevo_id,
        };
        await EditarPublicacion(pUrl)
    }
};

const EditarPublicacion = async (p) =>{
        const {error}= await supabase.from(tabla).update(p).eq("id",p.id)
        if (error){
            throw new Error(error.message)
        }
    }
const subirArchivo =async(id,file)=>{
        const ruta = "publicaciones/"+id
        const {data,error} = await supabase.storage.from("archivos").upload(ruta,file,{
            cacheControl : "0",
            upsert:true
        })
        if(error) {
            throw new Error(error.message);
        }
        if(data){
            const {data:urlimagen} = await supabase.storage.from("archivos").getPublicUrl(ruta)
            return urlimagen
        }
        

    }


export const usePostStore = create ((set)=>({
    itemSelect:null,
    setItemSelect:(p) => set({itemSelect:p}),
    file:null,

    setFile : (p) => set ({file:p}),
    stateImage: false,
    setStateImage: () => {
        set((state) => ({stateImage:!state.stateImage}));
        },

        stateForm : false,
        setStateForm: ()=> {
            set((state)=>({stateForm:!state.stateForm}));
        },

    insertarPost : async (p,file) =>{
        await InsertarPost (p,file);
            },
    dataPost:null,

    mostrarPost : async(p)=>{
        const{data,error} = await supabase.rpc("publicaciones_con_detalles",{_id_usuario:p.id_usuario,}).range(p.desde,p.desde + p.hasta -1);
        if (error) {
            throw new Error(error.message);
        }
        set({dataPost:data});
        return data;
    },
    likePost:async(p)=>{
        const {error} = await supabase.rpc("toogle_like",p)
        if(error) throw Error (error.message);
    },
}));