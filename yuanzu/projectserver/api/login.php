<?php
    include("../connect.php");
	header("Access-Control-Allow-Origin:*");
	
	$username = $_POST["username"];
	$password = $_POST["password"];

	$sql="select * from register where tel='$username' and password='$password'";
    
    $res=mysql_query($sql);
    
    
    $product = array();
    
	while($row = mysql_fetch_assoc($res)){
		$product["product"] = $row;
	}
	//如果$row有东西，代表找到了当前这条数据
	if($product["product"]){
		$product["code"] = 1;
	}else{
		$product["code"] = 0;
	}

	echo json_encode($product);
    
    
    
	
	

?>