
<?php 

const BASE_PATH = __DIR__ . '/../';

require BASE_PATH . 'functions.php'; 

function myAutoloader($class) {
    require base_path($class . '.php');
}

spl_autoload_register('myAutoloader');


require base_path('router.php');

//test

?>
