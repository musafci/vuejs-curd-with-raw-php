<?php

$conn = new mysqli('localhost','root','','vue_raw_php_curd');

if($conn->connect_error) {
    die('Database Not Connected..!!');
}

$response = array('error' => false);


$action     = '';
$id         = '';
$username   = '';
$email      = '';
$mobile     = '';


if(isset($_GET['action'])) {
    $action = $_GET['action'];
}


//Data Retrive (Api)
if($action == 'read') {
    $result = $conn->query('SELECT * FROM `users`');
    $users = array();

    while($row = $result->fetch_assoc()){
        array_push($users, $row);
     }

    $response['users'] = $users;
}


//Data Create (Api)
if($action == 'create') {

    $username   = $_POST['username'];
    $email      = $_POST['email'];
    $mobile     = $_POST['mobile'];
   
	$result = $conn->query("INSERT INTO `users` (`username`, `email`, `mobile`) VALUES ('$username', '$email', '$mobile') ");


    if($result) {
        $response['message'] = 'User Added Successfully..!';
    } else {
        $response['error']   = true;
        $response['message'] = 'Could Not Insert User..!';
    }
}

//Data Update (Api)
if($action == 'update') {

    $id         = $_POST['id'];
    $username   = $_POST['username'];
    $email      = $_POST['email'];
    $mobile     = $_POST['mobile'];
   
	$result = $conn->query("UPDATE `users` SET `username` = '$username', `email` = '$email', `mobile` = '$mobile' WHERE `id` = '$id'");
	
	if($result){
		$response['message'] = "User updated successfully";
	} else{
		$response['error'] = true;
		$response['message'] = "Could not update user";
	}
}


//Data Delete (Api)
if($action == 'delete'){
	$id = $_POST['id'];
	
	$result = $conn->query("DELETE FROM `users` WHERE `id` = '$id'");
	
	if($result){
		$response['message'] = "User deleted successfully";
	} else{
		$response['error'] = true;
		$response['message'] = "Could not delete user";
	}

}


$conn->close();
header('Content-type: application/json');
echo json_encode($response);
die();