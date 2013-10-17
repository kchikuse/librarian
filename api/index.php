<?php

require_once("datalayer.php");
require_once("Slim/Slim.php");

$app = new Slim();

$app->get("/", function () {
	sendJson( GetLibrary() );
});


$app->get("/:id", function ($id) {
	sendJson( GetBook($id) );
})->conditions(array('id' => '\d+'));

$app->get("/google/:isbn", function ($isbn) {
    sendJson( FetchGoogle($isbn) ); 
});

$app->put("/update", function () use ($app) {
    sendJson( UpdateBook($app->request()) ); 
});


$app->post("/cover", function () {
    sendJson( Savecover() );
});

$app->run();