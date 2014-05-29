<!doctype html>
<html lang="pt-br">
<head>
<meta charset="windows-1252" />

<title>Langton's Ant</title>

<meta name="author" content="Rafael Barros" />

<link rel="shortcut icon" type="image/png" href="../img/fav.png" />

<link rel="stylesheet" type="text/css" href="../css/geral.css" />
<link rel="stylesheet" type="text/css" href="../css/exec.css" />

<script src="../lib/js/jquery_min.js"></script>
<script src="../lib/js/miti/MitiPadrao.js"></script>
<script src="../lib/js/miti/MitiElemento.js"></script>
<script src="../js/Geral.js"></script>
<script src="../js/LangtonsAnt.js"></script>
<script>
var LangtonsAnt=new LangtonsAnt;

MitiPadrao.iniciar(function(){
	MitiElemento.getId('painel').onclick=function(e){
		LangtonsAnt.criarFormiga(e,this);
	};
});
</script>
</head>
<!--==========neck==========-->
<body>
<canvas id="painel" width="1000" height="500">
	O seu navegador não suporta canvas.
</canvas>

Iterações: <span id="iteracoes">0</span>
</body>
</html>
