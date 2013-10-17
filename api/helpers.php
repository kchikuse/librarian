<?php

function sendJson($data) {
	echo json_encode( $data, JSON_NUMERIC_CHECK );
}

function put(& $src, $key) {
	return trim ( $src->put($key) ) ?: '';
}

function el($item, $array, $implode = false) {
    if ( ! isset($array[$item]) || $array[$item] == '') {
        return '';
    }

    $el = $array[$item];

    return $implode ? implode(',', $el) : $el;
}

function parse_bool($val) {
	return mb_strtolower($val) === 'true' ? true : false;
}

function is_legal_file($file) {
    $extensions = array('jpg','png','gif','jpeg', 'bmp');
    $ext = strtolower( pathinfo( $file, PATHINFO_EXTENSION ) );
    return in_array( $ext , $extensions );
}

function gen_uuid() {
    return sprintf( '%04x%04x%04x%04x%04x%04x%04x%04x',
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
        mt_rand( 0, 0xffff ),
        mt_rand( 0, 0x0fff ) | 0x4000,
        mt_rand( 0, 0x3fff ) | 0x8000,
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
    );
}

function gen_file($file) {
    return gen_uuid() . '.' . pathinfo($file, PATHINFO_EXTENSION);
}

?>