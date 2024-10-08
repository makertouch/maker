<?php

use core\Database; //use core\Database; references Database in the core namespace without loading it.

$config = require base_path('config.php');
$db = new Database($config['database']); // connects to the database.

$notes = $db->query('select * from notes where user_id = 1')->get();

view('notes/index.view.php', [
    'title' => 'My Notes',
    'notes' => $notes
    ]);

?>


