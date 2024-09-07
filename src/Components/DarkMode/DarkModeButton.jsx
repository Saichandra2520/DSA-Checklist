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
        document.body.style.backgroundColor = "black"
        document.querySelectorAll(".BGtoBlack").forEach(e => {
            e.classList.remove("bg-white")
            e.classList.add("bg-black")
            e.classList.remove("text-black")
            e.classList.add("text-white")
        })
        document.querySelectorAll(".borderToWhite").forEach(e => {
            e.classList.remove("border-black")
            e.classList.add("border-white")
            if(e.style.borderColor = 'rgba(0,0,0,0.1)'){
                e.style.borderColor = "white"
            }
        })
        document.querySelectorAll(".BGtoWhite").forEach(e => {
            e.classList.remove("bg-black")
            e.classList.add("bg-white")
            e.classList.remove("text-white")
            e.classList.add("text-black")
        })
        document.querySelectorAll(".textToWhite").forEach(e => {
            e.classList.remove("text-gray-900")
            e.classList.add("text-white")
        })
    }
    else{
        document.body.style.backgroundColor = "white"
        document.querySelectorAll(".BGtoBlack").forEach(e => {
            e.classList.remove("bg-black")
            e.classList.add("bg-white")
            e.classList.remove("text-white")
            e.classList.add("text-black")
        })
        document.querySelectorAll(".borderToWhite").forEach(e => {
            e.classList.remove("border-white")
            e.classList.add("border-Black")
            if(e.style.borderColor = 'white'){
                e.style.borderColor = "rgba(0,0,0,0.1)"
            }
        })
        document.querySelectorAll(".BGtoWhite").forEach(e => {
            e.classList.remove("bg-white")
            e.classList.add("bg-black")
            e.classList.remove("text-black")
            e.classList.add("text-white")
        })
        document.querySelectorAll(".textToWhite").forEach(e => {
            e.classList.remove("text-white")
            e.classList.add("text-gray-900")
        })
    }
}
export function KeepDarkMode(){
    console.log("dsds")
    document.body.style.backgroundColor = "black"
        document.querySelectorAll(".BGtoBlack").forEach(e => {
            e.classList.remove("bg-white")
            e.classList.add("bg-black")
            e.classList.remove("text-black")
            e.classList.add("text-white")
        })
        document.querySelectorAll(".borderToWhite").forEach(e => {
            e.classList.remove("border-black")
            e.classList.add("border-white")
            if(e.style.borderColor = 'rgba(0,0,0,0.1)'){
                e.style.borderColor = "white"
            }
        })
        document.querySelectorAll(".BGtoWhite").forEach(e => {
            e.classList.remove("bg-black")
            e.classList.add("bg-white")
            e.classList.remove("text-white")
            e.classList.add("text-black")
        })
        document.querySelectorAll(".textToWhite").forEach(e => {
            e.classList.remove("text-gray-900")
            e.classList.add("text-white")
        })
}

export  default DarkModeButton;
