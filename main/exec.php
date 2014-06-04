<!doctype html>
<html lang="pt-br">
<head>
<meta charset="windows-1252" />

<title>Langton's Ant 1.10.2</title>

<meta name="author" content="Rafael Barros" />
<link rel="shortcut icon" type="image/png" href="../img/fav.png" />
<link rel="stylesheet" type="text/css" href="../css/geral.css" />

<script src="../lib/js/miti/MitiPadrao.js"></script>
<script src="../lib/js/miti/MitiElemento.js"></script>
<script src="../js/LangtonsAnt.js"></script>
<script>
var MitiPadrao=new MitiPadrao;
var MitiElemento=new MitiElemento;
var LangtonsAnt=new LangtonsAnt;
</script>
</head>
<!--==========neck==========-->
<body>
<canvas width="700" height="430">O seu navegador não suporta canvas.</canvas>
	
<div>
	Formigas: <span id="quantidade">0</span> &bull;
	Filhotes: <span id="filhote">0</span> &bull;
	Frames: <span id="iteracao">0</span> &bull;
	Segundos: <span id="segundo">0</span> &bull;
	Velocidade: <span id="velocidade">0</span> &bull;
	FPS: <span id="fps">0</span>
</div>

<div>
	<input type="button" id="parada" value="Parar" />
	<input type="button" id="continuidade" value="Continuar" disabled="disabled" />
	
	&bull;
	
	<input type="button" id="fertilidade" value="Fertilizar" />
	<input type="button" id="esterilidade" value="Esterilizar" disabled="disabled" />

	&bull;
	
	Intervalo:
	<input type="range" id="intervalo" value="1" min="1" max="500" step="5" />
	
	&bull;
	
	Tamanho:
	<input type="range" id="tamanho" value="1" min="1" max="10" />
</div>
</body>
</html>
