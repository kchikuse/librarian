<?php

require_once('rb.php');

R::setup('sqlite:library.sqlite');

function GetLibrary() {
	return R::getAll('SELECT * FROM Books ORDER BY Rating DESC'); 
}

function GetBook($id) {
	return R::getRow('SELECT * FROM Books WHERE Id = :id', array(':id' => $id)); 
}

function SaveRating($id, $score) {
	R::exec('UPDATE Books SET Rating = :score WHERE Id = :id', 
		array(':id' => $id, ':score' => $score));

	return $score;
}

function SaveCover($data) {
	throw new Exception("Not implemented....", 1);	
}

?>