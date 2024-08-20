<?php
$uri = parse_url($_SERVER['REQUEST_URI'])['path'];


$routes = [
    "/" => "controllers/index.php", 
    "/about" => "controllers/about.php",
    "/contact" => "controllers/contact.php"
];



routeToController($uri, $routes);

function routeToController($uri, $routes) {
if (array_key_exists($uri, $routes)) {   // ($key, $array)  if this $key exists in this $array
	
	require $routes[$uri];
	
} else {

abort(404);
	
}
}

function abort($code) {
	
	http_response_code($code); // lating php know.
	
	require  "views/404.php";
	
	die();
}

?>