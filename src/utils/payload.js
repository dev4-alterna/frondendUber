export default function (){
    const token= localStorage.getItem('UberToken')
    if(token){
        const baseUri=token.split('.')[1];
        const base64=baseUri.replace('-','+').replace('_','/')
        const payload= JSON.parse(window.atob(base64));

        return{
            isAuthenticated:true,
            user:{...payload}
        }
    }
    else{
        return{
            isAuthenticated:false,
            user:null
        }    
    }
}
