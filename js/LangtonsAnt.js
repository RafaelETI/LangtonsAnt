function LangtonsAnt(){
	this.criarFormiga=function(event){
		MitiElemento.getId('x').innerHTML=event.pageX;
		MitiElemento.getId('y').innerHTML=event.pageY;
	};
}
