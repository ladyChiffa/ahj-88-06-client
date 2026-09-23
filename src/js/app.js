/*       ПРОСТОЙ fetch              */
/*
(async () => {
        const request = fetch ('http://localhost:8080/index');
        const result = await request;
        console.log(result);
        const text = await result.text();
        console.log(text);
})();
*/

/*-----------------------------------------------------------------------------------------------*/
/* ПОДПИСКИ, простая версия с XMLHttpRequest */

const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
const nameInput = subscribeWidget.querySelector('.name');
const phoneInput = subscribeWidget.querySelector('.phone');

const unsubscriveBtn = subscribeWidget.querySelector('.unsubscribe-btn');

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


unsubscriveBtn.addEventListener('click', (e) => {
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
    xhr.open('DELETE', 'http://localhost:8080');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
});

const uploadForm = document.querySelector('.upload-form');
const previewImage = document.querySelector('.preview-image');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const body = new FormData(uploadForm);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);
            
        if (xhr.readyState !== 4) return; // еще не получили ответ на запрос
        console.log(xhr.responseText);
        previewImage.src = 'http://localhost:8080' + xhr.responseText;
    }
    xhr.open('POST', 'http://localhost:8080/upload');
    xhr.send(body);
});

/*-----------------------------------------------------------------------------------------------*/
/* ПОДПИСКИ, версия на классах с fetch */

class SubscriptionApi {
    constructor (apiUrl) {
        this.apiUrl = apiUrl;
    }

    async add(user) {
        const request = fetch (this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const result = await request;
        if(!result.ok) {
            console.error('Server Error');
        }

        const json = await result.json();
        
        const status = json.status;
        console.log(status);
    }

    async remove(user) {
        const query = '/?phone=' + user.phone;

        const request = fetch (this.apiUrl + query, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await request;
        if(!result.ok) {
            console.error('Server Error');
        }

        const json = await result.json();
        
        const status = json.status;
        console.log(status);
    }
}

window.api = new SubscriptionApi('http://localhost:8080/');

const eventSource = new EventSource('http://localhost:8080/sse'); // sse - Server-Side Events
eventSource.addEventListener('open', (e) => {
    console.log(e);
    console.log('sse open');
});
eventSource.addEventListener('message', (e) => {
    console.log(e);
    console.log('sse message');
});
eventSource.addEventListener('error', (e) => {
    console.log(e);
    console.log('sse error');
});

