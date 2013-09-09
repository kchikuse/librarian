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
		'Title' 	  => $obj->put('Title'),			
		'Author' 	  => $obj->put('Author'),
		'Rating' 	  => $obj->put('Rating'),	
		'Publisher'   => $obj->put('Publisher'),	
		'PageCount'	  => $obj->put('PageCount'),	
		'Genre' 	  => $obj->put('Genre') ?: '',	
		'Notes' 	  => $obj->put('Notes') ?: '',
		'Subtitle' 	  => $obj->put('Subtitle') ?: '',
		'HasRead' 	  => toBool($obj->put('HasRead')),
		'Description' => $obj->put('Description') ?: ''
	))->set_expr('LastUpdate', "datetime('now','localtime')");
	
	return $book->save();	
}

function SaveCover($data) {
	throw new Exception("Not implemented....", 1);	
}

function toBool($val) {
	return mb_strtolower($val) === 'true' ? true : false;
}

?>