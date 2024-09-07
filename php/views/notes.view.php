<?php require('partial/head.php') ?>

<?php require('partial/nav.php') ?>

<?php require('partial/header.php') ?>

  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
 
    <?php 
foreach($notes as $note) {
    echo '<a href="/note?id=' . $note['id'] . '" class="block text-blue-500 hover:underline">'
    . $note['body'] .
    '</a>';
} 
?>



    </div>
  </main>

<?php require('partial/footer.php') ?>