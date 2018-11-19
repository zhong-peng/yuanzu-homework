require(["config"],function(){
	require(["jquery","header","footer","template","tools"],function($,header,footer,template,tools){
		$("header").load("/html/component/header.html",function(){
			console.log("end");
			header.welcome();
		});
		$("footer").load("/html/component/footer.html",function(){
			console.log("end");
		});
        
        
        
        
        //操作完成后再取cookie：点击加减、移除；
        var table=tools.$("#cart_p_list");
		var str=tools.cookie("cart");//取cookie

		var json=JSON.parse(str);//[{id:3},[]]
		//console.log(json);
//		if(!json.length){
		cookie_change();
		function cookie_change(){
			for(var i = 0; i < json.length; i++){
	        	var table=tools.$("#cart_p_list");
				var tr = document.createElement("tr");
				tr.className="tr_td";
				tr.innerHTML=`<td>
								<a href="">
									<img src="${json[i]._img}" alt="" />
								</a>
								<strong>${json[i].strong}</strong>
								<p>规格：<span>8号</span></p>
							</td>
							<td>
								<strong>${json[i].price}</strong>
							</td>
							<td>
								<form action="" id="${json[i].id}">
									<a class="reduce_p" href="javascript:;">-</a>
									<input type="text" name="" id="" class="amount" value="${json[i].num}" />
									<a class="add_p" href="javascript:;">+</a>
								</form>
							</td>
							<td>
								<a href="javacript:;" class="delete">移除</a></br></br>
								<input class="_input" type="checkbox" checked = "${json[i].checked}"/>
							</td>`
				table.appendChild(tr);
			}
		}
        
        
        //移除
        $("#cart_p_list").on("click",".delete",function(){
        	console.log(1111111)
        	var str1=tools.cookie("cart");//取cookie
			var json=JSON.parse(str1);
        	//var iditem = $(this).parent().siblings().last().html();
        	//找id
        	var goods=$(this).parent().siblings().eq(0).children().eq(1).html();
        	//console.log(goods)
        	for(var i = 0; i < json.length; i++){
        		if(json[i].strong==goods){
        			json.splice(i,1);
        		}
        	}
        	var cart_str=JSON.stringify(json);
        	$.cookie("cart",cart_str,{path:"/"});
        	
        	$(this).parent().parent().remove();
//      	table.innerHTML="";
//			tools.cookie("cart",cart_str);
//			cookie_change();
//			console.log(111111111222223);
//      	window.location.reload(true);
        	
        });
        
        //加减数量
//      var amount =$('.amount').val();

        $(".tr_td").on('click',function(e){
        	//console.log(6666666666)
        	var src= e.target,
        	    amount = $(this).find('.amount').val(),
        	    str1=tools.cookie("cart"),//取cookie
		        json=JSON.parse(str1),
		        goods=$(this).find("strong").html();
	       // console.log(amount);
	    	//console.log(goods);
	    	
	    	for(var i = 0; i < json.length; i++){
        		if(json[i].strong==goods){
        			if(src.className === 'add_p' || src.className === 'reduce_p'){
		    			if(src.className === 'add_p'){
			    			$(this).find('.amount').val(++amount);
			    			json[i].num++;
			    			
		    		    }
			    		if(src.className === 'reduce_p'){
			    			 $(this).find('.amount').val(amount<2 ? 1 : --amount);
			    			 json[i].num--;
			    		}
			    		var cart_str=JSON.stringify(json);
        				$.cookie("cart",cart_str,{path:"/"});
        				//console.log(4444444444);
        				//console.log(cart_str);
		    		}
        		}
        	}
	    	
    		
    			
        })
        
        //全选、单选
        var n=0;
		var items=tools.$("._input");
		$("#allinput").change(function(){
			if(this.checked){
				for(var i=0;i<items.length;i++){
					items[i].checked=true;
				}
				n=items.length;
			}else{
				for(var i = 0; i < items.length; i++){
					items[i].checked = false;
				}
				n = 0;
		
			}
		});
		for(var i = 0; i < items.length; i++){
			items[i].onchange = function(){
				this.checked ? n++ : n--;
				//console.log(n);
				if(n === items.length){
					allinput.checked = true;
				}else{
					allinput.checked = false;
				}	
			}
		}
		
		
		
		//计算价钱
		class Gouwuche{
			constructor(){
				var str=tools.cookie("cart");//取cookie
		        var json=JSON.parse(str);
		        this.checkbox=$("._input");//找到需要的DOM对象
		        console.log( this.checkbox);
			}
			calc(isthis){
				
				//找到所有处于选中状态的checkbox
				//console.log(44444444);
				var str=tools.cookie("cart");//取cookie
		        var json=JSON.parse(str);
		        var data;
		        var isthis = isthis;
		        var allamount=0;
		        var allprice=0;
		        json.forEach((curr)=>{
		        	if(curr.strong === $(this).parents('.tr_td').find('strong').first().text()){
		        		data = curr;
		        	}
		        })
				data.checked ? data.checked = '' : data.checked = 'checked';
				$.cookie('cart', JSON.stringify(json), {path: '/'});
				console.log(data)
		        json.forEach((curr)=>{
		        	if(curr.checked){
		        		allamount += curr.num;
		        		allprice += curr.price * curr.num;
		        	}
		        })
		        isthis.count(allamount,allprice);
//				for(var i = 0;i < this.checkbox.length; i++){
//					if($(this).prop("checked")){
//						json[i]["checked"] = 1;
//					}else{
//						json[i]["checked"]=0;
//					}
//				
//				}

//				$(this).prop('checked') ? $(this).prop('checked')
				
				//修改cookie后存
//				var cart_str=JSON.stringify(json);
//  	         $.cookie("cart",cart_str,{path:"/"});
//				//取出修改后的cookie，用于计算总价；
//				var str = tools.cookie("cart");//取cookie
//		        var json=JSON.parse(str);
//		        
//		        for(var i=0;i<json.length;i++){
//		        	
//		        	if(json[i].checked==1){
//		        		allprice +=json[i].price*json[i].num;
//		        		console.log("allprice");
//		        	}
//		        }
//		        $("#allprice").val(allprice);
				

			}
			addEvent(){
				var _this = this;
				this.allamount = 0;
				this.allprice = 0;
				this.checkbox.on("change",function(){
					//_this.calc();
					_this.calc.call(this,_this);
				})
			}count(allamount,allprice){
				$('.tongji').text(allprice);
				$('#allprice').text(allprice);
				$('dd.amount').text(allamount);
			}
		}
		
		var gouwuche = new Gouwuche();
		gouwuche.addEvent();
		 
		console.log(1)
        
        
		
	})
		
})


//		var str = "";

//str += `<tr class="tr_td">
//			            <td>
//							<a href="">
//								<img src="${json[i]._img}" alt="" />
//							</a>
//							<strong>${json[i].strong}</strong>
//							<p>规格：<span>8号</span></p>
//						</td>
//						<td>
//							<strong>${json[i].price}</strong>
//						</td>
//						<td>
//							<form action="">
//								<a href="">-</a>
//								<input type="text" name="" id="" value="${json[i].num}" />
//								<a href="">+</a>
//							</form>
//						</td>
//						<td>
//							<a href="">移除</a>
//						</td>
//			       </tr>`;



//      $("#cart_p_list").on("click",".reduce_p",function(){
//      	var str1=tools.cookie("cart");//取cookie
//			var json=JSON.parse(str1);
//      	//var iditem = $(this).parent().siblings().last().html();
//      	//找id
//      	var goods=$(this).parent().siblings().eq(0).children().eq(1).html();
//      	for(var i = 0; i < json.length; i++){
//      		if(json[i].strong==goods){
//      			json[i].num--;
//      			console.log(9999)
//      			console.log(json);
//      			
//      		}
//      	}
//      	var cart_str=JSON.stringify(json);
//      	$.cookie("cart",cart_str,{path:"/"});
//      	var value_input=$(this).next("input").val();
//      	value_input--;
//          $(this).next("input").val()=value_input;
//      });
//      
//      $("#cart_p_list").on("click",".add_p",function(){
//      	var str1=tools.cookie("cart");//取cookie
//			var json=JSON.parse(str1);
//      	//var iditem = $(this).parent().siblings().last().html();
//      	//找id
//      	var goods=$(this).parent().siblings().eq(0).children().eq(1).html();
//      	for(var i = 0; i < json.length; i++){
//      		if(json[i].strong==goods){
//      			json[i].num++;
//      			console.log(9999)
//      			console.log(json);
//      			
//      		}
//      	}
//      	var cart_str=JSON.stringify(json);
//      	$.cookie("cart",cart_str,{path:"/"});
//      	var value_input=$(this).next("input").val();
//      	value_input++;
//          $(this).next("input").val()=value_input;
//      });
//      
		
        
        
        
        /*json[i].num = 
        			json[i].flag = 0??1
        			win
        			table:null*/
        //全选反选；
        //此处才能对dom元素进行操作；
       /* $(".reduce_p").click(function(){
        	var num_cart=$(".reduce_p+input").val();
        	num_cart--;
        	$(".reduce_p+input").val()=num_cart;
        	
        	for(i=0;i<json.length;i++){
        		
        	}
        })*/
       
       
		
		
		
		//全选、反选
		/*var allprice;
		class Gouwuche{
			constructor(){
				this.checkbox=$(".tr_td");
			}
			calc(){
				this.checkbox.each(function(){
					if($(this).attr("checked")){
						allprice+=$(this).children().eq(1).children().eq(0).html();
						
					}
				})
			}
			addEvent(){
				this.checkbox.on("change",function(){
					this.calc();
				}.bind(this))
			}
		}*/
		
//}






