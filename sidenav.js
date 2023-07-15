import definedTheme from '/main.js';

const sidenavElemnt = document.getElementById('sidenav');
const btnopenNav = document.getElementsByClassName('openNav')[0];
var cardPile = document.getElementsByClassName('pile');
const crossSubMenu = document.querySelectorAll(".cross-submenu");

console.log(sidenavElemnt,btnopenNav,cardPile)
export function openNav() {
    const sidenavElemnt = document.getElementById('sidenav');
    sidenavElemnt.style.width = "calc(100vw/1.5)";
    const btnopenNav = document.getElementsByClassName('openNav')[0];
    btnopenNav.style.visibility = 'hidden'
}

export function closeNav() {
    const sidenavElemnt = document.getElementById('sidenav');
    sidenavElemnt.style.width = '0%'
    const btnopenNav = document.getElementsByClassName('openNav')[0];
    btnopenNav.style.visibility = 'visible'
}

export function openSubmenu(numero, event) {
    document.querySelector(`.lien${numero}`).classList.toggle('submenuOpen')
    document.querySelector(`.cross-submenu-${numero}`).classList.toggle('rotateCrossMenu')
}

export function changeTheme(value) {
    localStorage.setItem('theme', `${value}`)
    definedTheme(value)
}

export function changeColorCard(variableCSS) {
    var cardPile = document.getElementsByClassName('pile');
    Array.from(cardPile).forEach((item) => {
        item.style.backgroundColor = `var(--${variableCSS})`
    })
    localStorage.setItem('color-card', variableCSS)
}

export function nombreJoueur(valueNbJoueur){
    localStorage.setItem('nbrJoueur', valueNbJoueur)
    if(valueNbJoueur == 2){
        document.querySelector('.joueur2').classList.toggle('activePlayer')
    }else if(valueNbJoueur == 1){
        document.querySelector('.joueur2').classList.toggle('activePlayer')
    }
}