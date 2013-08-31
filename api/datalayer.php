<?php

require_once('rb.php');

R::setup('sqlite:library.sqlite');

function GetLibrary() {
	return R::getAll('SELECT * FROM Books ORDER BY Rating DESC'); 
}

function GetBook($id) {
	return R::getRow('SELECT * FROM Books WHERE Id = :id', array(':id' => $id)); 
}

?>