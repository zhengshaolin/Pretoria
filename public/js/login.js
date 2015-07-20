var Login = {
    login: function() {
        $.ajax({
            type: 'post',
            url: ''+Editor.baseUrl+'login',
            data: {
                user: $('.name').val(),
                pass: $('.password').val()
            },
            success: function(data) {
            	console.log(data);
                if (data.access_token) {
                	localData.set('token',data.access_token);
                	localData.set('username',$('.name').val());
                    //localStorage.token = '554f4b95b3a3cf29e2a0ee43-89afa2366bf2fae2f47ff358a2b3080d';
                    window.location.href = "index.html";
                } else {
                    $('.error').empty().html("登录有问题");
                }
            },
            error: function(data) {
                //console.log(data);
                $('.error').empty().html(data.responseText);
            }
        })
    },
    /*
     
     */
    findUser: function() {
        console.log("find user method start");

        //查看所有用户
        $.ajax({
            type: 'post',
            url: ''+Editor.baseUrl+'user/all',
            dataType: 'json',
            headers: {
                'Access-Token': localData.get('token')
            },
            success: function(data) {
            	console.log(data);
                if (data.length == 0) {
                    $('.e_showUser').append("暂无其他用户");
                } else {
                    $('.e_showUser').empty();
                    var html = '',
                        pillsnot = '<td><a href="#" class="userStop"> 启用</a></td>',
                        pillsPassword = '<td><a href="#" class="userChangePwd">更改密码</a></td>'
                    pillsok = '<td><a href="#" class="userOk"> 停用</a></td>';
                    for (var i in data) {
                        html += '<tr trid = "' + i + '"><td user_id=' + data[i]._id + '>' + data[i].user + '</td>' + (!data.enabled ? pillsnot : pillsok) + pillsPassword + '</tr>';
                    }
                    $('.e_showUser').append(html)
                }

            },
            error: function(data) {
                console.log(data);
            }
        })
        $(document).on('click', '.userStop', function(e) {
            e.preventDefault()
            var that = $(this);
            $.ajax({
                type: 'post',
                url: ''+Editor.baseUrl+'user/enable',
                data: {
                    user_id: that.parent().prev().attr('user_id'),
                    enable: 1
                },
	            dataType: 'json',
	            headers: {
	                'Access-Token': localData.get('token')
	            },
                success: function() {
                    alert('更改成功！');
                    that.html('停用').attr('class', 'userOk')
                }
            })
        })
        $(document).on('click', '.userOk', function(e) {
            e.preventDefault()
            var that = $(this);
            $.ajax({
                type: 'post',
                url: ''+Editor.baseUrl+'user/enable',
                data: {
                    user_id: that.parent().prev().attr('user_id'),
                    enable: 0
                },
	            dataType: 'json',
	            headers: {
	                'Access-Token': localData.get('token')
	            },
                success: function() {
                    alert('更改成功！')
                    that.html('启用').attr('class', 'userStop')
                }
            })
        })
        var userinput = '';
        $(document).on('click', '.userChangePwd', function(e) {
            e.preventDefault()
            var that = $(this);
            if (that.html() == '更改密码') {
                userinput = $('<input type="password">')
                that.before(userinput);
                that.html('确认');
            } else {
                $.ajax({
                    url: ''+Editor.baseUrl+'user/changepass',
                    type: 'post',
                    data: {
                        user_id: that.parent().siblings().first().attr('user_id'),
                        pass: userinput.val()
                    },
		            dataType: 'json',
		            headers: {
		                'Access-Token': localData.get('token')
		            },
                    success: function() {
                        alert('更改用户密码成功');
                        that.html('更改密码')
                        userinput.remove();
                        userinput = ''
                    }
                })
            }
        })
    },
    /*
     
     */
    changePwd: function(oldpass,newpass) {
        
            if ($('.newpassword1').val() != $('.newpassword').val()) {
                alert('两次输入的新密码不一致！')
            } else {
                $.ajax({
                    type: 'post',
                    url: ''+Editor.baseUrl+'user/changepass',
                    data: {
                        old_pass: oldpass,
                        new_pass: newpass
                    },
		            dataType: 'json',
		            headers: {
		                'Access-Token': localData.get('token')
		            },
                    success: function(data) {
                        alert('更改密码成功！');
                        $('#userModel').modal('hide');
                    },
                    error:function(data) {
                    	console.log(data);
                    }
                })
            }

    },
    /*
	<div>
		<div>用户名：<input type="text"  placeholder="请输入用户名" class="name" style="padding:5px 0"></div>
		<div style="margin-top:20px">密码：&nbsp;&nbsp;&nbsp;<input type="password" placeholder="请输入密码" class="password" style="padding:12px 0;height:18px;"></div>
		<button class="submit">提交</button>
	</div>
	*/
    registerUser: function() {
        //注册新用户
        $.ajax({
            type: 'post',
            url: ''+Editor.baseUrl+'user/create',
            data: {
                user: $('.r_name').val(),
                pass: $('.r_password').val()
            },
		    headers: {
		                'Access-Token': localData.get('token')
		    },
            dataType: 'json',
            success: function(data) {
            	console.log(data);
            	alert('恭喜你，成功注册新用户');
            	$('#registerModel').modal('hide');
            }
        })

    },
    conformLogin: function() {
        //验证登陆
        window.onload = function() {
            if (localStorage.token) {

            } else {
                window.location.href = "login.html"
            }
        }
    }

};

//登录
$('.e_login_submit').on('click', function(e) {
    var user = $('.name').val(),
        pass = $('.password').val();
    if (user == '' && pass == '') {
        $('.error').empty().html("请输入用户名或者密码");
    } else {
        Login.login();
    }
});


$('body').on('click','.e_registerUser',function() {
	var user = $('.r_name').val(),
     	pass = $('.r_password').val();
    if (user == '' || pass == '') {
        $('.error').empty().html("请输入用户名或者密码");
    } else {
        Login.registerUser();
    }
});

$('body').on('click','.e_registerUser_button',function() {
	$('#registerModel').modal('show');
});


//
$('.e_user').on('click', function() {
    var key = $(this).attr('key');
    if (key == "cpw") {
        $('#e_cau').addClass('hidden');
        $('#e_cpw').removeClass('hidden');
        $('#userModel').modal('show');
    } else if (key == "cau") {
        $('#e_cau').removeClass('hidden');
        $('#e_cpw').addClass('hidden');
        $('#userModel').modal('show');
    } else if (key == "quite") {
        Editor.quite();
    }
});

$('body').on('click', '.e_changepass', function() {
	var oldpass = $('.password').val(),
		newpass = $('.newpassword').val(),
		newpass1 = $('.newpassword1').val();
	if ( oldpass == '' || newpass == '' || newpass1 == ''){
		alert("请输入密码");
	}else if(newpass != newpass1){
		alert("请确认新密码一致性!")
	}else{
		Login.changePwd(oldpass,newpass);
	}
});


$('body').on('click', '.e_cau_button', function() {
    Login.findUser();
});