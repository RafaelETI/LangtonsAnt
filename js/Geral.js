var MitiPadrao=new MitiPadrao;
var MitiElemento=new MitiElemento;
var Geral=new Geral;

function Geral(){
	MitiPadrao.iniciar(function(){
		Geral.enfeitar();
		alert('Clique para criar formigas.');
	});
	
	this.enfeitar=function(){
		$('body').fadeIn(1000);
	};
}
