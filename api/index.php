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
    $test = json_decode($app->getInstance()->request()->getBody());

    echo print_r($test);//json_encode( SaveRating($id, $score) );
});


$app->run();