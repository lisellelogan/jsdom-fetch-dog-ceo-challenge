console.log('%c HI', 'color: firebrick')

let breed = [];

document.addEventListener('DOMContentLoaded',function() {
    loadImages();
    loadBreeds();
})

function loadImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
    .then(resp => resp.json()) 
    .then(results => { 
        results.message.forEach(image => addImage(image))
    });
}

function addImage(dogImageUrl) {
    let imgContainer = document.getElementById('dog-image-container');
    let newImageElement = document.createElement('img');
    newImageElement.src = dogImageUrl;
    imgContainer.appendChild(newImageElement);
}

function loadBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(results => {
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
    });
}

function updateBreedList(breeds){
    let dogBreedList = document.getElementById('dog-breeds');
    removeChildren(dogBreedList);
    breeds.forEach(breed => addBreed(breed))
}

function removeChildren(element){
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter){
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener(){
    let breedDropDown = document.getElementById('breed-dropdown');
    breedDropDown.addEventListener('change', function(e) {
        selectBreedsStartingWith(e.target.value);
    });
}

function addBreed(breed){
    let dogBreedList = document.getElementById('dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    dogBreedList.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(e){
    e.target.style.color = 'red';
}