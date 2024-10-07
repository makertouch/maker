<?php


$config = require base_path('config.php');

$db = new core\Database($config['database']); // connects to the database.

$notes = $db->query('select * from notes where user_id = 1')->get();

view('notes/index.view.php', [
    'title' => 'My Notes',
    'notes' => $notes
    ]);

?>


