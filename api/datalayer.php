<?php

require_once('idiorm.php');

ORM::configure(array(
    'id_column' => 'Id',
    'connection_string' => 'sqlite:./library.sqlite'
));

function GetLibrary() {
	return ORM::forTable('Books')->orderByDesc('rating')->findArray();
}

function GetBook($id) {
	$book = ORM::forTable('Books')->findOne($id);

	$book->HasRead = (bool) $book->HasRead;

	return $book->as_array();
}

function UpdateBook($obj) {
	$id = $obj->put('Id');

	$book = ORM::forTable('Books')->findOne($id);

	$book->set(array(
		'ISBN' 		  => $obj->put('ISBN'),
		'Notes' 	  => $obj->put('Notes'),
		'Title' 	  => $obj->put('Title'),	
		'Genre' 	  => $obj->put('Genre'),
		'Author' 	  => $obj->put('Author'),
		'Rating' 	  => $obj->put('Rating'),
		'LastUpdate'  => date('Y-m-d H:i:s'),				
		'Subtitle' 	  => $obj->put('Subtitle'),
		'Publisher'   => $obj->put('Publisher'),	
		'PageCount'	  => $obj->put('PageCount'),
		'Description' => $obj->put('Description'),
		'HasRead' 	  => toBool($obj->put('HasRead'))
	));
	
	return $book->save();	
}

function SaveCover($data) {
	throw new Exception("Not implemented....", 1);	
}

function toBool($val) {
	return mb_strtolower($val) === 'true' ? true : false;
}

?>