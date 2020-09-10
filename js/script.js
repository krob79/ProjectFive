const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
let users = [];

const filterMessage = document.createElement('DIV');
filterMessage.id = "filterMessage";
filterMessage.innerHTML = "<h3>No names found from your search.</h3>";
gallery.appendChild(filterMessage);
filterMessage.style.display = "none";

const searchBar = document.createElement('INPUT');
searchBar.placeholder = "Search For User";
searchBar.className = "search-input";
const searchButton = document.createElement('BUTTON');
searchButton.className = "search-submit";
searchButton.textContent = "Submit";
searchButton.addEventListener('click', filterUsers);
searchContainer.appendChild(searchBar);
searchContainer.appendChild(searchButton);

searchBar.addEventListener('input', filterUsers);

function filterUsers(){
    console.log("filter");
    filterMessage.style.display = "none";
    let i=0;
    let word = searchBar.value;
    let displayCount = 0;
    users.forEach(user => {
        let wholeName = user.name.first + " " +user.name.last;
        let card = document.getElementById("card-"+i);
        if(wholeName.toLowerCase().includes(word.toLowerCase())){
            console.log(`${wholeName} includes '${word}'? ${wholeName.includes(word)}`);
            card.style.display = "flex";
            displayCount++;
        }else{
            card.style.display = "none";
        }
        i++;
    });
    if(displayCount < 1){
        filterMessage.style.display = "flex";
    }
}

createModal();
const modal = document.querySelector('modal-info-contaioner');
let currentModal = 0;

function fetchData(url){
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log('Looks like there was a problem: ' + error))
}


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response);
  }else{
    return Promise.reject(new Error(response.statusText));
  }
}

fetchData('https://randomuser.me/api/?results=12')
    .then((data) => {
        users = data.results;
        displayUsers(users);
    })


function displayUsers(users){
    let id = 0;
    users.forEach(user => {
        let img = user.picture.large;
        let n = `${user.name.first} ${user.name.last}`;
        let e = user.email;
        let l = `${user.location.city}, ${user.location.state}`;
        let c = user.location.city;
        let p = user.phone;
        let a = `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`;
        let b = user.dob;
        createCard(id,img,n,e,l);
        id++;
    })
}

function createCard(id, img, name, email, location){
    let self = this;
    let card = document.createElement('DIV');
    card.className = "card";
    card.id = `card-${id}`;
    
    let cardImgContainer = document.createElement('DIV');
    cardImgContainer.className = "card-img-container";
    let cardImg = document.createElement('IMG');
    cardImg.className = "card-img";
    cardImg.src = img;
    cardImg.alt = "profile picture";
    
    let cardInfoContainer = document.createElement('DIV');
    cardInfoContainer.className = "card-info-container";
    let nameHolder = document.createElement('H3');
    nameHolder.id = "name";
    nameHolder.className = "card-name cap";
    nameHolder.textContent = name;
    let emailHolder = document.createElement('P');
    emailHolder.className = "card-text";
    emailHolder.textContent = email;
    let locationHolder = document.createElement('P');
    locationHolder.className = "card-text cap";
    locationHolder.textContent = location;
    
    cardInfoContainer.appendChild(nameHolder);
    cardInfoContainer.appendChild(emailHolder);
    cardInfoContainer.appendChild(locationHolder);
    
    cardImgContainer.appendChild(cardImg);
    
    card.appendChild(cardImgContainer);
    card.appendChild(cardInfoContainer);
    
    card.addEventListener('click', ()=> displayModal(id));
    
    gallery.appendChild(card);
    
}

//Create HTML structure for modal that will be reused to diosplay different users' information
function createModal(){
    let modalContainer = document.createElement('DIV');
    modalContainer.className = "modal-container";
    
    let button = document.createElement('BUTTON');
    button.className = "modal-close-btn";
    button.id = "modal-close-btn";
    button.innerHTML = "<strong>X</strong>";
    button.addEventListener('click', () => modalContainer.style.display = "none");
    
    let modal = document.createElement('DIV');
    modal.className = "modal";
    
    let modalInfoContainer = document.createElement('DIV');
    modalInfoContainer.className = "modal-info-container";
    
    let modalImg = document.createElement('IMG');
    modalImg.id = "modal-img";
    modalImg.className = "modal-img";
    modalImg.alt = "profile picture";
    
    let nameHolder = document.createElement('H3');
    nameHolder.id = "name";
    nameHolder.className = "modal-name cap";
    
    let emailHolder = document.createElement('P');
    emailHolder.id = "modal-email";
    emailHolder.className = "modal-text";
    
    let cityHolder = document.createElement('P');
    cityHolder.id = "modal-city";
    cityHolder.className = "modal-text cap";
    
    let hBreak = document.createElement('HR');
    
    let phoneHolder = document.createElement('P');
    phoneHolder.id = "modal-phone";
    phoneHolder.className = "modal-text";
    
    let addressHolder = document.createElement('P');
    addressHolder.id = "modal-address";
    addressHolder.className = "modal-text";
    
    let bdayHolder = document.createElement('P');
    bdayHolder.id = "modal-bday";
    bdayHolder.className = "modal-text";
    
    let buttonContainer = document.createElement('DIV');
    buttonContainer.className = "modal-btn-container";
    
    let prevBtn = document.createElement('BUTTON');
    prevBtn.id = "modal-prev";
    prevBtn.className = "modal-prev-btn";
    prevBtn.textContent = "Prev";
    prevBtn.addEventListener('click', ()=> {
        if(currentModal > 0){
            currentModal--;
        }else{
            currentModal = users.length-1
        }
        displayModal(currentModal);
    });
    
    let nextBtn = document.createElement('BUTTON');
    nextBtn.id = "modal-next";
    nextBtn.className = "modal-next-btn"; 
    nextBtn.textContent = "Next";
    nextBtn.addEventListener('click', ()=> {
        if(currentModal < users.length-1){
            currentModal++;
        }else{
            currentModal = 0;
        }
        displayModal(currentModal);
    });
    
    buttonContainer.appendChild(prevBtn);
    buttonContainer.appendChild(nextBtn);
    
    modalInfoContainer.appendChild(modalImg);
    modalInfoContainer.appendChild(nameHolder);
    modalInfoContainer.appendChild(emailHolder);
    modalInfoContainer.appendChild(cityHolder);
    modalInfoContainer.appendChild(hBreak);
    modalInfoContainer.appendChild(phoneHolder);
    modalInfoContainer.appendChild(addressHolder);
    modalInfoContainer.appendChild(bdayHolder);
    
    modal.appendChild(button);
    modal.appendChild(modalInfoContainer);
    modalContainer.appendChild(modal);
    modalContainer.appendChild(buttonContainer);
    gallery.appendChild(modalContainer);
    
    modalContainer.style.display = "none";
    
}

function displayModal(index){
    currentModal = index;
    let img = users[index].picture.large;
    let n = `${users[index].name.first} ${users[index].name.last}`;
    let e = users[index].email;
    let l = `${users[index].location.city}, ${users[index].location.state}`;
    let c = users[index].location.city;
    let p = `Phone: ${users[index].phone}`;
    let a = `${users[index].location.street.number} ${users[index].location.street.name} ${users[index].location.city}, ${users[index].location.country}`;
    
    //get that first bit of text from the ISO date string!
    let bSplit = users[index].dob.date.split("T")[0].split("-");
    //rearrange the bits to display month, date, year
    let b = `Birthday: ${bSplit[1]}/${bSplit[2]}/${bSplit[0]}`;
    
    let modal = document.querySelector('.modal-container');
    
    let modalImg = document.querySelector('#modal-img');
    modalImg.src = img;
    
    let nameHolder = document.querySelector('.modal-name');
    nameHolder.textContent = n;
    
    let emailHolder = document.querySelector('#modal-email');
    emailHolder.textContent = e;
    
    let cityHolder = document.querySelector('#modal-city');
    cityHolder.textContent = c;
    
    let phoneHolder = document.querySelector('#modal-phone');
    phoneHolder.textContent = p;
    
    let addressHolder = document.querySelector('#modal-address');
    addressHolder.textContent = a;
    
    let bdayHolder = document.querySelector('#modal-bday');
    bdayHolder.textContent = b;
    
    modal.style.display = "block";
    
}

/*
<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>

    // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>
*/

/*
<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>
</div>
*/
