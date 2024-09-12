<?php
$uri = parse_url($_SERVER['REQUEST_URI'])['path'];

/* we don't use $uri = $_SERVER['REQUEST_URI']; 
because the address might contain a query after: /about?foo=bar,
and we want just the /about. */

$routes = [
    "/" => "controllers/index.php", 
    "/about" => "controllers/about.php",
	"/notes" => "controllers/notes.php",
	"/note" => "controllers/note.php",
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


?>