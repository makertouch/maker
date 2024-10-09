
<?php 

const BASE_PATH = __DIR__ . '/../';

require BASE_PATH . 'core/functions.php'; 

spl_autoload_register(function ($class) {   // $class = core\Database
                                         
// The point of spl_autoload_register is to automatically load the class file when a class is instantiated.
                                         
 $result = str_replace('\\', '/', $class); // str_replace($search, $replace, $subject);
 
 require base_path($result . '.php');
 });

require base_path('core/router.php');


?>
