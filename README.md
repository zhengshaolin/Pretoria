# Pretoria
Cullinan Diamond，in the Premier No. 2 mine, near Pretoria, South Africa

--
--



拖拽插件选取框接口，参数5个，layer:z-index,plane:'0',vertical:'0',lshift:'10',tshift:'1'

与后端交互接口

--
1.初始化接口，所需参数，product_id，返回结构为doc/api.json结构  

--

2.保存接口，所需参数 product_id,layer,element_id,attribute，返回为true or false  

--
3.添加接口  
添加一个产品模板传递参数
"type":0 // 0 为添加一个新的产品
“templat”:1 // 需要初始化的借鉴的模板类型  例如，红色模板，蓝色模板

在一个产品页添加page时传递参数
"product_id":'111',//产品ID  
"type":'1'//1为在一个产品里添加一个page  
"pid":"p_1" // 生成一个新的唯一page id给服务端  
  
在某个page里添加element时  
"product_id":'111',//产品ID  
"type":'2'// 添加一个新的element  
"pid":"p_1" // 将当前的page id传给后端  
"eid":"p_1_2" // 生成一个新的唯一的element id给服务端  

--

4.删除接口  
删除某个产品
"product_id":'111',//产品ID 
"type":'0'// 0 为删除一个已有产品  

删除page时传递参数  
"product_id":'111',//产品ID  
"type":'1'// 删除一个page
"pid":"p_1" // 删除某page，及其下面所有元素  

page里删除element时  
"product_id":'111',//产品ID  
"type":'3'// 删除一个element  
"pid":"p_1" // 将当前的page id传给后端  
"eid":"p_1_2" // 删除某element


		