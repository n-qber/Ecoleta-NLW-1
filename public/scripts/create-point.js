function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json(0 ))
    .then( states => {
        for (const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    })
}

function getCities(event){
    const stateInput = document.querySelector("input[name=state]");
    const citySelect = document.querySelector("select[name=city]");

    stateInput.value = event.target.options[event.target.selectedIndex].text;

    const ufValue = event.target.value;
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then( res => res.json())
    .then( cities => {
        
        for (const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;

    })
}

populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


document
    .querySelectorAll("li")
    .forEach(li =>{
        li.addEventListener("click", handleSelectedItem);
    })


let selectedItems = [];
const collectedItems = document.querySelector('input[name=items]');


function handleSelectedItem(event){

    if (event.target.classList.toggle("selected")){
        selectedItems.push(parseInt(event.target.dataset.id));
    }else{

        const indexOf = selectedItems.indexOf(parseInt(event.target.dataset.id));
        selectedItems.splice(indexOf, 1);
    }

    collectedItems.value = selectedItems;

}