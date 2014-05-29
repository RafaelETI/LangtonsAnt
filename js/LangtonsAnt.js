function LangtonsAnt(){
	this.criarFormiga=function(e,painel){
		var x=e.pageX;
		var y=e.pageY;
		var cima=false;
		var direita=false;
		var baixo=false;
		var esquerda=true;
		var i=0;
		
		var context=painel.getContext('2d');
		context.fillStyle='#ffffff';
		
		setInterval(
			function(){
				var pixel=context.getImageData(x,y,1,1).data;
				
				if(pixel[0]===0){
					context.fillStyle='#ffffff';
					context.fillRect(x,y,1,1);
					
					if(esquerda===true){
						y++; esquerda=false; cima=true;
					}else if(cima===true){
						x++; cima=false; direita=true;
					}else if(direita===true){
						y--; direita=false; baixo=true;
					}else if(baixo===true){
						x--; baixo=false; esquerda=true;
					}
				}else{
					context.fillStyle='#000000';
					context.fillRect(x,y,1,1);
					
					if(esquerda===true){
						y--; esquerda=false; baixo=true;
					}else if(cima===true){
						x--; cima=false; esquerda=true;
					}else if(direita===true){
						y++; direita=false; cima=true;
					}else if(baixo===true){
						x++; baixo=false; direita=true;
					}
				}
				
				i++;
				MitiElemento.getId('iteracoes').innerHTML=i;
			}
			
			,1
		);
	};
}
