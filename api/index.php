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

$app->post("/rate", function () use ($app) {
	$req = $app->request();
	$id = $req->post('id');
	$score = $req->post('score');
    echo json_encode( SaveRating($id, $score) );
});


$app->run();