<?php

require_once("datalayer.php");
require_once("Slim/Slim.php");

$app = new Slim();

$app->get("/", function () {
	send_json( GetLibrary() );
});


$app->get("/:id", function ($id) {
	send_json( GetBook($id) );
})->conditions(array('id' => '\d+'));

$app->get("/google/:isbn", function ($isbn) {
    send_json( FetchGoogle($isbn) ); 
});

$app->put("/update", function () use ($app) {
    send_json( UpdateBook($app->request()) ); 
});


$app->post("/cover", function () {
    send_json( Savecover() );
});

$app->run();