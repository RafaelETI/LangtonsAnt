function LangtonsAnt()
{
    this.continuidade = true;
    this.fertilidade = false;
    this.intervalo;
    this.tamanho;
    this.maximoX;
    this.maximoY;
    this.quantidade = 0;
    this.quantidadeFilhotes = 0;

    this.iniciar = function () {
        LangtonsAnt.obterControles();
        LangtonsAnt.anexarEventosAosControles();
        document.getElementById('tamanho').removeAttribute('disabled');
    };

    this.obterControles = function () {
        if (!document.getElementById('continuidade').disabled) {
            this.continuidade = false;
        }

        if (document.getElementById('fertilidade').disabled) {
            this.fertilidade = true;
        }

        this.intervalo = document.getElementById('intervalo').value;
        this.tamanho = Number(document.getElementById('tamanho').value);
        this.maximoX = document.getElementsByTagName('canvas')[0].width - 4;
        this.maximoY = document.getElementsByTagName('canvas')[0].height - 4;
    };

    this.anexarEventosAosControles = function () {
        document.getElementsByTagName('canvas')[0].onclick = function (e) {
            document.getElementById('tamanho').setAttribute('disabled', 'disabled');
            LangtonsAnt.criarFormiga(e.pageX, e.pageY,this);
        };

        document.getElementById('parada').onclick = function () {
            LangtonsAnt.continuidade = false;
            this.setAttribute('disabled', 'disabled');
            document.getElementById('continuidade').removeAttribute('disabled');
        };

        document.getElementById('continuidade').onclick = function () {
            LangtonsAnt.continuidade = true;
            this.setAttribute('disabled', 'disabled');
            document.getElementById('parada').removeAttribute('disabled');
        };

        document.getElementById('esterilidade').onclick = function () {
            LangtonsAnt.fertilidade = false;
            this.setAttribute('disabled', 'disabled');
            document.getElementById('fertilidade').removeAttribute('disabled');
        };

        document.getElementById('fertilidade').onclick = function () {
            LangtonsAnt.fertilidade = true;
            this.setAttribute('disabled', 'disabled');
            document.getElementById('esterilidade').removeAttribute('disabled');
        };

        document.getElementById('intervalo').onchange = function (){
            LangtonsAnt.intervalo = this.value;
        };

        document.getElementById('tamanho').onchange=function () {
            LangtonsAnt.tamanho = Number(this.value);
        };
    };

    this.criarFormiga = function (x, y, painel) {
        this.quantidade++;
        var Quantidade = document.getElementById('quantidade');
        Quantidade.innerHTML = this.quantidade;
        var quantidade = this.quantidade;

        this.obterIteracoesDoUltimoSegundo();
        var Iteracao = document.getElementById('iteracao');
        var i = 0;
        var Context = painel.getContext('2d');

        var Movimento = {direcao: null};
        this.definirDirecaoInicial(Movimento);

        var CoordenadaAtual = {
            x: this.ajustarParaMultiplo(x),
            y: this.ajustarParaMultiplo(y)
        };

        var UltimaCoordenada;
        var pixel = Context.getImageData(CoordenadaAtual.x, CoordenadaAtual.y, 1, 1).data;

        setInterval(
            function () {
                if (LangtonsAnt.continuidade) {
                    UltimaCoordenada = {
                        x: CoordenadaAtual.x,
                        y: CoordenadaAtual.y
                    };

                    if (pixel[0] === 0) {
                        LangtonsAnt.andar(CoordenadaAtual, Movimento, 90);
                        pixel = Context.getImageData(CoordenadaAtual.x, CoordenadaAtual.y, 1, 1).data;
                        LangtonsAnt.colorir(Context, 'white', UltimaCoordenada);
                        LangtonsAnt.colorir(Context, 'red', CoordenadaAtual);
                    } else {
                        LangtonsAnt.andar(CoordenadaAtual, Movimento, -90);
                        LangtonsAnt.teleportar(CoordenadaAtual, pixel, painel);
                        pixel = Context.getImageData(CoordenadaAtual.x, CoordenadaAtual.y, 1, 1).data;
                        LangtonsAnt.colorir(Context, 'black', UltimaCoordenada);
                        LangtonsAnt.colorir(Context, 'red', CoordenadaAtual);
                    }

                    if (quantidade === 1) {
                        Iteracao.innerHTML = ++i;
                    }
                }
            }

            , this.intervalo
        );
    };

    this.obterIteracoesDoUltimoSegundo = function () {
        if (this.quantidade !== 1) {
            return;
        }

        var Iteracao = document.getElementById('iteracao');
        var Segundo = document.getElementById('segundo');
        var Velocidade = document.getElementById('velocidade');
        var FPS = document.getElementById('fps');
        var totalDeIteracoes = 0;
        var segundos = 0;

        setInterval(
            function () {
                if (LangtonsAnt.continuidade) {
                    Segundo.innerHTML = ++segundos;

                    FPS.innerHTML = Iteracao.innerHTML - totalDeIteracoes;
                    totalDeIteracoes = Iteracao.innerHTML;

                    Velocidade.innerHTML = Math.round(totalDeIteracoes / segundos);
                }
            }

            , 1000
        );
    };

    this.definirDirecaoInicial = function (Movimento) {
        Movimento.direcao = Math.floor(Math.random() * 4) * 90;
    };

    this.andar = function (CoordenadaAtual,Movimento,giro) {
        if (
            (giro === 90 && Movimento.direcao === 270)
            || (giro === -90 && Movimento.direcao === 90)
        ) {
            if (CoordenadaAtual.y < this.tamanho) {
                CoordenadaAtual.y = this.ajustarParaMultiplo(this.maximoY - this.tamanho);
            } else {
                CoordenadaAtual.y -= this.tamanho;
            }
        } else if (
            (giro === 90 && Movimento.direcao === 0)
            || (giro === -90 && Movimento.direcao === 180)
        ) {
            if (CoordenadaAtual.x > this.maximoX - this.tamanho * 2) {
                CoordenadaAtual.x = 0;
            } else {
                CoordenadaAtual.x += this.tamanho;
            }
        } else if (
            (giro === 90 && Movimento.direcao === 90)
            || (giro === -90 && Movimento.direcao === 270)
        ) {
            if (CoordenadaAtual.y > this.maximoY - this.tamanho * 2) {
                CoordenadaAtual.y = 0;
            } else {
                CoordenadaAtual.y += this.tamanho;
            }
        } else if (
            (giro === 90 && Movimento.direcao === 180)
            || (giro === -90 && Movimento.direcao === 0)
        ) {
            if (CoordenadaAtual.x < this.tamanho) {
                CoordenadaAtual.x = this.ajustarParaMultiplo(this.maximoX - this.tamanho);
            } else {
                CoordenadaAtual.x -= this.tamanho;
            }
        }

        Movimento.direcao = (Movimento.direcao + giro + 360) % 360;
    };

    this.teleportar = function (CoordenadaAtual,pixel,painel) {
        if (pixel[1] === 0) {
            CoordenadaAtual.x = this.obterCoordenadaAleatoria(this.maximoX);
            CoordenadaAtual.y = this.obterCoordenadaAleatoria(this.maximoY);
            this.procriar(painel);
        }
    };

    this.procriar = function (painel) {
        if (this.fertilidade) {
            var filhoX = this.obterCoordenadaAleatoria(this.maximoX);
            var filhoY = this.obterCoordenadaAleatoria(this.maximoY);
            document.getElementById('filhote').innerHTML = ++this.quantidadeFilhotes;
            this.criarFormiga(filhoX, filhoY, painel);
        }
    };

    this.obterCoordenadaAleatoria = function (maxima) {
        return this.ajustarParaMultiplo(Math.floor((Math.random() * maxima) + 1));
    };

    this.colorir = function (Context, cor, Coordenada){
        Context.fillStyle = cor;
        Context.fillRect(Coordenada.x, Coordenada.y, this.tamanho, this.tamanho);
        this.indicarPosicao(Context, cor, Coordenada);
    };

    this.indicarPosicao = function (Context, cor, Coordenada) {
        if (cor === 'white') {
            Context.fillStyle = 'black';
        }

        Context.fillRect(Coordenada.x, this.maximoY + 1, this.tamanho, 3);
        Context.fillRect(this.maximoX + 1, Coordenada.y, 3, this.tamanho);
    };

    this.ajustarParaMultiplo = function (coordenada) {
        for (var i=1; i <= this.tamanho; i++) {
            if (coordenada % this.tamanho !== 0) {
                coordenada--;
            } else {
                break;
            }
        }

        return coordenada;
    };
}
