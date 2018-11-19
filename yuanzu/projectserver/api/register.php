<?php
	header("Access-Control-Allow-Origin:*");
    include("../connect.php");
    
    $tel=$_POST["tel"];
    $email=$_POST["email"];
    $password=$_POST["password"];
    $birthday=$_POST["birthday"];
    $tel_register=$_POST["tel_register"];
    
    $product = array();
   
    $sql="insert into register (tel,email,password,birthday) values ('$tel','$email','$password','$birthday')";
    $sql_tel="select * from register where tel='$tel_register'";
    
    $res=mysql_query($sql);
    $res_tel=mysql_query($sql_tel);

    //验证是否已被占用
    while($row = mysql_fetch_assoc($res_tel)){
		$product["product"] = $row;
	}
    if($product["product"]){
		$product["tel"] = "registered";//已被占用
	}
	
    //注册成功
    if($res){
        $product["isSucc"]="success";
    }
    
	
    echo json_encode($product);
    
?>

