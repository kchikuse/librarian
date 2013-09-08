<?php

require_once("datalayer.php");
require_once("Slim/Slim.php");

$app = new Slim();

$app->get("/", function () {
	echo json_encode( GetLibrary(), JSON_NUMERIC_CHECK );
});

$app->get("/:id", function ($id) {
	echo json_encode( GetBook($id), JSON_NUMERIC_CHECK );
})->conditions(array('id' => '\d+'));

$app->put("/cover", function () use ($app) {
    $req = $app->getInstance()->request();
    $putdata = $req->getBody();
    echo json_encode( SaveCover($data) );
});

$app->put("/update", function () use ($app) {
    echo json_encode( UpdateBook($app->request()) ); 
});


$app->run();