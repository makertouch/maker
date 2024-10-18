<?php 

function urlIs($value) {
return $_SERVER['REQUEST_URI'] === $value; // returns only if it's true.
}                                          // REQUEST_URI starts from [/this part]. vs GET after /?id=[this part]

function dd($value) {
echo '<pre>';
var_dump($value);
echo '</pre>';
die();
}

function abort($code) {
	
	http_response_code($code); // lating php know.
	if($code === 404) {
	require  base_path("views/404.php");
	} else if ($code === 403) {
	require base_path("views/403.php");
	}
	die();
}

function authorize($condition, $status = core\Response::FORBIDDEN) {
if($condition) {   
abort($status);
}
};

function base_path($path) {
	return BASE_PATH . $path;
}





function view($path, $attribute = []) {

	extract($attribute);

	require base_path('views/' . $path);
}

?>
