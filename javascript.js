const graph = {
  guatemala: {baja_verapaz: 55, chimaltenango: 33, sacatepequez:17, escuintla:48,santa_rosa:63, jalapa:56,el_progreso:78},
  el_progreso: {zacapa: 137, alta_verapaz: 82, baja_verapaz:48, guatemala:78, jalapa:29},
  sacatepequez: {guatemala: 17, chimaltenango: 29,escuintla:48},
  chimaltenango: {guatemala: 33, quiche:94, solola:118, suchitepequez:73, escuintla:40,sacatepequez:12},
  escuintla: {santa_rosa: 85, guatemala:63, sacatepequez:48, chimaltenango:40, suchitepequez:70},
  santa_rosa: {jutiapa:72,  jalapa:105, guatemala:63, escuintla:85},
  solola: {chimaltenango:118, quiche:198, totonicapan: 56, quezaltenango:53, suchitepequez:87},
  totonicapan: {quiche: 194, huehuetenango: 118, quezaltenango:87, solola:56},
  quezaltenango: {suchitepequez: 87, solola:53, totonicapan:87, huehuetenango:125, san_marcos:74, retalhuleu:59},
  suchitepequez: {escuintla:70, chimaltenango:73, solola:87, quezaltenango:87,retalhuleu:54},
  retalhuleu: {suchitepequez: 54, quezaltenango: 59, san_marcos: 90},
  san_marcos: {huehuetenango: 123, quezaltenango: 74, retalhuleu: 90, },
  huehuetenango: {quiche: 175, san_marcos: 123, quezaltenango: 125, totonicapan: 118},
  quiche: {baja_verapaz: 214, alta_verapaz: 298, huehuetenango: 175, totonicapan: 194, solola: 198, chimaltenango:94},
  baja_verapaz: {guatemala: 55, el_progreso: 48, alta_verapaz: 272, quiche: 214},
  alta_verapaz: {el_progreso: 82, zacapa: 310, izabal: 396, peten: 420, quiche: 298, baja_verapaz: 272},
  peten: {alta_verapaz: 420, izabal: 470},
  izabal: {zacapa: 300, peten: 470, alta_verapaz:396},
  zacapa: {izabal: 300, alta_verapaz: 310, el_progreso: 137, jalapa:310, chiquimula: 36},
  chiquimula: {zacapa:36, jalapa:78, jutiapa:97},
  jalapa: {jutiapa: 97, chiquimula:97, zacapa: 310, el_progreso: 29, guatemala: 56, santa_rosa:105},
  jutiapa: {chiquimula:97, jalapa:97, santa_rosa:72}
};


function log(message) {
    const logging = false;
    if (logging) {
        console.log(message);
    }
}

const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph, startNodeName, endNodeName) => {

    // track the lowest cost to reach each node
    let costs = {};
    costs[endNodeName] = "Infinity";
    costs = Object.assign(costs, graph[startNodeName]);

    // track paths
    const parents = {endNodeName: null};
    for (let child in graph[startNodeName]) {
        parents[child] = startNodeName;
    }
 console.log('Inicial `pesos`: ')
  console.log(costs)
    // track nodes that have already been processed
    const processed = [];

    let node = lowestCostNode(costs, processed);

    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            if (String(n) === String(startNodeName)) {
                console.log("WE DON'T GO BACK TO START");
            } else {
                console.log("StartNodeName: " + startNodeName);
                console.log("Evaluating cost to node " + n + " (looking from node " + node + ")");
                console.log("Last Cost: " + costs[n]);
                let newCost = cost + children[n];
                console.log("New Cost: " + newCost);
                if (!costs[n] || costs[n] > newCost) {
                    costs[n] = newCost;
                    parents[n] = node;
                    console.log("Updated cost und parents");
                } else {
                    console.log("A shorter path already exists");
                }
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }

    let optimalPath = [endNodeName];
    let parent = parents[endNodeName];
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
        distance: costs[endNodeName],
        path: optimalPath
    };

    return results;
};

console.log(dijkstra(graph, "chiquimula", "guatemala"));
//console.log(dijkstra(problem, "A", "B"));
//console.log(dijkstra(problem, "A", "start"));