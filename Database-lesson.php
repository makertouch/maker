<?php 

class Database {

    public $connection; // Created by me or automaticlly by PHP.

    public function __construct($config) {  // No need for $this->config because it's inside the constructor and there is no use for the other properties.
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset={$config['charset']}";

        $this->connection = new PDO($dsn, 'makertouch_tests', 'TopMaker', [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            //(PDO::FETCH_ASSOC) is a constant property not an instance.

        ]);
       
    }

    public function query($query, $params = []) { // if $params doesn't have value it will be [].
        
        $statement = $this->connection->prepare($query); // Here you pass a query.
        $statement->execute($params); // execute() is not empty because of the placeholder.

        return $statement;
    }
} 
    // end of Database Class

require 'functions.php'; 

$config = require 'config.php';

$db = new Database($config['database']); // connects to the database.

$id = $_GET['id'];

$query = "select * from posts where id = ?"; // ? is a placeholder that prepare() understands.

$posts = $db->query($query, [$id])->fetch(); // calls a mothod which gives all the posts.

dd($posts);

?>

// form lesson
<form method="POST">

    <div style="margin-left: 28px; margin-top: 24px;">

    <label for="body" style="display: block"> Description </label>
    <textarea name="body" id="body"> </textarea>

    <div>  
    <button type="submit"> Create </button>
    </div>

    </div>
</form>