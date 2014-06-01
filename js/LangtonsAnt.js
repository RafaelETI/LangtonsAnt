function LangtonsAnt(){
	this.quantidade=0;
	this.maximoX;
	this.maximoY;
	
	MitiPadrao.iniciar(function(){
		MitiElemento.getTag('canvas')[0].onclick=function(e){
			LangtonsAnt.maximoX=e.currentTarget.clientWidth-1;
			LangtonsAnt.maximoY=e.currentTarget.clientHeight-1;
			
			LangtonsAnt.criarFormiga(e,this);
		};
	});
	
	this.criarFormiga=function(e,painel){
		this.quantidade++;
		var Quantidade=MitiElemento.getId('quantidade');
		Quantidade.innerHTML=this.quantidade;
		var quantidade=this.quantidade;
		
		this.obterIteracoesDoUltimoSegundo();
		var Iteracao=MitiElemento.getId('iteracao');
		var i=0;
		var Context=painel.getContext('2d');
		
		var Movimento={cima:false,direita:false,baixo:false,esquerda:false};
		this.definirDirecaoInicial(Movimento);
		
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
					LangtonsAnt.teleportar(CoordenadaAtual,pixel);
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
	
	this.teleportar=function(CoordenadaAtual,pixel){
		if(pixel[1]===0){
			CoordenadaAtual.x=Math.floor((Math.random()*this.maximoX)+1);
			CoordenadaAtual.y=Math.floor((Math.random()*this.maximoY)+1);
		}
	};
	
	this.andarParaDireita=function(CoordenadaAtual,Movimento){
		if(Movimento.esquerda===true){
			if(CoordenadaAtual.y===0){
				CoordenadaAtual.y=this.maximoY;
			}else{
				CoordenadaAtual.y--;
			}
			
			Movimento.esquerda=false;
			Movimento.cima=true;
		}else if(Movimento.cima===true){
			if(CoordenadaAtual.x===this.maximoX){
				CoordenadaAtual.x=0;
			}else{
				CoordenadaAtual.x++;
			}
			
			Movimento.cima=false;
			Movimento.direita=true;
		}else if(Movimento.direita===true){
			if(CoordenadaAtual.y===this.maximoY){
				CoordenadaAtual.y=0;
			}else{
				CoordenadaAtual.y++;
			}
			
			Movimento.direita=false;
			Movimento.baixo=true;
		}else if(Movimento.baixo===true){
			if(CoordenadaAtual.x===0){
				CoordenadaAtual.x=this.maximoX;
			}else{
				CoordenadaAtual.x--;
			}
			
			Movimento.baixo=false;
			Movimento.esquerda=true;
		}
	};
	
	this.andarParaEsquerda=function(CoordenadaAtual,Movimento){
		if(Movimento.esquerda===true){
			if(CoordenadaAtual.y===this.maximoY){
				CoordenadaAtual.y=0;
			}else{
				CoordenadaAtual.y++;
			}
			
			Movimento.esquerda=false;
			Movimento.baixo=true;
		}else if(Movimento.cima===true){
			if(CoordenadaAtual.x===0){
				CoordenadaAtual.x=this.maximoX;
			}else{
				CoordenadaAtual.x--;
			}
			
			Movimento.cima=false;
			Movimento.esquerda=true;
		}else if(Movimento.direita===true){
			if(CoordenadaAtual.y===0){
				CoordenadaAtual.y=this.maximoY;
			}else{
				CoordenadaAtual.y--;
			}
			
			Movimento.direita=false;
			Movimento.cima=true;
		}else if(Movimento.baixo===true){
			if(CoordenadaAtual.x===this.maximoX){
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
	
	this.definirDirecaoInicial=function(Movimento){
		var aleatorio=Math.floor((Math.random()*4)+1);
		
		if(aleatorio===1){
			Movimento.cima=true;
		}else if(aleatorio===2){
			Movimento.direita=true;
		}else if(aleatorio===3){
			Movimento.baixo=true;
		}else if(aleatorio===4){
			Movimento.esquerda=true;
		}
	};
}
