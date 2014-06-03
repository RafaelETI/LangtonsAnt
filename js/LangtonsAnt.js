function LangtonsAnt(){
	this.continuidade;
	this.fertilidade;
	this.intervalo;
	this.quantidade=0;
	this.quantidadeFilhotes=0;
	this.maximoX;
	this.maximoY;
	
	MitiPadrao.iniciar(function(){
		alert('Clique para criar formigas.');
		
		LangtonsAnt.intervalo=MitiElemento.getId('intervalo').value;
		
		if(MitiElemento.getId('continuidade').disabled){
			LangtonsAnt.continuidade=true;
		}else{
			LangtonsAnt.continuidade=false;
		}
		
		if(MitiElemento.getId('fertilidade').disabled){
			LangtonsAnt.fertilidade=true;
		}else{
			LangtonsAnt.fertilidade=false;
		}
		
		MitiElemento.getTag('canvas')[0].onclick=function(e){
			LangtonsAnt.maximoX=e.currentTarget.clientWidth-4;
			LangtonsAnt.maximoY=e.currentTarget.clientHeight-4;
			
			LangtonsAnt.criarFormiga(e.pageX,e.pageY,this);
		};
		
		MitiElemento.getId('parada').onclick=function(){
			LangtonsAnt.continuidade=false;
			this.setAttribute('disabled','disabled');
			MitiElemento.getId('continuidade').removeAttribute('disabled');
		};
		
		MitiElemento.getId('continuidade').onclick=function(){
			LangtonsAnt.continuidade=true;
			this.setAttribute('disabled','disabled');
			MitiElemento.getId('parada').removeAttribute('disabled');
		};
		
		MitiElemento.getId('esterilidade').onclick=function(){
			LangtonsAnt.fertilidade=false;
			this.setAttribute('disabled','disabled');
			MitiElemento.getId('fertilidade').removeAttribute('disabled');
		};
		
		MitiElemento.getId('fertilidade').onclick=function(){
			LangtonsAnt.fertilidade=true;
			this.setAttribute('disabled','disabled');
			MitiElemento.getId('esterilidade').removeAttribute('disabled');
		};
		
		MitiElemento.getId('intervalo').onchange=function(){
			LangtonsAnt.intervalo=this.value;
		};
	});
	
	this.criarFormiga=function(x,y,painel){
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
		
		var CoordenadaAtual={x:x,y:y};
		var pixel=Context.getImageData(CoordenadaAtual.x,CoordenadaAtual.y,1,1).data;
		
		setInterval(
			function(){
				if(LangtonsAnt.continuidade){
					UltimaCoordenada={x:CoordenadaAtual.x,y:CoordenadaAtual.y};

					if(pixel[0]===0){
						LangtonsAnt.andarParaDireita(CoordenadaAtual,Movimento);
						pixel=Context.getImageData(CoordenadaAtual.x,CoordenadaAtual.y,1,1).data;
						LangtonsAnt.colorir(Context,'white',UltimaCoordenada);
						LangtonsAnt.colorir(Context,'red',CoordenadaAtual);
					}else{
						LangtonsAnt.andarParaEsquerda(CoordenadaAtual,Movimento);
						LangtonsAnt.teleportar(CoordenadaAtual,pixel,painel);
						pixel=Context.getImageData(CoordenadaAtual.x,CoordenadaAtual.y,1,1).data;
						LangtonsAnt.colorir(Context,'black',UltimaCoordenada);
						LangtonsAnt.colorir(Context,'red',CoordenadaAtual);
					}

					if(quantidade===1){
						Iteracao.innerHTML=++i;
					}
				}
			}
			
			,this.intervalo
		);
	};
	
	this.teleportar=function(CoordenadaAtual,pixel,painel){
		if(pixel[1]===0){
			CoordenadaAtual.x=this.obterAleatorioX();
			CoordenadaAtual.y=this.obterAleatorioY();
			this.procriar(painel);
		}
	};
	
	this.procriar=function(painel){
		if(this.fertilidade){
			var filhoX=this.obterAleatorioX();
			var filhoY=this.obterAleatorioY();
			MitiElemento.getId('filhote').innerHTML=++this.quantidadeFilhotes;
			this.criarFormiga(filhoX,filhoY,painel);
		}
	};
	
	this.obterAleatorioX=function(){
		return Math.floor((Math.random()*this.maximoX)+1);
	};
	
	this.obterAleatorioY=function(){
		return Math.floor((Math.random()*this.maximoY)+1);
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
		this.indicarPosicao(Context,cor,Coordenada);
	};
	
	this.indicarPosicao=function(Context,cor,Coordenada){
		if(cor==='white'){
			Context.fillStyle='black';
		}

		Context.fillRect(Coordenada.x,this.maximoY+1,1,3);
		Context.fillRect(this.maximoX+1,Coordenada.y,3,1);
	};
	
	this.obterIteracoesDoUltimoSegundo=function(){
		if(this.quantidade!==1){
			return;
		}
		
		var Iteracao=MitiElemento.getId('iteracao');
		var Segundo=MitiElemento.getId('segundo');
		var Velocidade=MitiElemento.getId('velocidade');
		var FPS=MitiElemento.getId('fps');
		var totalDeIteracoes=0;
		var segundos=0;
		
		setInterval(
			function(){
				if(LangtonsAnt.continuidade){
					Segundo.innerHTML=++segundos;

					FPS.innerHTML=Iteracao.innerHTML-totalDeIteracoes;
					totalDeIteracoes=Iteracao.innerHTML;

					Velocidade.innerHTML=Math.round(totalDeIteracoes/segundos);
				}
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
