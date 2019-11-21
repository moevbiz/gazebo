<?php
// echo getcwd(); // current working directory
?>

<?php
define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT'] . '/');
include('config.php');
require_once('assets/spyc.php');
$title = basename(__DIR__);
$data = spyc_load_file("data-" . $title . ".yml");
var_dump($data);
?>

<?php include(ROOT_PATH.'parts/header.php'); ?>

<?php include(ROOT_PATH.'parts/main.php'); ?>

<?php include(ROOT_PATH.'parts/footer.php'); ?>
