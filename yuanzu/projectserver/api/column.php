<?php
    header("Access-Control-Allow-Origin:*");
	include("../connect.php");
	
	$sql = "select * from `column`";
	$sql1="select id,img3,strong,activity,price from `column`";
	$sql2="select img1,img2 from `column` where id=1";
	$res=mysql_query($sql);
	$res1=mysql_query($sql1);
	$res2=mysql_query($sql2);
	$arr=array();
	$arr2=array();
	
	while($row1=mysql_fetch_assoc($res1)){
		array_push($arr,$row1);//此处有多条，需要放到数组里面，如果不push的话，只会有循环的最后一条；
      
	}
	  $arr2["product"]=$arr;
	while($row2=mysql_fetch_assoc($res2)){
		$arr2["column"]=$row2;//此处只有一条数据
	}
	
	echo json_encode($arr2);
	mysql_close();
?>