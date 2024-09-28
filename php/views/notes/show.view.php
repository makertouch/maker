<?php require base_path('views/partial/head.php') ?>

<?php require base_path('views/partial/nav.php') ?>

<?php require base_path('views/partial/header.php') ?>

  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
 
		<p class= "mb-6">
		<a href="/notes" class="text-blue-500 underline">
			Return
			</a>
		</p>
		
   <p><?= $note['body'] ?> </p>

    </div>
  </main>

<?php require base_path('views/partial/footer.php') ?>