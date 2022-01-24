function loadItems(){    
    return fetch('/cloth.json') 
    .then(response=> response.json())
    .then(json => json.items) 
    .catch(error => alert(error))
}

function displayItems(items){ 
    const container = document.querySelector('.items'); 
    container.innerHTML = items.map(item=>createHTMLString(item)).join('');
}


function createHTMLString(item){
    return `
    <li class="item">
    <img src=${item.image} alt=${item.type} class="item_thumbnail"/>
    <span class="item_description">${item.gender}, ${item.size}</span>
  </li>
  `
}
function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null){
        return; 
    }

    const filtered = items.filter(item => item[key]===value);
    displayItems(filtered);
}

function setEventListeners(items){
const logo = document.querySelector('.logo');
const buttons = document.querySelector('.buttons');
logo.addEventListener('click', () => displayItems(items));
buttons.addEventListener('click', event => onButtonClick(event, items));
}

// 함수 호출 
loadItems() 
.then(items => {
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log)

