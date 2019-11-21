<?php
/*
	switch ($_SERVER["SCRIPT_NAME"]) {
		case "/php-template/about.php":
			$CURRENT_PAGE = "About";
			$PAGE_TITLE = "About Us";
			break;
		case "/php-template/contact.php":
			$CURRENT_PAGE = "Contact";
			$PAGE_TITLE = "Contact Us";
			break;
		default:
			$CURRENT_PAGE = "Index";
			$PAGE_TITLE = "Welcome to my homepage!";
	}
*/
?>

<?php
  $dirs = array_filter(glob(ROOT_PATH.'content/*'), 'is_dir');
  $titles = array_filter(glob('content/*'), 'is_dir');
  // print_r($titles);
  foreach(glob('content/*', GLOB_ONLYDIR) as $diir) {
    $dirname = basename($diir);
    // echo $dirname;
  }
  /*
  foreach ($dirs as $dir) {
  switch ($_SERVER["SCRIPT_NAME"]) {
    case $dir:
      $current_page = $dir;
      $page_title = $dir;
      break;
    default:
      $current_page = $dir;
      $page_title = $dir;
  }
  }
  */
?>
