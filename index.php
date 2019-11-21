<?php

define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT'] . '/');
$dirs = array_filter(glob(ROOT_PATH.'content/*'), 'is_dir');
foreach ($dirs as $dir):
    echo $dir;
endforeach;


// $request = $_SERVER['REDIRECT_URL'];
//
// switch ($request) {
//     case '/' :
//         require __DIR__ . '/views/index.php';
//         break;
//     case '' :
//         require __DIR__ . '/views/index.php';
//         break;
//     case '/about' :
//         require __DIR__ . '/views/about.php';
//         break;
//     default:
//         require __DIR__ . '/views/404.php';
//         break;
// }
