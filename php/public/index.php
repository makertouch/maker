
<?php 

const BASE_PATH = __DIR__ . '/../';

require BASE_PATH . 'core/functions.php'; 

spl_autoload_register(function ($class) { 
 // $class = core\Database
// str_replace($search, $replace, $subject);
   $class = str_replace('\\', '/', $class);
 
 require base_path('core/' . $class . '.php');
 });

require base_path('core/router.php');


?>
