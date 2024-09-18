<?php

$title = "Note"; 
$currentUser = 1;
$id = $_GET['id'];


$config = require 'config.php';

$db = new Database($config['database']); // connects to the database.
$note = $db->query('select * from notes where id= ?', [$id])->findOrFail();  // $note = [ "id" => "1", "body" => "message", "user_id" => "1"]

authorize($note['user_id'] != $currentUser);

require 'views/note.view.php'; // the view link will always be in the end.

?>


