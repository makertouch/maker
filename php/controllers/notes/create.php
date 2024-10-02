<?php

$config = require base_path('config.php');

$db = new Database($config['database']); 

$errors = [];

require base_path('Validator.php');

	
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	
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
	

	view('notes/create.view.php', [
		'title' => 'Create Note',
		'errors' => $errors
		]);


?>