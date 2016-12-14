<?php 

class Router
{
	protected $routes = [];

	public static function load($file)
	{
		$router = new self;

		require "/../".$file;

		return $router;
	}

	public function define($routes)
	{
		$this->routes = $routes;
	}

	public function direct($uri)
	{
		if (array_key_exists($uri, $this->routes)):

			return '../app/'.$this->routes[$uri];

		endif;

		throw new Exception ('404');
	}

}
