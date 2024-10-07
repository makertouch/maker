
<?php 

const BASE_PATH = __DIR__ . '/../';

require BASE_PATH . 'core/functions.php'; 

spl_autoload_register(function ($class) { 
 // $class = core\Database
// str_replace($search, $replace, $subject);
   $result = str_replace('\\', '/', $class);
 
 require base_path($result . '.php');
 });

require base_path('core/router.php');


?>
