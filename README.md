# 问吧

---

>   就像它的名字,这是一个问答网站. 
>   首先我不得不承认,这个网站没什么亮点,毕竟它不是一个商业产品,而只是我造的**一个轮子**,是我技术学习路上的**一个脚印**,更是我接来的的暑假找工作的**一把利剑**.

#界面预览
---

![image](/screenshots/1.png)
![image](/screenshots/2.png)
![image](/screenshots/3.png)
![image](/screenshots/4.png)
![image](/screenshots/5.png)

#技术栈
---

*   Node.js
*   Expree.js
*   MongoDB
*   jQuery
*   Pug(Jade)


#技术选型的理由
---

* 为什么Express.js(...Node.js) ?
    *   很火，社区庞大，体系成熟.而且作为前端er，这不是第一选择吗？
* 为什么jQuery ? 
    *   考虑直接上Vue.js 但是毕竟Express.js才开始学，Vue.js也刚过了一边文档，跟着敲了敲例子，没什么实战经验。不想两面受敌。等项目完工的差不多的时候，再考虑用Vue全家桶重构一遍前端部分。
* 为什么Pug(Jade) ? 
    *   官方推荐的不说，之前为Hexo写主题的时候用的就是它：简洁，缩进党（Pythoner表示很亲切）。只是模板而已......不值得纠结太多。
* 为什么MongoDB ?
    *   已经了解了MySQL这种“关系型数据库管理系统”，还不会NoSQL，所以就趁这次机会学习一门NoSQL，感受一下两种不同的数据库系统的区别.而且前端er表示很亲切.

#本地运行
---

**前提条件：**
*安装好node.js（npm 会同时被安装好）、安装好mongoDB并运行服务)*

`git clone https://github.com/shuirong/Ask-Answer.git`

`cd Ask-Answer`

`npm install`

`node ./bin/www`

#项目日程(待完成)
---

*   回答点赞
*   关注其他用户
*   登录注册页的背景特效
*   回答框的支持markdown语法,及输入框的放大效果
*   问题页面的回答内容的格式
*   主页的回答按钮,跳到根据多个标签进行搜索的页面
*   用户上传图片作为头像和个人主页的背景页
*   导航栏的搜索功能,搜索问题
*   登出按钮,删除cookie信息
*   登录页检测cookie信息,来决定是否需要输入帐号密码
*   登录页的样式
*   问题主页里的所有回答的排序方式,权重和时间正倒
*   一个问题,一个用户只能回答一次
*   个人主页的个人信息的编辑功能,然后传给后端.
*   添加后端接口,接受编辑的个人信息,保存到数据库.
*   添加特定标签页面,展示包含此标签的所有热门问题,和最新问题.(转换通过最新/最热按钮实现),相关样式
*   ...

#更新日志(已完成)
---

* 2017-3-5 :    继续完善用户主页的信息编辑样式及前后端代码.登录注册页面的样式,及一点特殊效果
* 2017-3-3 :    修改后端获取问题数据的接口,并根据请求参数的不同,在后台对数据进行处理.然后传给前端
* 2017-3-3 :    添加特定问题页面,对应样式.
* 2017-3-2 :    添加后端接口,从数据库中获取标签信息,然后传给前端.
* 2017-2-28:    主页加载时从后端获取标签信息,展示在页面右边,及其样式
* 2017-2-27:    完成主页添加两个按钮: 最新,最热.及对应的后端接口．及页面结构样式
    *   最新:从数据库获取问题数据,并按某种权重排列
    *   最热:从数据库获取问题数据,并按提问时间倒序排列
* 2017-2-25:    关联提交的问题和某用户的提问.PS: mongoose的CRUD操作是异步的,它喵的坑死我了.
* 2017-2-24:    完善问题提交的Ajax,后端写了个接口来处理提交的问题.并且定义了question和answer的Model
* 2017-2-23:    加上登录注册模块.完成登录/注册页的结构(样式未完成).引入数据库MongoDB,定义了connect.js和user的Model.
* 2017-2-13:    项目初始化.路由了几个页面,基本完成首页的结构和样式,更新README.md

