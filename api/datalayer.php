<?php

require_once('idiorm.php');
require_once('helpers.php');
require_once('Google/Google_Client.php');
require_once('Google/contrib/Google_BooksService.php');

ORM::configure(array(
    'id_column' => 'Id',
    'connection_string' => 'sqlite:./library.sqlite'
));

function GetLibrary() {
	return ORM::forTable('Books')->orderByDesc('Rating')->findArray();
}

function GetBook($id) {
	if($id == "0") {
		return BlankBook();
	}

	$book = ORM::forTable('Books')->findOne($id);
	$book->HasRead = ( bool ) $book->HasRead;
	return $book->as_array();
}

function BlankBook() {
	$today = date('Y-m-d h:m:s');
	return array (
		'Id' => 0,  
        'ISBN' => '',        
        'Rating' => 0,   
        'Notes' => '',            
        'Genre' => '',
        'Author' => '',
        'Title' => '',
        'PageCount' => 0,
        'Subtitle' => '',
        'Publisher' => '', 
        'HasRead' => false,
        'Description' => '', 
        'DateAdded' => $today,
        'LastUpdate' => $today,            
        'DatePublished' => '',
        'Thumbnail' => 'blank.jpg'  
	);
}

function UpdateBook($o) {
	$id = intval($o->put('Id'));

	if($id === 0) {
	   $book = ORM::forTable('Books')->create();
	   $book->set_expr('DateAdded', "datetime('now','localtime')");
	}
	else {
		$book = ORM::forTable('Books')->findOne($id);
	}

	$book->set(array(
		'ISBN' 		  => put($o, 'ISBN'),	
		'Genre' 	  => put($o, 'Genre'),	
		'Notes' 	  => put($o, 'Notes'),			
		'Title' 	  => put($o, 'Title'),			
		'Author' 	  => put($o, 'Author'),		
		'Subtitle' 	  => put($o, 'Subtitle'),	
		'Publisher'   => put($o, 'Publisher'),				
		'Description' => put($o, 'Description'),
		'Rating' 	  => put($o, 'Rating') ?: 0,
		'PageCount'	  => put($o, 'PageCount') ?: 0,			
		'HasRead' 	  => parse_bool(put($o, 'HasRead')),	
		'Thumbnail'   => put($o, 'Thumbnail') ?: 'blank.jpg',	
	))->set_expr('LastUpdate', "datetime('now','localtime')");

	return $book->save() ? $book->id() : false;
}

function SaveCover() {
	$name = $_FILES['file']['name'];
    $tmp  = $_FILES['file']['tmp_name'];
    $size = $_FILES['file']['size'];

    if($size > 0 && is_legal_file($name)) {
      $file = gen_file( $name );      
      move_uploaded_file( $tmp, '../covers/'. $file );
      return $file;
    }
    return false;
}

function FetchGoogle($isbn){
	$client = new Google_Client();
	$client->setDeveloperKey('AIzaSyCC0x-_xpXp-kujqXu53LZwjhfan5w_UTY');
	$client->setApplicationName("Home_Library");
	$service = new Google_BooksService($client);

	$params = array(
		'maxResults' => 1,
		'printType' => 'books',	
		'projection' => 'full',	
	);

	$volumes = $service->volumes;
	$results = $volumes->listVolumes('isbn:' . $isbn, $params);

    if(!array_key_exists('items', $results)) {
    	return array();
    }

	$info = $results['items'][0]['volumeInfo'];
	return array (
		'Id' => 0,  
		'Rating' => 0,
        'ISBN' => $isbn,  
        'HasRead' => false,    
        'Title' => el('title', $info),  
        'Subtitle'  => el('subtitle', $info),           
        'PageCount' =>el('pageCount', $info),              
        'Publisher' => el('publisher', $info),         
        'Author' => el('authors', $info, true),
        'Genre'  => el('categories', $info, true),
        'Description' => el('description', $info),           
        'DatePublished' => el('publishedDate', $info),
        'Thumbnail' => array_key_exists('imageLinks', $info) ? el('thumbnail', $info['imageLinks']) : ''
	);
}

?>