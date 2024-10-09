
<?php 

const BASE_PATH = __DIR__ . '/../';

require BASE_PATH . 'core/functions.php'; 

spl_autoload_register(function ($class) {   // $class = core\Database
// The all point of spl_autoload_register is to indentify the $class(OOP);
 $result = str_replace('\\', '/', $class); // str_replace($search, $replace, $subject);
 
 require base_path($result . '.php');
 });

require base_path('core/router.php');


?>
