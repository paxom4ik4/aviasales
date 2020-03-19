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

const citiesApi = 'data/cities.json',
API_KEY = '52edab08f812dae6bf199045ebfa9d99',
PROXY = 'https://cors-anywhere.herokuapp.com/',
CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload'

let cities = [];

const getData = (url, callback) => {
	const request = new XMLHttpRequest();
	request.open('GET', url)
	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) return

		if (request.status === 200) {
			callback(request.response)
		} else {
			console.log(request.status);
		}
	})
	request.send()
}

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

const selectCity = (event, input, list) => {
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent ='';
    }
};

inputCitiesFrom.addEventListener('input', () =>{
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesFrom.addEventListener('click', ()=> {
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom)
});

inputCitiesTo.addEventListener('input', () =>{
    showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', () =>{
    selectCity(event, inputCitiesTo, dropdownCitiesTo)
});


getData(citiesApi, data => {
    cities = JSON.parse(data).filter(item => item.name); 

})

getData(
	CALENDAR + '?origin=SVX&destination=KGD&depart_date=2020-05-25&one_way=false',
	data => {
		console.log(JSON.parse(data).current_depart_date_prices);
})
