<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="google captcah">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Google Recaptcha</title>
       	<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
       	<script src='https://www.google.com/recaptcha/api.js'></script>
    </head>
    <body>
        <div class="content">
        	<form action="" method="POST">
        		<div class="g-recaptcha" data-sitekey="6LdzhgcUAAAAALP1lwpKFyg78txnhBrgoWnC80I2"></div>
        		<input type="submit">
        	</form>
					<?php 
							function curl_post($url, array $post = NULL, array $options = array()) 
							{ 
							    $defaults = array( 
							        CURLOPT_POST => 1, 
							        CURLOPT_HEADER => 0, 
							        CURLOPT_URL => $url, 
							        CURLOPT_FRESH_CONNECT => 1, 
							        CURLOPT_RETURNTRANSFER => 1, 
							        CURLOPT_FORBID_REUSE => 1, 
							        CURLOPT_TIMEOUT => 4, 
							        CURLOPT_POSTFIELDS => http_build_query($post) 
							    ); 
							    $ch = curl_init(); 
							    curl_setopt_array($ch, ($options + $defaults)); 
							    if( ! $result = curl_exec($ch)) 
							    { 
							        trigger_error(curl_error($ch)); 
							    } 
							    curl_close($ch); 
							    return $result; 
							} 

            	if( isset( $_POST['g-recaptcha-response'] ) ) {

          			$verify_url = 'https://www.google.com/recaptcha/api/siteverify';
          			$secret_key = '6LdzhgcUAAAAABONFW6jdIAWCEx17_XSiLIQ4NKf';
          			$response = $_POST['g-recaptcha-response'];

          			// echo $_POST['g-recaptcha-response'];

          			$result = curl_post( $verify_url, array(
          				'secret' => $secret_key,
          				'response' => $response
          			));

          			echo '<pre>'; print_r( $result ); echo '</pre>';

            	}

					?>

        </div>
        <script>
            (function($, window, document) {


							// var result = myAjaxRequest({
							// 	method: 'POST',
							// 	url: 'https://www.google.com/recaptcha/api/siteverify',
							// 	secret: '',
							// 	response: '',
							// 	"g-recaptcha": '6LdzhgcUAAAAALP1lwpKFyg78txnhBrgoWnC80I2'
							// });

							// console.log(result);

							function myAjaxRequest(obj){
								var r = new XMLHttpRequest();
								r.open(obj.method, obj.url, true);
								r.onreadystatechange = function () {
									if (r.readyState != 4 || r.status != 200) return;
									return r.responseText;
								};
								r.send("");
							}

            })(jQuery, window, document);
        </script>
    </body>
</html>