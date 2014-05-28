function LangtonsAnt(){
	this.criarFormiga=function(e){
		MitiElemento.getId('x').innerHTML=e.pageX;
		MitiElemento.getId('y').innerHTML=e.pageY;
	};
}
