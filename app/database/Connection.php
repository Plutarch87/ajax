<?php 

class Connection {

	public function __construct($pdo = null)
	{	
		$this->pdo = mysqli_connect($pdo['DB_HOST'], $pdo['DB_USER'], $pdo['DB_PASS'], $pdo['DB_NAME']);
	}

}

?>