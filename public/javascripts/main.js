//主页
$(document).ready(function(){
	listen();
	popularBtnClicked();
	getTags();

});

function listen(){
	//字符码,不是汉字
	let username= getCookie('user');
	//获取本来就存在的但是没有显示出来的元素
	let loginHTML = $('.login').html();
	let hanzi = unescape(unescape(username));
	//初始化header的用户名
	$('.login').html(hanzi + loginHTML);

	//监听提问按钮。 点击后显示提问窗口并且模糊化页面其它部分
	$('#askSpan').click(function(){
		$('#newDebateDialog').css('display','block');
		if(!document.getElementById('coverDiv')){
			var coverDiv = $('<div></div>');
			$(coverDiv).attr('id','coverDiv');
			$("body").append(coverDiv);
		}
		$('#coverDiv').css('display','block');
	});

	//监听提问框的取消和叉叉
	$('#ddCancelTwo').click(function(){
		cancel();
	});
	$('#ddCancelOne').click(function(){
		cancel();
	});
		
	//提问框的 提交按钮 的监听事件	
	$('#release').on('click',function(){
		let question = {'title':null,'description':null,'tags':null,'time':null,'questionProducer':null};		
		question.title = $('#textareaOne').val();
		question.description = $('#textareaTwo').val();
		question.tags = $('#textareaThree').val();

		$.post('/api/newquestion',question,function(data){
			console.log('问题发送: ' + data);
		});
		cancel();
	});

	//导航栏用户名元素实现hover效果
	$('#header .login').hover(function(){
		$('#loginHover').css('display','block');
	},function(){
		$('#loginHover').css('display','none');
	});

	//导航栏用户名下面的元素的hover效果
	//...

	//导航栏 退出的退出功能.
	$('#loginHover #logout').click(function(){
		$.get('/api/logout',function(){
			window.location.href='/';
		})
	});
	//导航栏 个人用户: 根据cookie的user改变a的href属性
	$('#userPageBtn').attr('href','/users/' + username);

	//最热问题, 从数据库获取内容,动态添加.
	$('#popularBtn').click(popularBtnClicked);
	
	//最新提问
	$('#newBtn').click(newBtnClicked);
}

function popularBtnClicked(){
	$('#content-grid-pop').css('display','flex');
	$('#content-grid-new').css('display','none');
	//热门问题 添加下划线,表示当前选择
	$('#popularBtn').addClass('buttonUnderline');
	$('#newBtn').removeClass('buttonUnderline');
	//没有子元素,也就是还没有渲染,进行渲染
	if($('#content-grid-pop').children().length == 0){
		addPopQuestion();
	}
}

function newBtnClicked(){
	$('#content-grid-pop').css('display','none');
	$('#content-grid-new').css('display','flex');
	$('#popularBtn').removeClass('buttonUnderline');
	$('#newBtn').addClass('buttonUnderline');
	if($('#content-grid-new').children().length == 0){
		addNew();
	}
}


//动态添加最热问题的数据到页面上.
function addPopQuestion(){
	$.post('/api/getquestion',{'arr': 'popular'},function(res){
		console.log(res.status);
		let contentGridPop = $('#content-grid-pop');
		dynamicAddDOM(contentGridPop,res.data);
	});
}

//动态添加最新问题数据到页面上;
function addNew(){
	$.post('/api/getquestion',{'arr': 'new'},function(res){
		console.log(res.status);
		let contentGridNew = $('#content-grid-new');
		dynamicAddDOM(contentGridNew,res.data);
	});
}

function dynamicAddDOM(parentDiv,data){
	data.forEach(function(ele){
		//初始化DOM元素.
		var itemLi = $('<li class="itemLi"></li>');
		var itemImage = $('<img class="itemImg" src="">');
		var liContent = $('<div class="li-content"></div>');
		var itemTitle = $('<a class="itemTitle" href="" target="_blanket"></a>');
		var itemDes = $('<p class="itemDes"></p>');		
		var questionProducer = $('<span class="questionProducer"></span>');
		var itemTags = $('<span class="itemTags"></span>');
		//根据数据,填充DOM元素
		if(ele.avatar){
			//不知为何,加上这句为请求/api/uploads/avatars/.... 然后not found error.
			itemImage.attr('src',ele.avatar); 
		}
		itemTitle.attr('href','/question/' + ele['_id']);
		itemTitle.attr('target','_blank');
		itemTitle.text(ele.title);
		itemDes.text(ele.description);			
		questionProducer.text(ele.questionProducer);
		ele.tags.forEach(function(ele){
			itemTag = $('<span class="itemTag"></span>');
			itemTag.text(ele);
			itemTags.append(itemTag);
		});
		//将独立的DOM元素链接起来
		liContent.append(itemTitle);
		liContent.append(itemDes);
		liContent.append(questionProducer);
		liContent.append(itemTags);
		itemLi.append(itemImage);
		itemLi.append(liContent);
		parentDiv.append(itemLi);
	});
}

//用Ajax获取tags数据.
function getTags(){
	$.get('/api/gettags',function(res){
		console.log(res.status);		
		addTags(res.data);
	});
	
}

//动态更新标签数据到DOM中
function addTags(data){
	let tagSection = $('#tagSection');
	data.forEach(function(ele){
		let span = $('<span class="tags"></span>');
		span.text(ele.tagName);
		tagSection.append(span);
	});
}



//监听时 使用的方法
function cancel(){
	$('#newDebateDialog').css('display','none');
	$('#coverDiv').css('display','none');
	location.reload(true);
};

//得到document的cookie里的 键对应的值;
function getCookie(key){
	let cookieString = document.cookie;
	let cookieArr = cookieString.split(';');
	let cookieObj = {}; 
	cookieArr.forEach(function(ele,index){
		let temp = ele.split('=');
		cookieObj[temp[0]] = temp[1];
	});
	return cookieObj[key];
}