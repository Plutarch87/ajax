<?php

class QueryBuilder {

	public function __construct(Connection $connection)
	{
		$this->connection = $connection;
	}

	public function getAll($table)
	{
		$statement = $this->connection->pdo->prepare("select * from {$table}");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_CLASS);
	}
}

?>