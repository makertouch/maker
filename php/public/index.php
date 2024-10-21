
<?php 

const BASE_PATH = __DIR__ . '/../';

require BASE_PATH . 'core/functions.php'; 

spl_autoload_register(function ($class) {   // $class = core\Database
                                         // spl just recognize inatances and pass it on
                                                                              
 $result = str_replace('\\', '/', $class); // str_replace($search, $replace, $subject);
 
 require base_path($result . '.php');
 });

$router = new \core\Router(); // We use \ before the Core if we are inside an existing name space.

$routes = require base_path('routes.php');
$uri = parse_url($_SERVER['REQUEST_URI'])['path'];
$method = $_POST['_method'] ?? $_SERVER['REQUEST_METHOD']; // $_POST['_method'] isset and not null. no need :

// $method = isset($_POST['_method']) ? $_POST['_method'] : $_SERVER['REQUEST_METHOD'];  
  				var_dump($method);
			   var_dump($uri);

$router->route($uri, $method);


?>
