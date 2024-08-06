<html>
  <head>
    <title>Untitled</title>
	
	<style>
	body {
	font-family: Arial;
		}
	</style>	

  </head>
  <body>

 	<?php
	  $books = [
	  [
	  "name" => "Hary Potter",
	  "releaseYear" => 1968,
	  "author" => "Philip K",
	  "purchaseUrl" => "https://google.com"
	  ] , [
	  "name" => "Mario",
	  "releaseYearI-598259/11" => 2024,
	  "author" => "Andy Weir",
	  "purchaseUrl" => "https://google.com"
	  ] , [
	  "name" => "Prison Break",
	  "releaseYear" => 2024,
	  "author" => "Andy Weir",
	  "purchaseUrl" => "https://google.com"
	  ] , [
	  "name" => "Lost",
	  "releaseYear" => 2004,
	  "author" => "Chuck loory",
	  "purchaseUrl" => "https://google.com"
	  ]
	  ];

	
	function filter($items, $function) {

		$filteredItems = [];

		foreach ($items as $item) {
		if ($function($item)) {	  

			$filteredItems[] = $item;

	}}
	return $filteredItems;
};
	  
	$filteredBooks = filter($books, function($book) {
	return $book["releaseYear"] >= 2000;
	});

	foreach ($filteredBooks as $book) { ?> 
	<a href="<?= $book["purchaseUrl"] ?>"> <?= $book["name"] ?> </a>
	<div> <?= $book["releaseYear"] ?> </div>
	<div> <?= $book["author"] ?> </div>

 <?php	} ?>	  
	  
	

	  
  </body>
</html>
