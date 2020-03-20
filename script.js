const formSearch = document.querySelector(".form-search"),
    inputCitiesFrom = formSearch.querySelector(".input__cities-from"),
    dropdownCitiesFrom = formSearch.querySelector(".dropdown__cities-from"),
    inputCitiesTo = formSearch.querySelector(".input__cities-to"),
    dropdownCitiesTo = formSearch.querySelector(".dropdown__cities-to"),
    inputDateDepart = formSearch.querySelector(".input__date-depart"),
    buttonSearch = document.querySelector(".button__search");


const citiesApi = 'data/cities.json',
API_KEY = '52edab08f812dae6bf199045ebfa9d99',
PROXY = 'https://cors-anywhere.herokuapp.com/',
CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';

let dayTime;
    
let city = [];

const getData = (url, callback) => {

    const request = new XMLHttpRequest();
    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200) {
            callback(request.response);
        } else {
            alert(request.status);
        }

    });
    request.send();
};

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
});

const togle = (input, list) => {

    input.value = event.target.innerHTML;
    list.textContent = '';
}

getData(citiesApi, (data) => {
    dayTime = JSON.parse(data);

    dayTime.forEach((item) => {
        if (item.name != null) {
            city.push(item.name,item.name_translations.en);
        }
        
    });

});

const renderCheap = (data, date) => {
    const cheapTicketYear = JSON.parse(data).best_prices;
    const cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    });
    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);
}
const renderCheapDay = (ticket) => {
    console.log(ticket);
}
const renderCheapYear = (tickets) => {
    console.log(tickets);
}


formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    const fromName = dayTime.find((item) => {
        return inputCitiesFrom.value === item.name || inputCitiesFrom.value === item.name_translations.en;
    });
    const toName = dayTime.find((item) => {
        return inputCitiesTo.value === item.name ||inputCitiesTo.value === item.name_translations.en;
    });
    console.log(toName)
    let formData = {
        from: fromName.code,
        to: toName.code,
        when: inputDateDepart.value,
    }
    const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true&token=${API_KEY}`;
    getData(CALENDAR + requestData, (response) => {
        renderCheap(response, formData.when);
    });
});

getData(
	CALENDAR + '?origin=SVX&destination=KGD&depart_date=2020-05-25&one_way=false',
	data => {
		console.log(JSON.parse(data).current_depart_date_prices);
});
