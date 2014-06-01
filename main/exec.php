<!doctype html>
<html lang="pt-br">
<head>
<meta charset="windows-1252" />

<title>Langton's Ant</title>

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
<canvas width="700" height="450">
	O seu navegador não suporta canvas.
</canvas>

<div id="informacao">
	Formigas: <span id="quantidade"></span> &bull;
	Iterações: <span id="iteracao"></span> &bull;
	Segundos: <span id="segundo"></span> &bull;
	Velocidade: <span id="velocidade"></span>
</div>
</body>
</html>
