
<?php 

require 'functions.php'; 

// require 'router.php';

// connect to database, and execute a query.

class Database {

    public $connection; // Created by me or automaticlly by PHP.

    public function __construct() {

        $dsn = "mysql:host=p3nlmysql139plsk.secureserver.net;port=3306;dbname=makertouch_tests;charset=utf8mb4;";

        $this->connection = new PDO($dsn, 'makertouch_tests', 'TopMaker');
       
    }

    public function query($query) {

        $statement = $this->connection->prepare($query);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}
 

$db = new Database(); // connects to the database.

$posts = $db->query("select * from posts"); // calls a mothod which gives all the posts.


foreach ($posts as $post) {
    echo "<li>" . $post['titles'] . "</li>"; 
}

?>
