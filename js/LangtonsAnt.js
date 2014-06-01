function LangtonsAnt(){
	this.quantidade=0;
	
	this.criarFormiga=function(e,painel){
		this.quantidade++;
		var Quantidade=MitiElemento.getId('quantidade');
		Quantidade.innerHTML=this.quantidade;
		var quantidade=this.quantidade;
		
		this.obterIteracoesDoUltimoSegundo();
		var Iteracao=MitiElemento.getId('iteracao');
		var i=0;
		var Context=painel.getContext('2d');
		var Movimento={cima:false,direita:false,baixo:true,esquerda:false};
		
		var CoordenadaAtual={x:e.pageX,y:e.pageY};
		var pixel=Context.getImageData(CoordenadaAtual.x,CoordenadaAtual.y,1,1).data;
		
		setInterval(
			function(){
				UltimaCoordenada={x:CoordenadaAtual.x,y:CoordenadaAtual.y};
				
				if(pixel[0]===0){
					LangtonsAnt.andarParaDireita(CoordenadaAtual,Movimento);
					pixel=Context.getImageData(CoordenadaAtual.x,CoordenadaAtual.y,1,1).data;
					LangtonsAnt.colorir(Context,'red',CoordenadaAtual);
					LangtonsAnt.colorir(Context,'white',UltimaCoordenada);
				}else{
					LangtonsAnt.andarParaEsquerda(CoordenadaAtual,Movimento);
					pixel=Context.getImageData(CoordenadaAtual.x,CoordenadaAtual.y,1,1).data;
					LangtonsAnt.colorir(Context,'red',CoordenadaAtual);
					LangtonsAnt.colorir(Context,'black',UltimaCoordenada);
				}
				
				if(quantidade===1){
					Iteracao.innerHTML=++i;
				}
			}
			
			,1
		);
	};
	
	this.andarParaDireita=function(CoordenadaAtual,Movimento){
		if(Movimento.esquerda===true){
			if(CoordenadaAtual.y===0){
				CoordenadaAtual.y=495;
			}else{
				CoordenadaAtual.y--;
			}
			
			Movimento.esquerda=false;
			Movimento.cima=true;
		}else if(Movimento.cima===true){
			if(CoordenadaAtual.x===995){
				CoordenadaAtual.x=0;
			}else{
				CoordenadaAtual.x++;
			}
			
			Movimento.cima=false;
			Movimento.direita=true;
		}else if(Movimento.direita===true){
			if(CoordenadaAtual.y===495){
				CoordenadaAtual.y=0;
			}else{
				CoordenadaAtual.y++;
			}
			
			Movimento.direita=false;
			Movimento.baixo=true;
		}else if(Movimento.baixo===true){
			if(CoordenadaAtual.x===0){
				CoordenadaAtual.x=995;
			}else{
				CoordenadaAtual.x--;
			}
			
			Movimento.baixo=false;
			Movimento.esquerda=true;
		}
	};
	
	this.andarParaEsquerda=function(CoordenadaAtual,Movimento){
		if(Movimento.esquerda===true){
			if(CoordenadaAtual.y===495){
				CoordenadaAtual.y=0;
			}else{
				CoordenadaAtual.y++;
			}
			
			Movimento.esquerda=false;
			Movimento.baixo=true;
		}else if(Movimento.cima===true){
			if(CoordenadaAtual.x===0){
				CoordenadaAtual.x=995;
			}else{
				CoordenadaAtual.x--;
			}
			
			Movimento.cima=false;
			Movimento.esquerda=true;
		}else if(Movimento.direita===true){
			if(CoordenadaAtual.y===0){
				CoordenadaAtual.y=495;
			}else{
				CoordenadaAtual.y--;
			}
			
			Movimento.direita=false;
			Movimento.cima=true;
		}else if(Movimento.baixo===true){
			if(CoordenadaAtual.x===995){
				CoordenadaAtual.x=0;
			}else{
				CoordenadaAtual.x++;
			}
			
			Movimento.baixo=false;
			Movimento.direita=true;
		}
	};
	
	this.colorir=function(Context,cor,Coordenada){
		Context.fillStyle=cor;
		Context.fillRect(Coordenada.x,Coordenada.y,1,1);
	};
	
	this.obterIteracoesDoUltimoSegundo=function(){
		if(this.quantidade!==1){
			return;
		}
		
		var Iteracao=MitiElemento.getId('iteracao');
		var Segundo=MitiElemento.getId('segundo');
		var Velocidade=MitiElemento.getId('velocidade');
		var total=0;
		var segundo=0;
		
		setInterval(
			function(){
				Velocidade.innerHTML=Iteracao.innerHTML-total;
				total=Iteracao.innerHTML;
				
				Segundo.innerHTML=++segundo;
			}
			
			,1000
		);
	};
}
