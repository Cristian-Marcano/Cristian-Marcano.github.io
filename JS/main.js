"use strict";

const content = document.querySelectorAll('main > section');
const navMobile = document.querySelectorAll('.mobile > a');
const navDesktop = document.querySelectorAll('.desktop ul li');
const buttonMenu = document.querySelector('.mobile__menu > button');
const menuMobile = document.querySelector('.menu');
const themeButton = document.querySelectorAll('ul li a[title*="Theme"]');
const themeDOM = document.querySelector(':root');
const translateButton = document.querySelectorAll('ul li a[title*="Translate"]');

const themeDark = {
    firstColorBg: '#090c1a',
    navColorMobile: '#e5e7eb',
    colorCoding: '#dbdbdb5a',
    h1SpanColorBgGradient: '#283247',
    h2ColorHome2: '#eaeaea',
    pColorHome: '#e0e0e0',
    aColorBgResume1: '#b8b8b852',
    aColorBgResume2: '#0000',
    aColorBgResumeGradient: 'linear-gradient(82.3deg, #545164 2%, #524cb3 115%)',
    h2Brightness: 'brightness(1.28)',
    h3Brightness: 'brightness(1.125)',
    pColorProjects: '#f0f0f0',
    fillColorLinks: '#e0e0e0',
    colorBgSkills: '#28324727',
    colorBorderSkills: '#1f273a',
    strongBrightness: 'brightness(1.24)',
    colorBgGradientFooter: '#0000',
};

const themeLight = {
    firstColorBg: '#d5d5e2',
    navColorMobile: '#4b5563',
    colorCoding: '#afafaf',
    h1SpanColorBgGradient: '#504c88',
    h2ColorHome2: '#dadada',
    pColorHome: '#525252',
    aColorBgResume1: '#989898',
    aColorBgResume2: '#504c886f',
    aColorBgResumeGradient: 'linear-gradient(82.3deg, #827ba7 2%, #716ada 115%)',
    h2Brightness: 'brightness(0.88)',
    h3Brightness: 'brightness(0.88)',
    pColorProjects: '#5f5f5f',
    fillColorLinks: '#4a4a4a',
    colorBgSkills: '#2b333d',
    colorBorderSkills: '#6960b9',
    strongBrightness: 'brightness(0.88)',
    colorBgGradientFooter: '#2b2948',
}

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

const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

const getThemePreference = () => {
    if (typeof localStorage !== "undefined") 
        return localStorage.getItem("theme") ?? "dark";

    return (window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark": "light";
}

const getLanguagePreference = () => {
    if (typeof localStorage !== "undefined")
        return localStorage.getItem("language") ?? 'es';

    return 'es';
}

const updateTheme = (theme) => {
    if(theme === 'light') {
        themeButton.forEach( i => {
            i.firstElementChild.classList.remove('selected');
            i.lastElementChild.classList.add('selected');
        });

        updatePropertyTheme(themeLight, theme);
    } else {
        themeButton.forEach( i => {
            i.firstElementChild.classList.add('selected');
            i.lastElementChild.classList.remove('selected');
        });

        updatePropertyTheme(themeDark, theme);
    }
}

const updatePropertyTheme = (themeSelected, theme) => {
    themeDOM.style.setProperty('--firstColorBg', themeSelected.firstColorBg);
    themeDOM.style.setProperty('--colorCoding', themeSelected.colorCoding);
    themeDOM.style.setProperty('--navColorMobile', themeSelected.navColorMobile);
    themeDOM.style.setProperty('--h1SpanColorBgGradient', themeSelected.h1SpanColorBgGradient);
    themeDOM.style.setProperty('--h2ColorHome2', themeSelected.h2ColorHome2);
    themeDOM.style.setProperty('--pColorHome', themeSelected.pColorHome);
    themeDOM.style.setProperty('--aColorBgResume1', themeSelected.aColorBgResume1);
    themeDOM.style.setProperty('--aColorBgResume2', themeSelected.aColorBgResume2);
    themeDOM.style.setProperty('--aColorBgResumeGradient', themeSelected.aColorBgResumeGradient);
    themeDOM.style.setProperty('--h2Brightness', themeSelected.h2Brightness);
    themeDOM.style.setProperty('--h3Brightness', themeSelected.h3Brightness);
    themeDOM.style.setProperty('--pColorProjects', themeSelected.pColorProjects);
    themeDOM.style.setProperty('--fillColorLinks', themeSelected.fillColorLinks);
    themeDOM.style.setProperty('--colorBgSkills', themeSelected.colorBgSkills);
    themeDOM.style.setProperty('--colorBorderSkills', themeSelected.colorBorderSkills);
    themeDOM.style.setProperty('--strongBrightness', themeSelected.strongBrightness);
    themeDOM.style.setProperty('--colorBgGradientFooter', themeSelected.colorBgGradientFooter);
    themeDOM.style.setProperty('--themeScroll', theme);
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

let theme = getThemePreference();
updateTheme(theme);

buttonMenu.addEventListener('click',toggleMenu);
document.addEventListener('click', hideMenu);

themeButton.forEach(i => i.addEventListener('click', (e) => {
    theme = (theme==='light') ? 'dark': 'light';
    localStorage.setItem('theme', theme);
    updateTheme(theme);
}));

let language = getLanguagePreference();
document.documentElement.setAttribute('lang', language);

translateButton.forEach(i => i.addEventListener('click', (e) => {
    language = (language === 'en') ? 'es' : 'en';
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
}));