<?php
if(strtolower($_SERVER['HTTP_HOST']) != 'ytrin.gs' || strtolower($_SERVER['REQUEST_URI']) != '/frihed') {
	header('HTTP/1.1 301 Moved Permanently');
	header('Location: https://ytrin.gs/frihed');
	exit();
}
?>

<!DOCTYPE html>
<html lang="da-DK">

<head>
	<meta charset="utf-8" />
	<title>YTRIN.GS/FRIHED</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Grundlovens &sect;77 - Enhver er berettiget til p&aring; tryk, i skrift og tale at offentligg&oslash;re sine tanker, dog under ansvar for domstolene. Censur og andre forebyggende forholdsregler kan ingensinde p&aring;ny indf&oslash;res." />
	<link rel="preload" href="/assets/webfonts/noto-serif-v8-latin-400.woff2" as="font" crossorigin />
	<link rel="preload" href="/assets/webfonts/noto-serif-v8-latin-700.woff2" as="font" crossorigin />
	<?php
	$file = 'assets/css/ytrings.min.css';
	$filesize = filesize($file);
	if ($filesize < 4000) {
		$filecontent = file_get_contents($file);
		echo '<style data-filesize="' . $filesize . '">' . str_replace('url(../webfonts/', 'url(/assets/webfonts/', $filecontent) . '</style>';
	} else {
		echo '<link rel="stylesheet" href="' . $file . '" />';
	}
	?>
</head>

<body>
<main class="site-content">
	<h1>YTRIN.GS/FRIHED</h1>
	<h2>~ Grundlovens &sect;77 ~</h2>
	<blockquote>
		<img src="/assets/images/quote-open.svg" width="48px" height="48px" alt="" class="quote-open" />
		<p>Enhver er berettiget til p&aring; tryk, i skrift og tale at offentligg&oslash;re sine tanker, dog under ansvar for domstolene. Censur og andre forebyggende forholdsregler kan ingensinde p&aring;ny indf&oslash;res.</p>
		<img src="/assets/images/quote-close.svg" width="48px" height="48px" alt="" class="quote-close" />
	</blockquote>
</main>
</body>

</html>
