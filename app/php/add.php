<?php
header('Content-type: application/json; charset=utf-8');

$project = filter_input(INPUT_POST, 'project', FILTER_SANITIZE_EMAIL);
$url = filter_input(INPUT_POST, 'url', FILTER_SANITIZE_ENCODED);
$textarea = filter_input(INPUT_POST, 'textarea', FILTER_SANITIZE_ENCODED);


$answer = array(
    'project' => $project,
    'url' => $url,
    'textarea' => $textarea
);

die(json_encode($answer));