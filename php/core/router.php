<?php

namespace core;

class Router {
    protected $routes = [];  // Protected means that there is no need to access this variable/method.

    public function add($method, $uri, $controller) {
        $this->routes[] = [
            'uri' => $uri,
            'controller' => $controller,
            'method' => $method
        ];
    }

    public function get($uri, $controller) {

        $this->add('GET', $uri, $controller);  

    }

    public function post($uri, $controller) {

        $this->add('POST', $uri, $controller);  

    } 

    public function delete($uri, $controller) {

        $this->add('DELETE', $uri, $controller);  

    }

    public function patch($uri, $controller) {

        $this->add('PATCH', $uri, $controller);  

    }

    public function put($uri, $controller) {

        $this->add('PUT', $uri, $controller);  

    }

    public function route($uri, $method) {
        foreach($this->routes as $route) { 
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
