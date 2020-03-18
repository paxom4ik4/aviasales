const formSearch = document.querySelector(".form-search")
const inputCitiesFrom = document.querySelector(".input__cities-from")
const dropdownCitiesFrom = document.querySelector(".dropdown__cities-from")
const inputCitiesTo = document.querySelector(".input__cities-to")
const dropdownCitiesTo = document.querySelector(".dropdown__cities-to")
const inputDateDepart = document.querySelector(".input__date-depart")
const buttonSearch = document.querySelector(".button__search");

let city = ['Москва', 'Санкт-Петербург','Минск', 'Караганда', 'Челябинск', 'Керч', 
            'Волгоград', 'Самара','Днепропетровск', 'Екатеринбург', 'Одесса',
            'Ухань','Шымкен','Нижний Новгород','Калининград','Вроцлав','Ростов-на-дону'];

const showCity = (input, list) => {
    list.textContent = "";
    if (input.value !== ''){
    
        const filterCity = city.filter((item) => {
            const fixItem = item.toLowerCase();

            return fixItem.includes(input.value.toLowerCase());
        });

        filterCity.forEach((item) =>{
            const li = document.createElement('li');
            li.classList.add("dropdown__city");
            li.textContent = item;
            list.append(li);
        });

    }
}

inputCitiesFrom.addEventListener('input', () =>{
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesFrom.addEventListener('click', (event) => {
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        inputCitiesFrom.value = target.textContent;
        dropdownCitiesFrom.textContent ='';
    }
})

inputCitiesTo.addEventListener('input', () =>{
    showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', (event) =>{
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        inputCitiesTo.value = target.textContent;
        dropdownCitiesTo.textContent ='';
    }
})


