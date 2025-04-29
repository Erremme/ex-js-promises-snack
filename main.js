 /*
   Ottieni il titolo di un post con una Promise.
   Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
  */
 
 function getPostTitle(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
        .then((response) => response.json())
        .then((obj) => resolve(obj.title))
        .catch(reject)
    })
 }

 getPostTitle(1)
 .then((obj) => console.log(obj))
 .catch((error) => console.error(error)) 
 

 
 function getPost(id){
    return new Promise((resolve, reject)=> {
        fetch(`https://dummyjson.com/posts/${id}`)
        .then((response) => response.json())
        .then((obj) => resolve(obj))
        .then((response) => response.json())    
        .catch(reject)

        
    })
 }

 getPost(1)
    .then((obj) => console.log(obj))
    .catch((error) => console.error(error))

    /*
    Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
    */

function lanciaDado() {
    return new Promise((resolve, reject) => {
        console.log("Lancio il dado...")
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            const isStuck = Math.random() < 0.2; // 
            if (isStuck) {
                reject("Il dado si è incastrato!");
            } else {
                resolve(randomNumber);
            }

        }, 3000)
    })
}

//lanciaDado()
    //.then((result) => console.log(result))
    //.catch((error) => console.error(error))

    /*
    🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
        Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".
    */

function creaLanciaDado() {
    let ultimoLancio = 0; 

    return function() {
        return new Promise((resolve, reject) => {
            console.log("Lancio il dado...")
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                const isStuck = Math.random() < 0.2; // 
                if (isStuck) {
                    reject("Il dado si è incastrato!");
                } else {
                    if (randomNumber === ultimoLancio) {
                        console.log("Incredibile!");
                    }
                    ultimoLancio = randomNumber; 
                    resolve(randomNumber);
                }

            }, 3000)
        })
    }
}

const lanciaDadoMemorizzato = creaLanciaDado();
lanciaDadoMemorizzato()
    .then((result) => console.log(result))
    .catch((error) => console.error(error))

lanciaDadoMemorizzato()
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
