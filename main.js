"use strict";

const content = document.querySelectorAll('main > section');
const navMobile = document.querySelectorAll('.mobile > a');
const navDesktop = document.querySelectorAll('.desktop ul li');
const buttonMenu = document.querySelector('.mobile__menu > button');
const menuMobile = document.querySelector('.menu');
const themeDOM = document.querySelector(':root');
const translateButton = document.querySelectorAll('ul li a[title*="Translate"]');

window.onscroll = () => {
    content.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 400;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
    
        if(top >= offset && top < offset + height) {
            navDesktop.forEach(links => links.classList.remove('active'));
            navMobile.forEach(links => links.classList.remove('active'));

            document.querySelector('.desktop ul li a[href*='+ id +']').parentElement.classList.add('active');
            document.querySelector('.mobile > a[href*='+ id +']').classList.add('active');
        }
    });
}

const getLanguagePreference = () => {
    if (typeof localStorage !== "undefined")
        return localStorage.getItem("language") ?? 'es';

    return 'es';
}

const toggleMenu = (e) => {
    e.stopPropagation();
    buttonMenu.firstElementChild.classList.toggle('selected');
    buttonMenu.lastElementChild.classList.toggle('selected');
    menuMobile.classList.toggle('hidden');
}

const hideMenu = (e) => {
    buttonMenu.firstElementChild.classList.add('selected');
    buttonMenu.lastElementChild.classList.remove('selected');
    menuMobile.classList.add('hidden');
}

buttonMenu.addEventListener('click',toggleMenu);
document.addEventListener('click', hideMenu);

let language = getLanguagePreference();
document.documentElement.setAttribute('lang', language);

translateButton.forEach(i => i.addEventListener('click', (e) => {
    language = (language === 'en') ? 'es' : 'en';
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
}));