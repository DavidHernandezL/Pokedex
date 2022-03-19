const pokeImg = document.querySelector('.img');
const search = document.querySelector('#btn');
const name = document.querySelector('#pokemonName');
const namePokemon = document.querySelector('.namePokemon');
const typePokemon = document.querySelector('.type');
const statsPokemon = document.querySelector('.stats');
const movePokemon = document.querySelector('.movimientos');
const bgCard = document.querySelector('.pokemonImg');
const cont = document.querySelector('.container');
const card = document.querySelector('.card');
const info = document.querySelector('.pokemonInfo');
const f = document.querySelectorAll('.notFound');


const bgType = {
    steel: "(168,168,192)",
    water: "(56,153,248)",
    bug: "(168,184,32)",
    dragon: "(160,80,56)",
    electric: "(248,208,48)",
    ghost: "(96,96,176)",
    fire: "(240,80,48)",
    fairy: "(231,159,231)",
    ice:"(88,200,224)",
    fighting:"(160,80,56)",
    normal:"(168,160,144)",
    grass:"(120,200,80)",
    psychic:"(248,112,160)",
    rock:"(184,160,88)",
    dark:"(122,88,72)",
    ground:"(234,214,164)",
    poison:"(176,88,160)",
    flying:"(152,168,240)"
};



const fetchPokemon = ( nombre = 'pikachu' ) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}` ; 
    const tipos = []; 
    fetch(url).then( res => {

        cleanScreen( statsPokemon );
        cleanScreen( movePokemon );

        if(res.status != "200"){

            card.setAttribute('style', 'display:none');
            info.setAttribute('style', 'display:none');
            f.forEach( fs => {
                fs.classList.add('found');
            })
            
        }else{
            f.forEach( fs => {
                fs.classList.remove('found');
                fs.classList.add('notFound');
            })
            card.setAttribute('style', 'display:block');
            info.setAttribute('style', 'display:block');
            return res.json();
        }
    }).then( data => {

        
        pokeImg.src = data.sprites.front_default;
        namePokemon.textContent = data.name;
        data.types.forEach( tipo => {
            console.log(tipo.type.name);
            tipos.push(tipo.type.name);
        })
        typePokemon.textContent = "";
        tipos.forEach( (tipo, i) => {
            const li = document.createElement('li');
            li.textContent = tipo;
            typePokemon.appendChild(li);
        });

        if(tipos.length > 1) {
            bgCard.setAttribute('style',`background:linear-gradient(rgb${bgType[tipos[0]]},rgb${bgType[tipos[1]]});`)
        }else {
            bgCard.setAttribute('style',`background:rgb${bgType[tipos[0]]}`);
        }
        const stats = {};

        data.stats.forEach( s => {
            
            stats[s.stat.name] = s.base_stat;
        });

        for(let i = 0; i < data.stats.length; i++) {
            const li = document.createElement('li');
            li.textContent = `${data.stats[i].stat.name}:${stats[data.stats[i].stat.name]}`;
            statsPokemon.appendChild(li);
        }
        
        data.moves.forEach( moves => {
            const li = document.createElement('li');
            li.textContent = moves.move.name;
            li.classList.add('card-move');
            li.classList.add('li-card');

            if(tipos.length > 1) {
                li.setAttribute('style',`background:linear-gradient(rgb${bgType[tipos[0]]},rgb${bgType[tipos[1]]});`)
            }else {
                li.setAttribute('style',`background:rgb${bgType[tipos[0]]}`);
            }
            movePokemon.appendChild(li);
        })
    });
}

search.addEventListener( 'click' ,( ) => {
    const pokeName = name.value.toString().toLowerCase();
    if(!pokeName){
        fetchPokemon();

    }else {
        fetchPokemon(pokeName);
    }
})


const cleanScreen = ( p ) => {
    while(p.firstChild){
        p.removeChild(p.firstChild);
    }
}
