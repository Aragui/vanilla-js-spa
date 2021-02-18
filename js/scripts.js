var counter = 1; //Next route counter
const app = document.querySelector('#app'); // Div father reference
const sections = document.querySelectorAll('.nav-link'); // Navbar buttons reference

const routes = [
    {
        section: 'inicio.html',
        path: 'index',
        title: 'Inicio'
    },
    {
        section: 'productos.html',
        path: 'productos',
        title: 'Productos'
    },
    {
        section: 'mision.html',
        path: 'mision',
        title: 'Misión'
    },
]


const removeActive = () => document.querySelector('.active').classList.remove('active');

const addActive = id => document.querySelector(`#${id}`).classList.add('active');

const getRoute = route => routes.find(x => x.path == route);

async function loadSection(page) {
    const result = await fetch(`/vanilla-js-spa/sections/${page}`);
    const text = await result.text();
    const parser = new DOMParser();
    const loadedSection = parser.parseFromString(text, 'text/html');
    return loadedSection.querySelector('div');
}

async function render(page) {
    const section = await loadSection(page.section);
    const path = page.path === 'index' ? '/vanilla-js-spa' : `/vanilla-js-spa/${page.path}`;
    history.replaceState({}, '', path);
    document.title = page.title;
    if (app.firstChild) {
        app.replaceChild(section, app.firstChild);
    } else {
        app.appendChild(section);
    }
}


//Charge the first page when window is ready
window.addEventListener('load', () => render(routes[0]));

sections.forEach(section => {
    section.addEventListener('click', e => {
        e.preventDefault();
        const id = e.target.id;
        const route = getRoute(id);
        removeActive();
        addActive(id);
        render(route)
    })
})

setInterval(() => {
    const route = routes[counter];
    const path = routes[counter].path
    removeActive();
    addActive(path);
    render(route);
    counter < 2 ? counter++ : counter = 0;
}, 3000);

