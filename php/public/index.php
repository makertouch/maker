
<?php 

const BASE_PATH = __DIR__ . '/../';

require BASE_PATH . 'core/functions.php'; 

spl_autoload_register(function ($class) { 
<<<<<<< HEAD
 require base_path('core/' . $class . '.php');
=======
 require base_path($class . '.php');

>>>>>>> dfdcb789758aa7aca1baf026d398752014ba1c59
 });

require base_path('core/router.php');


?>
