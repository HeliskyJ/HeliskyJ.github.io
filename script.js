
const encontrarCostoMenor = (pesos, procesado) => {
  return Object.keys(pesos).reduce((pesoMenor, nodo) => {
      if (pesoMenor === null || pesos[nodo] < pesos[pesoMenor]){ 
        if (!procesado.includes(nodo)) {
        pesoMenor = nodo;
      }
    }
      return pesoMenor;
  }, null);
};

// función que devuelve el costo minimo y el camino final
const dijkstra = (grafo, nodoInicial, nodoDestino) => {
  let pesos = {};
  pesos[nodoDestino] = 'Infinito'
  pesos = Object.assign(pesos, grafo[nodoInicial]);
  console.log('Inicial `pesos`: ')
  console.log(pesos)

  // recorrido de caminos
  const nodosPadre = {nodoDestino: null};
  for (let hijo in grafo[nodoInicial]) {
    nodosPadre[hijo] = nodoInicial;
  }
  console.log('Inicial `parents`: ')
  console.log(nodosPadre)

  // nodos visitados
  const nodosVisitados = [];

  // Set initial node. Pick lowest cost node.

  let nodo = encontrarCostoMenor(pesos, nodosVisitados);
  console.log('Initial `node`: ', nodo)

  while (nodo) {
    console.log(`***** 'Nodo Actual': ${nodo} *****`)
    let peso = pesos[nodo];
    let hijosDelNodo = grafo[nodo];
  
    for (let n in hijosDelNodo) {
       if(String(n) === String(nodoInicial)){
        console.log('Buscando la ruta mas corta');
       }else{
        console.log('Nodo inicial '+ nodoInicial);
        console.log('Evaluando el peso del nodo '+n +'... Buscando desde el nodo '+nodo);
        console.log('ultimo peso registrado '+pesos[n]);
        let nuevoPeso = peso + hijosDelNodo[n];
        console.log('Nuevo peso: '+ nuevoPeso);
        if(!pesos[n] || pesos[n] > nuevoPeso){
          pesos[n]  = nuevoPeso;
          nodosPadre[n] = nodo;
          console.log('Actualizado el peso y los nodos padre')
        }else{
          console.log('Un camino mas corto ya existe')
        }
       }
    }
    nodosVisitados.push(nodo);
    nodo = encontrarCostoMenor(pesos, nodosVisitados);
  }
  console.log('while loop ends: ')

  let caminoMasCorto = [nodoDestino];
  let padre = nodosPadre[nodoDestino];
  while (padre) {
    caminoMasCorto.push(padre);
    padre = nodosPadre[padre];
  }
  caminoMasCorto.reverse();

  const resultado = {
    distancia: pesos[nodoDestino],
    camino: caminoMasCorto
  };


  div =document.getElementById('resultado');
  var ul = document.createElement('ul'), li;
    console.log(resultado)
  for(let i=0; i<resultado.camino.length; i++){
        console.log(resultado.camino[i])
      li= document.createElement('li');
      li.appendChild(document.createTextNode(resultado.camino[i]));
      ul.appendChild(li);
  }

      div.appendChild(ul);
      document.body.appendChild(div)
  return resultado;

};

