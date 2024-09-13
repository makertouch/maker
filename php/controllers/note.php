<?php

$title = "Note"; 
$currentUser = 1;
$id = $_GET['id'];


$config = require 'config.php';

$db = new Database($config['database']); // connects to the database.
$note = $db->query('select * from notes where id= ?', [$id])->findOrFail();  // $note = [ "id" => "1", "body" => "message", "user_id" => "1"]

// if there was no return $this in the query method:
// $db = new Database($config['database']);
// $db->query('SELECT * FROM notes WHERE id = ?', [$id]); 
// $note = $db->findOrFail();


if($note['user_id'] != $currentUser) { // using != sign for 1 can be in any type, same with ==. 
	abort(Response::FORBIDDEN);
}


require 'views/note.view.php'; // the view link will always be in the end.

?>


