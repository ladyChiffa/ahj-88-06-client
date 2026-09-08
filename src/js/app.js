const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
const nameInput = subscribeWidget.querySelector('.name');
const phoneInput = subscribeWidget.querySelector('.phone');

subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const body = Array.from(subscribeForm.elements)
                      .filter( ({name}) => name )
                      .map( ({name, value}) => `${name}=${encodeURIComponent(value)}` )
                      .join('&');

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);
            
        if (xhr.readyState !== 4) return; // еще не получили ответ на запрос
        console.log(xhr.responseText);
    }
    xhr.open('POST', 'http://localhost:8080');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
});
