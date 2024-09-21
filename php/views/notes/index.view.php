<?php require('views/partial/head.php') ?>

<?php require('views/partial/nav.php') ?>

<?php require('views/partial/header.php') ?>

  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

 <ul>
    <?php 
foreach($notes as $note) {
    echo '<a href="/note?id=' . $note['id'] . '" class="block text-blue-500 hover:underline">'
    . $note['body'] .
    '</a>';
} 
?>
</ul>

<div style="margin-top: 6px;">
<a href="/notes/create" style="color: blue; cursor: pointer; font-weight: bold;">
   Add note 
</a>
</div>
    </div>
  </main>

<?php require('views/partial/footer.php') ?>