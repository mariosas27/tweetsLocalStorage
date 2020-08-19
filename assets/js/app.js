// variables
const listaTweets = document.getElementById('lista-tweets'); 


// Event listeners
eventListeners(); 

function eventListeners(){
    // cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet); 

    // contenido cargado 
    document.addEventListener('DOMContentLoaded', localStorageListo); 
}

// Funciones


// Añadir tweet del formulario

function agregarTweet(e){
    e.preventDefault();
    // leer el valor del text area
    const tweet = document.getElementById('tweet').value; 
    //crear el boton de eliminar
    const botonBorrar = document.createElement('a'); 
    botonBorrar.classList = 'borrar-tweet'; 
    botonBorrar.innerText = 'X'; 

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet; 
    //añande el boton de borrar al tweet
    li.appendChild(botonBorrar); 
    // añade el tweet a la lista
    listaTweets.appendChild(li);
    

    // Añadir a local storage 
    agregarTweetLocalStorage(tweet); 
}

function borrarTweet(e){
    e.preventDefault(); 
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText); 

    }
}

// mostrar datos de local storage 
function localStorageListo(){
    let tweets; 
    tweets = obtenerTweetsLocalStorage(); 

    tweets.forEach(function(tweet){
        //crear el boton de eliminar
        const botonBorrar = document.createElement('a'); 
        botonBorrar.classList = 'borrar-tweet'; 
        botonBorrar.innerText = 'X'; 

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet; 
        //añande el boton de borrar al tweet
        li.appendChild(botonBorrar); 
        // añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}



// Agrega tweet a local storge 

function agregarTweetLocalStorage(tweet){
    let tweets; 
    tweets = obtenerTweetsLocalStorage(); 

    // añadir el nuevo tweet
    tweets.push(tweet); 
    // convertir de string a arreglo para local storage 
    localStorage.setItem('tweets', JSON.stringify(tweets));  
    
}

// comprueba que hayan elementos en local storage  
function obtenerTweetsLocalStorage(){
    let tweets; 
    //revisamos los valores del local storage
    if(localStorage.getItem('tweets') === null){
        tweets = []; 
    }else{
     
        tweets = JSON.parse(localStorage.getItem('tweets')); 

    }
    return tweets; 
}


// Eliminar tweet de local storage 

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar; 
    // Elimina la x del tweet 
    tweetBorrar = tweet.substring(0, tweet.length-1); 
    tweets = obtenerTweetsLocalStorage(); 

    tweets.forEach(function(tweet, index){
        if(tweetBorrar = tweet){
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets)); 
}