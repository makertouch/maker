<?php

use core\Database; 

$config = require base_path('config.php');
$db = new Database($config['database']); // creates an instance of core\Database.

$notes = $db->query('SELECT * FROM notes WHERE user_id = 1')->get();

view('notes/index.view.php', [
    'title' => 'My Notes',
    'notes' => $notes
]);

?>
