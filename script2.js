// arreglo para el select
departamentos = [
	// valor        clave
	["GUATEMALA", "guatemala"],
	["El PROGRESO", "el_progreso"],
	["SACATEPEQUEZ", "sacatepequez"],
	["CHIMALTENANGO", "chimaltenango"],
	["ESCUINTLA", "escuintla"],
	["SANTA ROSA", 'santa_rosa'],
	["SOLOLA", "solola"],
	["TOTONICAPAN", "totonicapan"],
	["QUEZALTENANGO", "quezaltenango"],
	["SUCHITEPEQUEZ", "suchitepequez"],
	["RETALHULEU", "retalhuleu"],
	["SAN MARCOS", "san_marcos"],
	["HUEHUETENANGO", "huehuetenango"],
	["QUICHE", "quiche"],
	["BAJA VERAPAZ", "baja_verapaz"],
	["ALTA VERAPAZ", "alta_verapaz"],
	["PETEN", "peten"],
	["IZABAL", "izabal"],
	["ZACAPA", "zacapa"],
	["CHIQUIMULA", "chiquimula"],
	["JALAPA", "jalapa"],
	["JUTIAPA", "jutiapa"]
];
// ORIGEN 

// Crea el elemendo div y le agrega la clase row
var divRow = document.createElement('div')
divRow.classList.add('row');

// crea el elemento select de origen
var form = document.getElementById('origen');

// Crea un elemento Select
var selectList = document.createElement('select');
selectList.id = 'select-origen';
selectList.classList.add('form-control');
form.appendChild(selectList);

// por cada elemento dentro del arreglo de departamentos crea una opcion
for (var i = 0; i < departamentos.length; i++) {
	var option = document.createElement("option");
	option.value = departamentos[i][1];
	option.id = departamentos[i][0];
	option.text = departamentos[i][0];

	selectList.appendChild(option);

	document.body.appendChild(form);
}
// insert el select en el DOM
divRow.appendChild(form);

// DESTINO
// crea el elemento select de Destino
var form2 = document.getElementById('destino');

var selectList2 = document.createElement('select');
selectList2.id = 'select-destino';
selectList2.classList.add('form-control');

form2.appendChild(selectList2);

for (var i = 0; i < departamentos.length; i++) {
	var option = document.createElement("option");
	option.value = departamentos[i][1];
	option.text = departamentos[i][0];

	selectList2.appendChild(option);

	document.body.appendChild(form2);
}
divRow.appendChild(form2);
document.body.appendChild(divRow)

// crea un nuevo contenedor para alojar los resultados
let contenedor = document.createElement('div');
contenedor.id = 'resultado'
contenedor.classList.add('card')
document.body.appendChild(contenedor);