<?php

use core\Database;

$currentUser = 1;
$id = $_GET['id'];

$config = require base_path('config.php');
$db = new Database($config['database']); // connects to the database.


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
$note = $db->query('select * from notes where id= ?', [$id])->findOrFail();  // $note = [ "id" => "1", "body" => "message", "user_id" => "1"]

authorize($note['user_id'] != $currentUser); // No need die() because it ends the code inside the function.

$db->query('delete from notes where id= ?', [$id]);

header('location: /notes'); // Telling the browser go to the /notes URI.
die(); // So the code wont continue to run after sending to another path.

} else {


$note = $db->query('select * from notes where id= ?', [$id])->findOrFail();  // $note = [ "id" => "1", "body" => "message", "user_id" => "1"]

authorize($note['user_id'] != $currentUser);

view('notes/show.view.php', [
    'title' => 'Note',
    'note' => $note
    ]);
}
?>


