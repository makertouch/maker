<?php

$currentUser = 1;
$id = $_GET['id'];


$config = require base_path('config.php');

$db = new Database($config['database']); // connects to the database.
$note = $db->query('select * from notes where id= ?', [$id])->findOrFail();  // $note = [ "id" => "1", "body" => "message", "user_id" => "1"]

authorize($note['user_id'] != $currentUser);

view('notes/show.view.php', [
    'title' => 'Note',
    'note' => $note
    ]);

?>


