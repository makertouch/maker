<?php
$title = 'Create a Note';


$config = require 'config.php';

$db = new Database($config['database']); 

require 'Validator.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	
	$errors = [];
	
	
	if(!Validator::string($_POST['body'], 1, 100)) {
	$errors['body'] = 'A body of no more than 100 characters  is required';
	}
	
	if(empty($errors)){
		$db->query('INSERT INTO notes (body, user_id) VALUES(?, ?)', [
		 $_POST['body'], 
		 1
	]);
}; 

	}	
	

require ("views/notes/create.view.php");

?>
