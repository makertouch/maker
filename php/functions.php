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

?>