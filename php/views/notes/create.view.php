<?php require base_path('views/partial/head.php') ?>

<?php require base_path('views/partial/nav.php') ?>

<?php require base_path('views/partial/header.php') ?>

  <main>
 

<form method="POST">  
<div style="width: 500px;">
        <div class="col-span-full" style="padding-left: 20px; padding-top: 20px;">
          <label for="body" class="block text-sm font-medium leading-6 text-gray-900">Body</label>
          <div class="mt-2" style="width: 400px;">
            <textarea 
					  id="body"
					  name="body" 
					  rows="3"
					  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> <?= isset($_POST['body']) ? $_POST['body'] : '' ?> </textarea>
          </div>
<?php if (isset($errors['body'])) { ?>
<p class="text-red-500 text-xs mt-2"> <?= $errors['body'] ?> </p>
<?php }
	?>
          
        </div>

  <div class="mt-6 flex items-center justify-end gap-x-6" style="margin-right: 80px;">
    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
  </div>
	</div>
	
</form>




  </main>

<?php require base_path('views/partial/footer.php') ?>