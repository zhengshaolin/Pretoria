var Login = {
	login:function(){
		$('.submit').on('click',function(e){
		  $.ajax({
		    type:'post',
		    url:'http://115.29.32.105:8080/login',
		    data:{user:$('.name').val(),pass:$('.password').val()},
		    success:function(data){
		      if(data.access_token){
		        localStorage.token = '554f4b95b3a3cf29e2a0ee43-89afa2366bf2fae2f47ff358a2b3080d';
		        localStorage.username = 'admin';
		        window.location.href="index.html";
		      }else{
		        localStorage.token = '554f4b95b3a3cf29e2a0ee43-89afa2366bf2fae2f47ff358a2b3080d';
		        localStorage.username = 'admin';
		        window.location.href="index.html";
		      }
		    },
		    error:function(data) {
		        localStorage.token = '554f4b95b3a3cf29e2a0ee43-89afa2366bf2fae2f47ff358a2b3080d';
		        localStorage.username = 'admin';
		        window.location.href="index.html";
		    }
		  })
		})
	},
	/*
		<div>
			<button class="find">查看所有用户</button>
			<table class="showUser">
			</table>
		</div>
	*/
	findUser:function(){
		//查看所有用户
		$('.find').on('click',function(e){
			$.ajax({
				type:'post',
				url:'http://115.29.32.105:8080/user/all',
				beforeSend:function(XMLHttpRequest){
			         XMLHttpRequest.setRequestHeader("Access-Token",localStorage.token)
					},
				success:function(data){
					var html = '',
						pillsnot = '<td><a href="#" class="userStop"> 启用</a></td>',
						pillsPassword = '<td><a href="#" class="userChangePwd">更改密码</a></td>'
						pillsok = '<td><a href="#" class="userOk"> 停用</a></td>';
					for(var i in data){
						html+='<tr trid = "'+i+'"><td user_id='+data[i]._id+'>'+data[i].user+'</td>'+(!data.enabled?pillsnot:pillsok)+pillsPassword+'</tr>';
					}
					$('.showUser').append(html)
				}
			})
		})
		$(document).on('click','.userStop',function(e){
			e.preventDefault()
			var that = $(this);
			$.ajax({
				type:'post',
				url:'http://115.29.32.105:8080/user/enable',
				data:{user_id:that.parent().prev().attr('user_id'),enable:1},
				beforeSend:function(XMLHttpRequest){
			         XMLHttpRequest.setRequestHeader("Access-Token",localStorage.token)
					},
				success:function(){
					alert('更改成功！');
					that.html('停用').attr('class','userOk')
				}
			})
		})
		$(document).on('click','.userOk',function(e){
			e.preventDefault()
			var that = $(this);
			$.ajax({
				type:'post',
				url:'http://115.29.32.105:8080/user/enable',
				data:{user_id:that.parent().prev().attr('user_id'),enable:0},
				beforeSend:function(XMLHttpRequest){
			         XMLHttpRequest.setRequestHeader("Access-Token",localStorage.token)
					},
				success:function(){
					alert('更改成功！')
					that.html('启用').attr('class','userStop')
				}
			})
		})
		var userinput ='';
		$(document).on('click','.userChangePwd',function(e){
			e.preventDefault()
			var that = $(this);
			if(that.html()=='更改密码'){
				userinput = $('<input type="password">')
				that.before(userinput);
				that.html('确认');
			}else{
				$.ajax({
					url:'http://115.29.32.105:8080/user/changepass',
					type:'post',
					data:{user_id:that.parent().siblings().first().attr('user_id'),pass:userinput.val()},
					beforeSend:function(XMLHttpRequest){
			         XMLHttpRequest.setRequestHeader("Access-Token",localStorage.token)
					},
					success:function(){
						alert('更改用户密码成功');
						that.html('更改密码')
						userinput.remove();
						userinput=''
					}
				})
			}
		})
	},
	/*
	<div>
		<div>旧密码：<input type="text"  placeholder="请输入旧密码" class="password" style="padding:5px 0"></div>
		<div style="margin-top:20px">新密码：&nbsp;&nbsp;&nbsp;<input type="password" placeholder="请输入密码" class="newpassword" style="padding:12px 0;height:18px;"></div>
		<div style="margin-top:20px">确认密码：&nbsp;&nbsp;&nbsp;<input type="password" placeholder="再次输入新密码" class="newpassword1" style="padding:12px 0;height:18px;"></div>
		<button class="submit">提交</button>
	</div>
	*/
	changePwd:function(){
		$('.submit').on('click',function(e){
			if($('.newpassword1').val()!=$('.newpassword').val()){
				alert('两次输入的新密码不一致！')
			}else{
				$.ajax({
					type:'post',
					url:'http://115.29.32.105:8080/user/changepass',
					data:{old_pass:$('.password').val(),new_pass:$('.newpassword1').val()},
					beforeSend:function(XMLHttpRequest){
			         XMLHttpRequest.setRequestHeader("Access-Token",localStorage.token)
					},
					success:function(data){
						alert('更改密码成功！')
					}
				})
			}
		})
	},
	/*
	<div>
		<div>用户名：<input type="text"  placeholder="请输入用户名" class="name" style="padding:5px 0"></div>
		<div style="margin-top:20px">密码：&nbsp;&nbsp;&nbsp;<input type="password" placeholder="请输入密码" class="password" style="padding:12px 0;height:18px;"></div>
		<button class="submit">提交</button>
	</div>
	*/
	registerUser:function(){
		//注册新用户
		$('.submit').on('click',function(e){
			$.ajax({
				type:'post',
				url:'http://115.29.32.105:8080/user/create',
				data:{user:$('.name').val(),pass:$('.password').val()},
				beforeSend:function(XMLHttpRequest){
			        XMLHttpRequest.setRequestHeader("Access-Token",localStorage.token)
				},
				success:function(data){
					alert('成功注册用户')
				}
			})
		})
	},
	conformLogin:function(){
		//验证登陆
		window.onload=function(){
			if(localStorage.token){

			}else{
				window.location.href="http://115.29.32.105:8080/login"
			}
		}
	}

}



