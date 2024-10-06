<?php
// webhook.php

// Define your secret for security (if set in GitHub)
$secret = 'your_webhook_secret'; // Optional

// Get the payload from the request
$payload = file_get_contents('php://input');
$headers = getallheaders();

// Verify the webhook secret (optional)
if (isset($headers['X-Hub-Signature'])) {
    $hash = 'sha1=' . hash_hmac('sha1', $payload, $secret);
    if (!hash_equals($hash, $headers['X-Hub-Signature'])) {
        http_response_code(403);
        exit('Access denied');
    }
}

// Change to your project directory and run git pull
$output = null;
$return_var = null;
$projectDir = '/app/htdocs/demo/app/htdocs/'; // Adjust this as needed
 /

// Execute the git pull command
exec("cd $projectDir && git pull origin main 2>&1", $output, $return_var);

// Log the output for debugging
file_put_contents('webhook.log', implode("\n", $output), FILE_APPEND);

// Check for errors
if ($return_var !== 0) {
    http_response_code(500);
    exit('Error pulling code');
}

// Respond to GitHub
http_response_code(200);
echo 'Updated successfully';
