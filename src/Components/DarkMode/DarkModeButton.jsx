import Moon from "../../assets/moon-solid.svg";

const DarkModeButton = () => {
    
    return(
        <button className="p-1.5 border border-solid ml-5 rounded border-black w-10 h-10 bg-white" onClick={darkMode}>
            <img src={Moon} className="w-10"/>
        </button>
    )
}
export function darkMode (){

    if(document.body.style.backgroundColor != "black"){
        KeepDarkMode()
    }
    else{
        document.body.style.backgroundColor = "white"
        document.querySelectorAll(".BGtoFullBlack").forEach(e =>{
            e.classList.remove("bg-black")
            e.classList.add("bg-white")
            e.classList.remove("text-white")
        })
        document.querySelectorAll(".BGtoBlack").forEach(e => {
            e.classList.add("bg-white")
            e.classList.remove("bg-zinc-950")
            e.classList.add("text-black")
            e.classList.remove("text-gray-200")
        })
        document.querySelectorAll(".borderToWhite").forEach(e => {
            e.classList.add("border-black")
            e.classList.remove("border-gray-50")
            if(e.classList.contains("border-gray-50") == true){
                e.classList.add("border-slate-800")
            }
        })
        document.querySelectorAll(".BGtoWhite").forEach(e => {
            e.classList.remove("bg-white")
            e.classList.add("bg-black")
            e.classList.remove("text-gray-950")
            e.classList.add("text-white")
        })
        document.querySelectorAll(".textToWhite").forEach(e => {
            e.classList.remove("text-white")
        })
    }
}
export function KeepDarkMode(){

    document.body.style.backgroundColor = "black"
        document.querySelectorAll(".BGtoFullBlack").forEach(e =>{
            e.classList.remove("bg-white")
            e.classList.add("bg-black")
            e.classList.add("text-white")
        })
        document.querySelectorAll(".BGtoBlack").forEach(e => {
            e.classList.remove("bg-white")
            e.classList.add("bg-gray-900")
            e.classList.remove("text-black")
            e.classList.add("text-gray-200")
        })
        document.querySelectorAll(".borderToWhite").forEach(e => {
            e.classList.remove("border-black")
            e.classList.add("border-gray-50")
            if(e.style.borderColor = 'rgba(0,0,0,0.1)'){
                e.style.borderColor = null
                e.classList.add("border-gray-50")
            }
        })
        document.querySelectorAll(".BGtoWhite").forEach(e => {
            e.classList.remove("bg-black")
            e.classList.add("bg-gray-50")
            e.classList.remove("text-white")
            e.classList.add("text-gray-950")
        })
        document.querySelectorAll(".textToWhite").forEach(e => {
            e.classList.add("text-white")
        })
}

export  default DarkModeButton;
