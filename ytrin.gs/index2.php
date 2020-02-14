<?php /*if(strtolower($_SERVER['HTTP_HOST']) != 'ytrin.gs' || strtolower($_SERVER['REQUEST_URI']) != '/frihed') {
	header('HTTP/1.1 301 Moved Permanently');
	header('Location: http://ytrin.gs/frihed');
	exit();
}*/ ?>

<!DOCTYPE html>
<!--[if lt IE 8]><html class="no-js ie ie7" lang="da-DK"><![endif]-->
<!--[if IE 8]><html class="no-js ie ie8" lang="da-DK"><![endif]-->
<!--[if IE 9]><html class="no-js ie ie9" lang="da-DK"><![endif]-->
<!--[if IE 10]><html class="no-js ie ie10" lang="da-DK"><![endif]-->
<!--[if (gt IE 10)|!(IE)]><!--><html class="no-js" lang="da-DK"><!--<![endif]-->

<head>
<meta charset="UTF-8" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>YTRIN.GS/FRIHED</title>
<meta name="keywords" content="" />
<meta name="description" content="" />

<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />

<link rel="stylesheet" id="google-font-css" href="http://fonts.googleapis.com/css?family=Roboto+Condensed:400,400italic,700" />
<link rel="stylesheet" id="ytringsfrihed-css" href="style.css" />
</head>

<body>
<div id="wrap">
	<div id="box">
		<h1><a href="http://<?php echo strtolower($_SERVER['HTTP_HOST']) . strtolower($_SERVER['REQUEST_URI']) ?>">YTRIN.GS/FRIHED</a></h1>
		<p>&nbsp;</p>
		<h2>~ Grundlovens &sect;77 ~</h2>
		<blockquote>
			<span class="startquote">&ldquo;</span>
			<p>Enhver er berettiget til p&aring; tryk, i skrift og tale at offentligg&oslash;re sine tanker, dog under ansvar for domstolene. Censur og andre forebyggende forholdsregler kan ingensinde p&aring; ny indf&oslash;res.</p>
			<span class="endquote">&bdquo;</span>
		</blockquote>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p align="right"><i>&nbsp;</i></p>
	</div>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

<script src="cufon-yui.js"></script>
<script src="Jura_400.font.js"></script>
<script>
jQuery.noConflict();

(function($) {
	$(document).ready(function() {
		$('html').removeClass('no-js');

		Cufon.replace('h1');
	});
})(jQuery);
</script>
</body>

</html>
