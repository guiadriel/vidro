var soma123 = 0;
var t = 0;
var data = {};


onload=function(){
	inicializaURL();
	//document.createElement('div').appendChild(data["numerodepedidos"]);
	teste();
	data["numerodepedidos"].innerHTML;
}


function teste(){
	console.log(data["numerodepedidos"]);
	alert(data["numerodepedidos"].toString);
}


function inicializaURL(){
	var query = location.search.slice(1);
	var partes = query.split('&');
	partes.forEach(function (parte) {
		var chaveValor = parte.split('=');
		var chave = chaveValor[0];
		var valor = chaveValor[1];
		data[chave] = valor;
	});
	console.log(data);}

	
function imprimir(){
	escondedisplay();
	window.print();}
	
function escondedisplay(){
	var elems = document.getElementsByClassName('deletando');
	for (var i=0;i<elems.length;i+=1){
		elems[i].style.display = 'none';}}