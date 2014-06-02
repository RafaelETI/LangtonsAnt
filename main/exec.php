<!doctype html>
<html lang="pt-br">
<head>
<meta charset="windows-1252" />

<title>Langton's Ant 1.7.2</title>

<meta name="author" content="Rafael Barros" />
<link rel="shortcut icon" type="image/png" href="../img/fav.png" />
<link rel="stylesheet" type="text/css" href="../css/geral.css" />

<script src="../lib/js/jquery_min.js"></script>
<script src="../lib/js/miti/MitiPadrao.js"></script>
<script src="../lib/js/miti/MitiElemento.js"></script>
<script src="../js/Geral.js"></script>
<script src="../js/LangtonsAnt.js"></script>
<script>
var LangtonsAnt=new LangtonsAnt;
</script>
</head>
<!--==========neck==========-->
<body>
<canvas width="700" height="430">
	O seu navegador não suporta canvas.
</canvas>
	
<div>
	Formigas: <span id="quantidade"></span> &bull;
	Frames: <span id="iteracao"></span> &bull;
	Segundos: <span id="segundo"></span> &bull;
	Velocidade: <span id="velocidade"></span> &bull;
	FPS: <span id="fps"></span>
</div>

<div>
	Intervalo: <input type="range" id="intervalo" value="1" min="1" max="1000" />
	
	&bull;
	
	<input type="button" id="parada" value="Parar" />
	<input type="button" id="continuacao" value="Continuar" />
</div>
</body>
</html>
