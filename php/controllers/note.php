<?php

$title = "Note"; 


$config = require 'config.php';

$db = new Database($config['database']); // connects to the database.

$id = $_GET['id'];

$notes = $db->query('select * from notes where id = ?', [$id])->fetchAll();


require 'views/notes.view.php'; // the view link will always be in the end.

?>


