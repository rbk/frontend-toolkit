<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>MailChimp</title>
</head>
<body>
<?php


header('Access-Control-Allow-Origin: *');
header("Cache-Control: no-cache, must-revalidate");     
header('Access-Control-Allow-Methods: POST');

define('API_KEY', 'bf031d4722d64461e7bd79eda016550a-us8');
define('LIST_ID', 'd5f106a6ab');

$data = [
    'email'     => 'richard@gurustu.co',
    'status'    => 'subscribed',
    'firstname' => '',
    'lastname'  => ''
];

// $result = syncMailchimp( $data );
// if( $result ) {
//     echo 'yes';
// } else {
//     echo 'no';
// }

// echo '<pre>'; print_r( json_decode($result) ); echo '</pre>';


class SyncMailchimp {
    
    public $errors = array();
    public $api_key = '';
    public $list_id = '';
    public $email = '';

    public function set_api_key( $api_key ) {
        $this->api_key = $api_key;
    }
    public function set_list_id( $list_id ) {
        $this->list_id = $list_id;
    }
    public function set_email( $email ) {
        $this->email = $email;
    }

    public function check_api_key( ) {
        if( !empty($this->api_key) ){
            $this->set_error( 'API key missing.' );
        }
    }
    public function check_list_id( ) {
        if( !empty($this->list_id) ){
            $this->set_error( 'List ID missing.' );
        }
    }

    public function set_error( $msg ) {
        array_push($this->errors, $msg);
    }

    public function show_errors(){
        echo '<pre>'; print_r( $this->errors ); echo '</pre>'; 
    }

    public function set_test_errors( $array = '' ) {
        $this->errors = $array;
    }

    public function is_email_empty( $email ) {
        if( empty( $email ) ) {
            return 0;
        } else {
            return 1;
        }
    }

    public function subscribe_address( ){


    }
    public function unsubscrube_user( ) {

    }

    public function sign_up_user( $data ) {

    }

    public function prepare_data( $email ) {
        
        $memberId = md5(strtolower($email));
        $dataCenter = substr($this->api_key,strpos($this->api_key,'-')+1);
        $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;
        
        $json = json_encode([
            'email_address' => $data['email'],
            'status'        => $data['status'], // "subscribed","unsubscribed","cleaned","pending"
            'merge_fields'  => [
                'FNAME'     => $data['firstname'],
                'LNAME'     => $data['lastname']
            ]
        ]);
    }

    public function send_email_to_mailchimp( ){
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);                                                                                                                 
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return $httpCode;
    }

}

$mc = new SyncMailchimp();
$mc->set_api_key( 'bf031d4722d64461e7bd79eda016550a-us8' );
$mc->set_list_id( 'd5f106a6ab' );
$mc->set_email( 'richard@gurustu.co' );
$mc->subscribe_address();

$mc->sign_up_user(array(
    'email'     => 'richard@gurustu.co',
    'status'    => 'subscribed',
    'firstname' => '',
    'lastname'  => ''
));


// $mc->unsubscribe_user( 'richard@gurustu.co' );
$mc->show_errors();


function syncMailchimp($data) {

    $errors = array();

    if( ! API_KEY )
        array_push($errors, 'No API key.');

    if( ! LIST_ID )
        array_push($errors, 'No list id.');

    if( empty( $data['email'] ) ) {
    
        array_push($errors, 'No email address');
    
    } else {

        if( ! filter_var( $data['email'], FILTER_VALIDATE_EMAIL) )
            array_push($errors, 'Invalid email address');

    }

    if( count($errors) > 0 ) {
        echo '<ol class="mc-errors-found">';
        foreach( $errors as $error ) {
            echo '<li>'.$error.'</li>';
        }
        echo '</ol>';
        return;
    }

    $apiKey = API_KEY;
    $listId = LIST_ID;
    $memberId = md5(strtolower($data['email']));
    $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
    $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;
    $json = json_encode([
        'email_address' => $data['email'],
        'status'        => $data['status'], // "subscribed","unsubscribed","cleaned","pending"
        'merge_fields'  => [
            'FNAME'     => $data['firstname'],
            'LNAME'     => $data['lastname']
        ]
    ]);
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);                                                                                                                 
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $httpCode;
}
?>
	
</body>
</html>