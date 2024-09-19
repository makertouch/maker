<?php

$title = "My Notes"; 
// we call this index

$config = require 'config.php';

$db = new Database($config['database']); // connects to the database.

$notes = $db->query('select * from notes where user_id = 1')->get();

require 'views/notes/index.view.php'; // the view link will always be in the end.

?>
