// devuelve el nodo con el peso menor
const encontrarCostoMenor = (pesos, visitado) => {
  return Object.keys(pesos).reduce((pesoMenor, nodo) => {
    if (pesoMenor === null || pesos[nodo] < pesos[pesoMenor]) {
      if (!visitado.includes(nodo)) {
        pesoMenor = nodo;
      }
    }
    return pesoMenor;
  }, null);
};

// función que devuelve el costo minimo y el camino final
const dijkstra = (grafo, nodoInicial, nodoDestino) => {

  // asigna el nodo destino con la etiqueta "infinity"
  let pesos = {};
  pesos[nodoDestino] = 'Infinity'

  //Hace una copia desde el nodo origen
  pesos = Object.assign(pesos, grafo[nodoInicial]);
  console.log('Inicial `pesos`: ')
  console.log(pesos)

  // recorrido de caminos
  const nodosPadre = {
    nodoDestino: null
  };

  for (let hijo in grafo[nodoInicial]) {
    nodosPadre[hijo] = nodoInicial;
  }
  console.log('Inicial `parents`: ')
  console.log(nodosPadre)

  // nodos visitados
  const nodosVisitados = [];

  // Asigna el nodo inical. Toma el peso menor
  let nodo = encontrarCostoMenor(pesos, nodosVisitados);
  console.log('Nodo `inicial`: ', nodo)

  while (nodo) {
    console.log(`***** 'Nodo Actual': ${nodo} *****`)
    let peso = pesos[nodo];
    let hijosDelNodo = grafo[nodo];

    for (let n in hijosDelNodo) {

      if (String(n) === String(nodoInicial)) {
        console.log('Buscando la ruta mas corta');
      } else {
        console.log('Nodo inicial ' + nodoInicial);
        console.log('Evaluando el peso del nodo ' + n + '... Buscando desde el nodo ' + nodo);
        console.log('ultimo peso registrado ' + pesos[n]);

        // guarda el peso nuevo en una variable
        let nuevoPeso = peso + hijosDelNodo[n];
        console.log('Nuevo peso: ' + nuevoPeso);

        // verifica el nuevo peso, si es menor al peso antes registrado se toma ese peso comoel mejor
        if (!pesos[n] || pesos[n] > nuevoPeso) {
          pesos[n] = nuevoPeso;
          nodosPadre[n] = nodo;
          console.log('Actualizado el peso y los nodos padre')
        } else {
          console.log('Un camino mas corto ya existe')
        }
      }
    }
    // Se marcan los nodos visitados
    nodosVisitados.push(nodo);
    // continua buscando el camino menor, hasta que todos los nodos sean visitados
    nodo = encontrarCostoMenor(pesos, nodosVisitados);
  }
  console.log('Termina el ciclo')

  let caminoMasCorto = [nodoDestino];
  let padre = nodosPadre[nodoDestino];
  console.log("camino " + caminoMasCorto)

  //asigna al caminoMasCorto los nodos padre
  while (padre) {
    caminoMasCorto.push(padre);
    padre = nodosPadre[padre];
  }
  
  caminoMasCorto.reverse();

  const resultado = {
    distancia: pesos[nodoDestino],
    camino: caminoMasCorto
  };



  // Crea el elemento lista en el DOM
  div = document.getElementById('resultado');
  divRow2 = document.createElement('div')
  divRow2.classList.add('row', 'shadow-sm', 'p-3', 'mb-5', 'bg-white', 'rounded');
  
  div.appendChild(divRow2);
  divCol1 = document.createElement('div');
  divCol1.classList.add('col-md-6');
  divRow2.appendChild(divCol1);

  var divCol2 = document.createElement('div');
  divCol2.classList.add('col-md-6', 'display-6', 'font-weight-bold');
  var content = document.createTextNode(resultado.distancia +' KM')
  divCol2.appendChild(content)
  divRow2.appendChild(divCol2);

  var ul = document.createElement('ul'),
    li;
  for (let i = 0; i < resultado.camino.length; i++) {
    console.log(resultado.camino[i])
    li = document.createElement('li');
    li.appendChild(document.createTextNode(resultado.camino[i]));
    ul.appendChild(li);
  }

  divCol1.appendChild(ul);
  document.body.appendChild(div)
  return resultado;

};