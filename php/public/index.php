
<?php 

const BASE_PATH = __DIR__ . '/../';

require BASE_PATH . 'core/functions.php'; 

spl_autoload_register(function ($class) {   // $class = core\Database
                                                                              
 $result = str_replace('\\', '/', $class); // str_replace($search, $replace, $subject);
 
 require base_path($result . '.php');
 });

require base_path('core/router.php');


?>
