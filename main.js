import './style.css';
import javascriptLogo from '/javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import Disney from '/public/mock/mock-card-disney.js';
import HarryPotter from '/public/mock/mock-card-harryPotter.js';
import Pokemon from '/public/mock/mock-card-pokemon.js';
import Strangerthings from '/public/mock/mock-card-strangerthings.js';
import { changeColorCard, openNav, closeNav, openSubmenu, changeTheme, nombreJoueur } from './sidenav.js';

window.openNav = openNav;
window.closeNav = closeNav;
window.openSubmenu = openSubmenu;
window.changeTheme = changeTheme;
window.changeColorCard = changeColorCard;
window.nombreJoueur = nombreJoueur;

// par defaut un seul joueur donc forcement en cours
// même à deux joueurs on commence par le 1
var nbrJoueurEnCours = localStorage.getItem('nbrJoueur');
var idJoueurEnCours = 1;
var joueur1 = document.querySelector('.joueur1');
var joueur2 = document.querySelector('.joueur2');

// titre + logo vitejs
document.querySelector('#app').innerHTML = `
  <div class="center">
    <h1><a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>MEMORY</h1>
  </div>
`;


const table = document.querySelector('#table');
let arrayHTML = [];
definedTheme()

export default function definedTheme(theme = 'Disney') {
    if (localStorage.getItem('theme') != null) {
        arrayHTML = []
        if (localStorage.getItem('theme') == 'Disney') {
            creatArticle(Disney)
        } else if (localStorage.getItem('theme') == 'Pokemon') {
            creatArticle(Pokemon)
        } else if (localStorage.getItem('theme') == 'StrangerThings') {
            creatArticle(Strangerthings)
        } else if (localStorage.getItem('theme') == 'HarryPotter') {
            creatArticle(HarryPotter)
        } else {
            creatArticle(Disney)
        }
    } else {
        arrayHTML = [];
        creatArticle(Disney)
    }

}

function creatArticle(ArrayTheme) {
    ArrayTheme.forEach((item) => {
        arrayHTML.push(`<article class="card" data-number="${item.id}">
<div class="card_inner">
  <div class="card_side pile"></div>
  <div class="card_side face">
  <img src="${item.url}" alt="${item.url}"/></div>
</div>
</article>`)
    });
    ArrayTheme.forEach((item) => {
        arrayHTML.push(`<article class="card" data-number="${item.id}">
<div class="card_inner">
  <div class="card_side pile"></div>
  <div class="card_side face">
  <img src="${item.url}" alt="${item.url}"/></div>
</div>
</article>`);
// shuffle array
arrayHTML.sort(function() { return 0.5 - Math.random() });
// template array
 table.innerHTML = arrayHTML.join('');
 joueur1.classList.add('colorJoueurEnCour')
});


    /**
     * gestion card retournement et different cas 
     */
    const getAllCards = document.querySelectorAll('.card');

    var count = 0;
    var firstClick;
    var secondClick;
    var arrayPlay = [];

    getAllCards.forEach((item) => {
        item.addEventListener('click', (event) => {
            count++;
            if (count == 1) {
                item.classList.add('return');
                firstClick = item.getAttribute('data-number');
                arrayPlay.push(firstClick);
            } else if (count == 2) {
                item.classList.add('return');
                secondClick = item.getAttribute('data-number');
                if (firstClick == secondClick) {
                    arrayPlay.push(secondClick);
                    count = 0;
                    switch(idJoueurEnCours){
                      case 1:
                        joueur1.innerHTML += '<div class="point"></div>'
                        break;
                      case 2:
                        joueur2.innerHTML += '<div class="point"></div>'
                        break;
                      default:
                    }
                } else {
                    arrayPlay.pop();
                    setTimeout(() => {
                        getAllCards.forEach((item) => {
                            if (arrayPlay.indexOf(item.getAttribute('data-number')) == -1) {
                                item.classList.remove('return');
                            }
                        });
                        count = 0;
                        // on passe à l'autre joueur
                        if(+nbrJoueurEnCours === 2){
                          idJoueurEnCours = (idJoueurEnCours == 1) ? 2 : 1
                        }
                        switch(idJoueurEnCours){
                          case 1:
                            joueur1.classList.toggle('colorJoueurEnCour')
                            joueur2.classList.toggle('colorJoueurEnCour')
                            break;
                          case 2:
                            joueur1.classList.toggle('colorJoueurEnCour')
                            joueur2.classList.toggle('colorJoueurEnCour')
                            break;
                          default:
                        }
                      }, 1500);
                }
            }
            if(arrayPlay.length/2 == ArrayTheme.length){
              const result = confirm('Veux-tu rejouer ?')
              if(result){
                reloadMemory()
              }
              
            }
        });
    });
}


/**
 * recupere la couleur des cards enregistré
 */
if (localStorage.getItem('color-card') != null) {
    changeColorCard(localStorage.getItem('color-card'));
}

window.reloadMemory = ()=>{
  var divPiont = document.querySelectorAll('div.point');
  divPiont.forEach((item)=>{
    item.remove();
  })
  definedTheme()
}