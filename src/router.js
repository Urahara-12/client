'use strict';

import Navbar from './components/Navbar.js'
import Bottombar from './components/Bottombar.js'
import Loading from './components/Loading.js'

import Home from './pages/Home.js'
import Error404 from './pages/Error404.js'
import Register from './pages/Register.js'
import Login from './pages/Login.js'


const routes = {
    '/' : Home
    , '/register' : Register
    , '/login' : Login
};

let parseRequestURL = () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split('/')
    let request = {
        resource    : null,
        id          : null,
        verb        : null
    }
    request.resource    = r[1]
    request.id          = r[2]
    request.verb        = r[3]

    return request
};

const router = async () => {
    const header = null || document.getElementById('header_container');
    const footer = null || document.getElementById('footer_container');
    const content = null || document.getElementById('main_container');

    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();
    let request = parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await Loading.render();
    await Loading.after_render();
    content.innerHTML = await page.render();
    await page.after_render();

}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
