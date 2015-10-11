<?php
header('Content-type: application/json; charset=utf-8');

$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_ENCODED);
//$chekbox = filter_input(INPUT_POST, 'chekbox', FILTER_SANITIZE_ENCODED);



$answer = array(
    'email' => $email,
    'password' => $password,
    //'chekbox' => $chekbox
);

die(json_encode($answer));