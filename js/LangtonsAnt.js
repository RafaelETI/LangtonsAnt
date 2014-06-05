function LangtonsAnt(){
	this.continuidade=true;
	this.fertilidade=false;
	this.intervalo;
	this.tamanho;
	this.maximoX;
	this.maximoY;
	this.quantidade=0;
	this.quantidadeFilhotes=0;
	
	MitiPadrao.iniciar(function(){
		alert('Clique para criar formigas.');
		LangtonsAnt.obterControles();
		LangtonsAnt.anexarEventosAosControles();
		MitiElemento.getId('tamanho').removeAttribute('disabled');
	});
	
	this.obterControles=function(){
		if(!MitiElemento.getId('continuidade').disabled){
			this.continuidade=false;
		}
		
		if(MitiElemento.getId('fertilidade').disabled){
			this.fertilidade=true;
		}
		
		this.intervalo=MitiElemento.getId('intervalo').value;
		this.tamanho=Number(MitiElemento.getId('tamanho').value);
		this.maximoX=MitiElemento.getTag('canvas')[0].width-4;
		this.maximoY=MitiElemento.getTag('canvas')[0].height-4;
	};
	
	this.anexarEventosAosControles=function(){
		MitiElemento.getTag('canvas')[0].onclick=function(e){
			MitiElemento.getId('tamanho').setAttribute('disabled','disabled');
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
		
		MitiElemento.getId('tamanho').onchange=function(){
			LangtonsAnt.tamanho=Number(this.value);
		};
	};
	
	this.criarFormiga=function(x,y,painel){
		this.quantidade++;
		var Quantidade=MitiElemento.getId('quantidade');
		Quantidade.innerHTML=this.quantidade;
		var quantidade=this.quantidade;
		
		this.obterIteracoesDoUltimoSegundo();
		var Iteracao=MitiElemento.getId('iteracao');
		var i=0;
		var Context=painel.getContext('2d');
		
		var Movimento={direcao:null};
		this.definirDirecaoInicial(Movimento);
		
		var CoordenadaAtual={
			x:this.ajustarParaMultiplo(x),
			y:this.ajustarParaMultiplo(y)
		};
		var UltimaCoordenada;
		var pixel=Context.getImageData(CoordenadaAtual.x,CoordenadaAtual.y,1,1).data;
		
		setInterval(
			function(){
				if(LangtonsAnt.continuidade){
					UltimaCoordenada={x:CoordenadaAtual.x,y:CoordenadaAtual.y};

					if(pixel[0]===0){
						LangtonsAnt.andar(CoordenadaAtual,Movimento,90);
						pixel=Context.getImageData(CoordenadaAtual.x,CoordenadaAtual.y,1,1).data;
						LangtonsAnt.colorir(Context,'white',UltimaCoordenada);
						LangtonsAnt.colorir(Context,'red',CoordenadaAtual);
					}else{
						LangtonsAnt.andar(CoordenadaAtual,Movimento,-90);
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
		Movimento.direcao=Math.floor(Math.random()*4)*90;
	};
	
	this.andar=function(CoordenadaAtual,Movimento,giro){
		if(
			(giro===90&&Movimento.direcao===270)||
			(giro===-90&&Movimento.direcao===90)
		){
			if(CoordenadaAtual.y<this.tamanho){
				CoordenadaAtual.y=this.ajustarParaMultiplo(this.maximoY-this.tamanho);
			}else{
				CoordenadaAtual.y-=this.tamanho;
			}
		}else if(
			(giro===90&&Movimento.direcao===0)||
			(giro===-90&&Movimento.direcao===180)
		){
			if(CoordenadaAtual.x>this.maximoX-this.tamanho*2){
				CoordenadaAtual.x=0;
			}else{
				CoordenadaAtual.x+=this.tamanho;
			}
		}else if(
			(giro===90&&Movimento.direcao===90)||
			(giro===-90&&Movimento.direcao===270)
		){
			if(CoordenadaAtual.y>this.maximoY-this.tamanho*2){
				CoordenadaAtual.y=0;
			}else{
				CoordenadaAtual.y+=this.tamanho;
			}
		}else if(
			(giro===90&&Movimento.direcao===180)||
			(giro===-90&&Movimento.direcao===0)
		){
			if(CoordenadaAtual.x<this.tamanho){
				CoordenadaAtual.x=this.ajustarParaMultiplo(this.maximoX-this.tamanho);
			}else{
				CoordenadaAtual.x-=this.tamanho;
			}
		}
		
		Movimento.direcao=(Movimento.direcao+giro+360)%360;
	};
	
	this.teleportar=function(CoordenadaAtual,pixel,painel){
		if(pixel[1]===0){
			CoordenadaAtual.x=this.obterCoordenadaAleatoria(this.maximoX);
			CoordenadaAtual.y=this.obterCoordenadaAleatoria(this.maximoY);
			this.procriar(painel);
		}
	};
	
	this.procriar=function(painel){
		if(this.fertilidade){
			var filhoX=this.obterCoordenadaAleatoria(this.maximoX);
			var filhoY=this.obterCoordenadaAleatoria(this.maximoY);
			MitiElemento.getId('filhote').innerHTML=++this.quantidadeFilhotes;
			this.criarFormiga(filhoX,filhoY,painel);
		}
	};
	
	this.obterCoordenadaAleatoria=function(maxima){
		return this.ajustarParaMultiplo(Math.floor((Math.random()*maxima)+1));
	};
	
	this.colorir=function(Context,cor,Coordenada){
		Context.fillStyle=cor;
		Context.fillRect(Coordenada.x,Coordenada.y,this.tamanho,this.tamanho);
		this.indicarPosicao(Context,cor,Coordenada);
	};
	
	this.indicarPosicao=function(Context,cor,Coordenada){
		if(cor==='white'){
			Context.fillStyle='black';
		}

		Context.fillRect(Coordenada.x,this.maximoY+1,this.tamanho,3);
		Context.fillRect(this.maximoX+1,Coordenada.y,3,this.tamanho);
	};
	
	this.ajustarParaMultiplo=function(coordenada){
		for(var i=1;i<=this.tamanho;i++){
			if(coordenada%this.tamanho!==0){
				coordenada--;
			}else{
				break;
			}
		}
		
		return coordenada;
	};
}
