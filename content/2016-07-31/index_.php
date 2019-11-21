<?php
// echo getcwd(); // current working directory
?>
<?php
define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT'] . '/');
include(ROOT_PATH.'config.php');
require_once(ROOT_PATH.'assets/spyc.php');
$title = basename(__DIR__);
$data = spyc_load_file("data-" . $title . ".yml");
?>
<?php include(ROOT_PATH.'parts/header.php'); ?>

<header>
  <nav>
  <?php
    $count = 0;
    foreach ($dirs as $dir):
      $dir_title = basename($dir);
      $count++;
      $dots = str_repeat("●", $count);
    ?>
    <a href="<?php echo '../content/'.$dir_title; ?>" <?php if ($title == $dir_title) {echo 'class="current"';} ?>><?php echo $dots; ?></a>
  <?php endforeach; ?>
  </nav>

  <p><?php echo $data['date']; ?></p>
  <a href="<?php echo $data['loc-link']; ?>"><?php echo $data['location']; ?></a>

  <ul>
  <?php foreach ($data['artists'] as $artist): ?>
  <li><?php echo $artist; ?></li>
  <?php endforeach; ?>
</ul>
</header>

<main>
  <?php
  $image_folder = __DIR__ . '/images';
  $images = array_slice(scandir($image_folder), 2);
  $count = 0;
  foreach ($images as $image):
    $count++;
    $src = '/images' . '/' . $image;
    list($width, $height) = getimagesize(__DIR__.$src);
?>
<figure tabindex="0" <?php if ($width >= $height){echo 'class="wide"';}?>>
    <img src="<?php echo $title . $src ?>">
    <figcaption><?php echo pathinfo($image)["basename"]; ?><span><?php echo sprintf('%02d', $count); ?></span></figcaption>
  </figure>
  <?php endforeach; ?>
</main>
<section>
  <p>
  <?php foreach ($data['weather'] as $line) {echo $line . '<br>';} ?>
  </p>
</section>

<?php include(ROOT_PATH.'parts/main.php'); ?>

<?php include(ROOT_PATH.'parts/footer.php'); ?>
