const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
const nameInput = subscribeWidget.querySelector('.name');
const phoneInput = subscribeWidget.querySelector('.phone');

subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);
            
        if (xhr.readyState !== 4) return; // еще не получили ответ на запрос
        console.log(xhr.responseText);
    }
    xhr.open('GET', 'http://localhost:8080');
    xhr.send();
});
