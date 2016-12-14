<?php 

include 'database/Connection.php';
include 'database/QueryBuilder.php';
include 'http/Router.php';
include 'config.php';

$query = new QueryBuilder(new Connection($app['config']['database']));

?>