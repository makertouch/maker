<?php 

namespace core;

use PDO; // For having an eccess to the global object outside the name space: core.

class Database {

    public $connection; // Created by me or automatically by PHP.
    public $statement; 

    public function __construct($config) {  
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset={$config['charset']}";

        $this->connection = new PDO($dsn, 'makertouch_tests', 'TopMaker', [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            // (PDO::FETCH_ASSOC) is a constant property, not an instance.
        ]);
    }

    public function query($query, $params = []) { 
        $this->statement = $this->connection->prepare($query); 
        $this->statement->execute($params); 
        
        return $this;
    }

    public function get() {
        return $this->statement->fetchAll();
    }
    
    public function find() {
        return $this->statement->fetch(); 
    }



	
	public function findOrFail() {
		$result = $this->find();
		
		if (!$result) { 
		abort(Response::NOT_FOUND);
		}
		
		return $result;
	}
    
}

// Connecting is basically: new PDO(dsn) - prepare(query) - execute(optional);

?>
