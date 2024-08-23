<?php 

require 'functions.php'; 

// require 'router.php';

// connect to MySQL database.

$dsn = "mysql:host=p3nlmysql139plsk.secureserver.net;port=3306;dbname=makertouch_tests;charset=utf8mb4;";

$pdo = new PDO($dsn, 'makertouch_tests', 'TopMaker');

$statement = $pdo->prepare("SELECT * FROM posts");
$statement->execute();

$posts = $statement->fetchAll(PDO::FETCH_ASSOC);

foreach ($posts as $post) {
    echo "<li>" . $post['titles'] . "</li>"; 
}

?>
