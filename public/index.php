<?php

include '../app/bootstrap.php';

$uri = trim($_SERVER['REQUEST_URI'], '/ajax');

// die(var_dump($uri));

require Router::load('routes.php')->direct($uri);