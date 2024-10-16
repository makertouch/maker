<?php

namespace core;

class Router {
    protected $routes = [];  // Protected means that there is no need to access this variable/method.

    public function get($uri, $controller) {
        $this->routes[] = [
            'uri' => $uri,
            'controller' => $controller,
            'method' => 'GET'
        ];
    }

    public function post($uri, $controller) {
        $this->routes[] = [
            'uri' => $uri,
            'controller' => $controller,
            'method' => 'POST'
        ];  
    } 

    public function delete($uri, $controller) {
        $this->routes[] = [
            'uri' => $uri,
            'controller' => $controller,
            'method' => 'DELETE'
        ];  
    }

    public function patch($uri, $controller) {
        $this->routes[] = [
            'uri' => $uri,
            'controller' => $controller,
            'method' => 'PATCH' 
        ]; 
    }

    public function put($uri, $controller) {
        $this->routes[] = [
            'uri' => $uri,
            'controller' => $controller,
            'method' => 'PUT'
        ]; 
    }

    public function route($uri, $method) {
        foreach($this->routes as $route) { // Fixed variable access
            if ($route['uri'] === $uri && $route['method'] === strtoupper($method)) { 
                return require base_path($route['controller']);
            }
        }

        $this->abort();
    }

    protected function abort($code = 404) {
        abort(\core\Response::NOT_FOUND);

        require base_path("views/{$code}.php");

        die();
    }  
}

?>

<?php

/* 
function routeToController($uri, $routes) {
    if (array_key_exists($uri, $routes)) { // ($key, $array) if this $key exists in this $array
        require base_path($routes[$uri]);
    } else {
        abort(Response::NOT_FOUND);
    }
}
*/
?>
