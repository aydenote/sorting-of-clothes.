// Fetch the items from the JSON file, Json 파일로 부터 items를 동적으로 받아오는 함수
function loadItems(){    
    return fetch('/cloth.json') // Promise 로 반환.
    .then(response=> response.json())// 받아온 data를 json으로 변환
    .then(json => json.items) // 변환한 json에서 items라는 항목만 return.
    .catch(error => alert(error)) // error 핸들링
}

function displayItems(items){ // json에서 받아온 Items data 를 받음.
    // items 클래스 하위 요소 전부다 반환. 반환 형식은 html에 아닌, javascript 형식.
    const container = document.querySelector('.items'); // items 클래스 하위 요소 전부다 반환.
    // innerhtml를 사용하면, html에 태그까지 포함하여 그대로 전달.(하나의 html content를 그냥 만든다고 보면됨.)
    // items.map은 json에 있는 item들(배열 요소)을/를 하나하나 html 배열로 만들어줌(json 배열 -> html 배열로 mapping)
    // items.map에서 각각의 item을 map을 통해서 배열로 만듬.
    // 이제 각각에 item들이 배열로 만들어져서 item들 사이에는 , 로 구분되어 들거나는데 html 문서에는 각 item 별로 , 로 구분되지 않음.
    // 따라서, , 를 제거하기 위해 join을 사용해서 현재 cloth.html 에 있는 것과 동일하게 만듬.(cloth.html item 부분은 필요 없음.)
    // 전달된 items는 json에서 보면 알다시피 배열임. 따라서 join, map 사용 가능.
    // join을 써서 각 item별 구분을 제거, join 안 쓰면 item 별 ,로 구분(하나의 문자열로 통합)
    // 결론적으로 여기 display 함수는 cloth.html에 items 클래스를 가져온 다음 json 데이터를 html 형식으로 바꿔서 items 클래스에 html 형식으로 넣어버림.    
    container.innerHTML = items.map(item=>createHTMLString(item)).join('');
}


function createHTMLString(item){// 해당 item 하나하나 json에 있는 key값으로 value를 집어넣음
    return `
    <li class="item">
    <img src=${item.image} alt=${item.type} class="item_thumbnail"/>
    <span class="item_description">${item.gender}, ${item.size}</span>
  </li>
  `
}
function onButtonClick(event, items){
    // html img, button 태그에 data-key, data-value를 설정.(custom property)
    // 이때 json에 있는 key, value에 맞게 설정.
    // click이 된 target 안에 내가 정의한 dataset.key
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null){
        return; // key랑 value 둘 중 하나라도 null 이면 그냥 아무 것도 안 함.
    }
    // key는 color 와 type , value는 pink, tshirt, skirt 등이 있다.
    // item 이라는 object에 key에 해당 하는 값이 value와 똑같은 data들만 반환 시킨다.
    // 각각의 item들이 있는데 우리가 클릭한 item에 key가 우리가 클릭한 value와 동일한 것만 반환.
    const filtered = items.filter(item => item[key]===value);
    console.log(filtered);
    displayItems(filtered);
}

function setEventListeners(items){
const logo = document.querySelector('.logo');
const buttons = document.querySelector('.buttons');
logo.addEventListener('click', () => displayItems(items));
buttons.addEventListener('click', event => onButtonClick(event, items));
}

// 함수 호출 
loadItems() /* data.json에서 items data들을 불러와서 전달해주는 역할*/
.then(items => {
    displayItems(items); /* items를 받아 인자로 전달 */
    setEventListeners(items); /* button 클릭시 items 필터링 */
})
.catch(console.log)

