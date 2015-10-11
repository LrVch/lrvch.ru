<?php
header('Content-type: application/json; charset=utf-8');

$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_EMAIL);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_ENCODED);
$textarea = filter_input(INPUT_POST, 'textarea', FILTER_SANITIZE_ENCODED);


$answer = array(
    'name' => $name,
    'email' => $email,
    'textarea' => $textarea
);

die(json_encode($answer));