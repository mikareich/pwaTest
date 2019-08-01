if(navigator.serviceWorker){
    window.addEventListener("load", ()=>{
        navigator.serviceWorker
        .register("../sw.js")
        .then(res =>{
            console.log("Service Worker: registered")
        })
        .catch(err => {
            console.log(`Service Worker: Error: ${err}`)
        })
    })
}