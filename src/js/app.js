import Popover from "./popover";

const form = document.querySelector('.form-widget');
const button = form.querySelector('button');

const popover = new Popover();

button.addEventListener('click', (e) => {
    e.preventDefault();

    popover.togglePopover('Popover title', 'And here\'s some amasing content. It\'s very engaging. Right?', e.target);
});