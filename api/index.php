<?php

require_once("datalayer.php");
require_once("Slim/Slim.php");

$app = new Slim();

$app->get("/", function () {
	echo json_encode( GetLibrary() );
});

$app->get("/:id", function ($id) {
	echo json_encode( GetBook($id) );
});


$app->run();