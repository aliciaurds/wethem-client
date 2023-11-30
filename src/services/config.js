import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:5005/api"
})

//para decirle a react que en TODAS las llamadas envie el token. Hacemos lo siguiente

service.interceptors.request.use((req)=>{ //interceptar la llamada antes de salir y añadir info

    const token = localStorage.getItem("authToken")
    
    //si el token existe, añadelo al request/llamada
    if(token){
        req.headers.authorization = `Bearer ${token}`
    }
    return req
}) 

export default service