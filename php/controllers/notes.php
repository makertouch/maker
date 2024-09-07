<?php

$title = "My Notes"; 


$config = require 'config.php';

$db = new Database($config['database']); // connects to the database.

$notes = $db->query('select * from notes where user_id = 1')->fetchAll();

require 'views/notes.view.php'; // the view link will always be in the end.

?>


