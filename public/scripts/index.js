function displayModal(){
    document.querySelector("#modal").classList.toggle("hide");
}


document.querySelectorAll("main a, #modal a").forEach(el => {
    el.addEventListener("click", displayModal)
})
/*
document.querySelector("main a")
    .addEventListener("click", displayModal)*/