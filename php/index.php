
<?php 

require 'functions.php'; 

// require 'router.php';

// connect to database, and execute a query.

class Database {

    public $connection;

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
 עכ

$db = new Database();
$posts = $db->query("select * from posts");


foreach ($posts as $post) {
    echo "<li>" . $post['titles'] . "</li>"; 
}

?>
