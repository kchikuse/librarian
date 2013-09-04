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

$app->put("/rate", function () use ($app) {
    $req = $app->getInstance()->request();    
    $data = json_decode($req->getBody());
    echo json_encode( SaveRating($data->id, $data->score) );
});


$app->run();