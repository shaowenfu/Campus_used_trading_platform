
# 接口文档

## 登录界面

### 接口1：login


**接口地址**:`/admin/login`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "password": "",
  "username": ""
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|marketerLoginDTO|商户（管理员）登录时传递的数据模型|body|true|MarketerLoginDTO|MarketerLoginDTO|
|&emsp;&emsp;password|密码||false|string||
|&emsp;&emsp;username|用户名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«MarketerLoginVO»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||MarketerLoginVO|MarketerLoginVO|
|&emsp;&emsp;id|主键值|integer(int64)||
|&emsp;&emsp;name|姓名|string||
|&emsp;&emsp;token|jwt令牌|string||
|&emsp;&emsp;userName|用户名|string||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"id": 0,
		"name": "",
		"token": "",
		"userName": ""
	},
	"msg": ""
}
```


### 接口2：logout


**接口地址**:`/admin/logout`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«string»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||string||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": "",
	"msg": ""
}
```

## 商户界面

### 接口3：save


**接口地址**:`/admin/marketer`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "idNumber": "",
  "name": "",
  "phone": "",
  "username": ""
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|marketerDTO|marketerDTO|body|true|MarketerDTO|MarketerDTO|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;idNumber|||false|string||
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;username|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```


### 接口4：update


**接口地址**:`/admin/marketer`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "idNumber": "",
  "name": "",
  "phone": "",
  "username": ""
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|marketerDTO|marketerDTO|body|true|MarketerDTO|MarketerDTO|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;idNumber|||false|string||
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;username|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```



### 接口5：editPassword


**接口地址**:`/admin/marketer/editPassword`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "marketerId": 0,
  "newPassword": "",
  "oldPassword": ""
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|passwordEditDTO|passwordEditDTO|body|true|PasswordEditDTO|PasswordEditDTO|
|&emsp;&emsp;marketerId|||false|integer(int64)||
|&emsp;&emsp;newPassword|||false|string||
|&emsp;&emsp;oldPassword|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```

### 接口6：page


**接口地址**:`/admin/marketer/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|name||query|false|string||
|page||query|false|integer(int32)||
|pageSize||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«PageResult»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageResult|PageResult|
|&emsp;&emsp;records||array|object|
|&emsp;&emsp;total||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [],
		"total": 0
	},
	"msg": ""
}
```



### 接口7：status


**接口地址**:`/admin/marketer/status/{status}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|status|status|path|true|integer(int32)||
|id|id|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```



### 接口8：get


**接口地址**:`/admin/marketer/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«Marketer»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||Marketer|Marketer|
|&emsp;&emsp;authority||integer(int32)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;idNumber||string||
|&emsp;&emsp;name||string||
|&emsp;&emsp;password||string||
|&emsp;&emsp;phone||string||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;username||string||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"authority": 0,
		"createTime": "",
		"id": 0,
		"idNumber": "",
		"name": "",
		"password": "",
		"phone": "",
		"status": 0,
		"updateTime": "",
		"username": ""
	},
	"msg": ""
}
```

## 商品分类界面

### 接口9：list


**接口地址**:`/admin/category`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«List«Category»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|Category|
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;createUser||integer(int64)||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;name||string||
|&emsp;&emsp;sort||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;updateUser||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"createTime": "",
			"createUser": 0,
			"id": 0,
			"name": "",
			"sort": 0,
			"status": 0,
			"updateTime": "",
			"updateUser": 0
		}
	],
	"msg": ""
}
```



### 接口10：udpate


**接口地址**:`/admin/category`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "name": "",
  "sort": 0
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryDTO|categoryDTO|body|true|CategoryDTO|CategoryDTO|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;sort|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```



### 接口11：delete


**接口地址**:`/admin/category`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```



### 接口12：page


**接口地址**:`/admin/category/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|name||query|false|string||
|page||query|false|integer(int32)||
|pageSize||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«PageResult»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageResult|PageResult|
|&emsp;&emsp;records||array|object|
|&emsp;&emsp;total||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [],
		"total": 0
	},
	"msg": ""
}
```



### 接口13：save


**接口地址**:`/admin/category/save`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "name": "",
  "sort": 0
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryDTO|categoryDTO|body|true|CategoryDTO|CategoryDTO|
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;name|||false|string||
|&emsp;&emsp;sort|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```



### 接口14：status


**接口地址**:`/admin/category/status/{status}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|status|status|path|true|integer(int32)||
|id|id|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```

## 新闻界面

### 接口15：delete


**接口地址**:`/admin/news`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```



### 接口16：list


**接口地址**:`/admin/news/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«List«News»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|News|
|&emsp;&emsp;detail||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;image||string||
|&emsp;&emsp;sort||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"detail": "",
			"id": 0,
			"image": "",
			"sort": 0,
			"status": 0
		}
	],
	"msg": ""
}
```



### 接口17：getByid


**接口地址**:`/admin/news/list/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«News»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||News|News|
|&emsp;&emsp;detail||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;image||string||
|&emsp;&emsp;sort||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"detail": "",
		"id": 0,
		"image": "",
		"sort": 0,
		"status": 0
	},
	"msg": ""
}
```



### 接口18：pageQuery


**接口地址**:`/admin/news/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|details||query|false|string||
|page||query|false|integer(int32)||
|pageSize||query|false|integer(int32)||
|status||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«PageResult»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageResult|PageResult|
|&emsp;&emsp;records||array|object|
|&emsp;&emsp;total||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [],
		"total": 0
	},
	"msg": ""
}
```



### 接口19：save


**接口地址**:`/admin/news/save`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|detail||query|false|string||
|id||query|false|integer(int64)||
|image||query|false|string||
|sort||query|false|integer(int32)||
|status||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```

### 接口20：update


**接口地址**:`/admin/news/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|detail|detail|body|true|string||
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```



### 接口21：list


**接口地址**:`/user/news/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«List«News»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|News|
|&emsp;&emsp;detail||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;image||string||
|&emsp;&emsp;sort||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"detail": "",
			"id": 0,
			"image": "",
			"sort": 0,
			"status": 0
		}
	],
	"msg": ""
}
```



### 接口22：getByid


**接口地址**:`/user/news/list/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«News»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||News|News|
|&emsp;&emsp;detail||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;image||string||
|&emsp;&emsp;sort||integer(int32)||
|&emsp;&emsp;status||integer(int32)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"detail": "",
		"id": 0,
		"image": "",
		"sort": 0,
		"status": 0
	},
	"msg": ""
}
```

## 订单管理界面

### 接口23：cancel


**接口地址**:`/admin/order/cancel`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "cancelReason": "",
  "id": 0
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ordersCancelDTO|ordersCancelDTO|body|true|OrdersCancelDTO|OrdersCancelDTO|
|&emsp;&emsp;cancelReason|||false|string||
|&emsp;&emsp;id|||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```

### 接口24：conditionSearch


**接口地址**:`/admin/order/conditionSearch`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|beginTime||query|false|string(date-time)||
|endTime||query|false|string(date-time)||
|marketerId||query|false|integer(int64)||
|number||query|false|string||
|page||query|false|integer(int32)||
|pageSize||query|false|integer(int32)||
|phone||query|false|string||
|status||query|false|integer(int32)||
|userId||query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«PageResult»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageResult|PageResult|
|&emsp;&emsp;records||array|object|
|&emsp;&emsp;total||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [],
		"total": 0
	},
	"msg": ""
}
```

### 接口25：details


**接口地址**:`/admin/order/details/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«OrderVO»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||OrderVO|OrderVO|
|&emsp;&emsp;address||string||
|&emsp;&emsp;addressBookId||integer(int64)||
|&emsp;&emsp;amount||number||
|&emsp;&emsp;cancelReason||string||
|&emsp;&emsp;cancelTime||string(date-time)||
|&emsp;&emsp;checkoutTime||string(date-time)||
|&emsp;&emsp;consignee||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;marketerId||integer(int64)||
|&emsp;&emsp;number||string||
|&emsp;&emsp;orderDetailList||array|OrderDetail|
|&emsp;&emsp;&emsp;&emsp;amount||integer||
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;image||string||
|&emsp;&emsp;&emsp;&emsp;name||string||
|&emsp;&emsp;&emsp;&emsp;orderId||integer||
|&emsp;&emsp;&emsp;&emsp;price||number||
|&emsp;&emsp;&emsp;&emsp;thingId||integer||
|&emsp;&emsp;orderThings||string||
|&emsp;&emsp;orderTime||string(date-time)||
|&emsp;&emsp;payMethod||integer(int32)||
|&emsp;&emsp;payStatus||integer(int32)||
|&emsp;&emsp;phone||string||
|&emsp;&emsp;remark||string||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;userId||integer(int64)||
|&emsp;&emsp;userName||string||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"address": "",
		"addressBookId": 0,
		"amount": 0,
		"cancelReason": "",
		"cancelTime": "",
		"checkoutTime": "",
		"consignee": "",
		"id": 0,
		"marketerId": 0,
		"number": "",
		"orderDetailList": [
			{
				"amount": 0,
				"id": 0,
				"image": "",
				"name": "",
				"orderId": 0,
				"price": 0,
				"thingId": 0
			}
		],
		"orderThings": "",
		"orderTime": "",
		"payMethod": 0,
		"payStatus": 0,
		"phone": "",
		"remark": "",
		"status": 0,
		"userId": 0,
		"userName": ""
	},
	"msg": ""
}
```

### 接口26：statistics


**接口地址**:`/admin/order/statistics`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«OrderStatisticsVO»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||OrderStatisticsVO|OrderStatisticsVO|
|&emsp;&emsp;confirmed||integer(int32)||
|&emsp;&emsp;toBeConfirmed||integer(int32)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"confirmed": 0,
		"toBeConfirmed": 0
	},
	"msg": ""
}
```

## 用户评论

### 接口27：delete


**接口地址**:`/admin/remark`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```

### 接口28：list


**接口地址**:`/admin/remark/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|marketerId|marketerId|query|false|integer(int64)||
|userId|userId|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«List«RemarkVO»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|RemarkVO|
|&emsp;&emsp;date||string(date-time)||
|&emsp;&emsp;detail||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;marketerUsername||string||
|&emsp;&emsp;userUsername||string||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"date": "",
			"detail": "",
			"id": 0,
			"marketerUsername": "",
			"userUsername": ""
		}
	],
	"msg": ""
}
```

### 接口29：pageQuery


**接口地址**:`/admin/remark/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|detail||query|false|string||
|marketerId||query|false|integer(int64)||
|page||query|false|integer(int32)||
|pageSize||query|false|integer(int32)||
|userId||query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«PageResult»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageResult|PageResult|
|&emsp;&emsp;records||array|object|
|&emsp;&emsp;total||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [],
		"total": 0
	},
	"msg": ""
}
```

## 商品页面

### 接口30：update


**接口地址**:`/admin/thing`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|amount||query|false|integer(int64)||
|categoryId||query|false|integer(int64)||
|description||query|false|string||
|id||query|false|integer(int64)||
|image||query|false|string||
|name||query|false|string||
|price||query|false|number||
|status||query|false|integer(int32)||
|tradeStyle||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```

### 接口31：list


**接口地址**:`/admin/thing/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|categoryId|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«List«Thing»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|Thing|
|&emsp;&emsp;amount||integer(int64)||
|&emsp;&emsp;categoryId||integer(int64)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;createUser||integer(int64)||
|&emsp;&emsp;description||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;image||string||
|&emsp;&emsp;name||string||
|&emsp;&emsp;price||number||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;tradeStyle||integer(int32)||
|&emsp;&emsp;updateTime||string(date-time)||
|&emsp;&emsp;updateUser||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"amount": 0,
			"categoryId": 0,
			"createTime": "",
			"createUser": 0,
			"description": "",
			"id": 0,
			"image": "",
			"name": "",
			"price": 0,
			"status": 0,
			"tradeStyle": 0,
			"updateTime": "",
			"updateUser": 0
		}
	],
	"msg": ""
}
```

### 接口32：page


**接口地址**:`/admin/thing/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId||query|false|integer(int32)||
|marketerId||query|false|integer(int64)||
|name||query|false|string||
|page||query|false|integer(int32)||
|pageSize||query|false|integer(int32)||
|status||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«PageResult»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageResult|PageResult|
|&emsp;&emsp;records||array|object|
|&emsp;&emsp;total||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [],
		"total": 0
	},
	"msg": ""
}
```

### 接口33：startOrStop


**接口地址**:`/admin/thing/status/{status}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|status|status|path|true|integer(int32)||
|id|id|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": ""
}
```

### 接口34：getById


**接口地址**:`/admin/thing/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«ThingVO»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||ThingVO|ThingVO|
|&emsp;&emsp;amount||integer(int64)||
|&emsp;&emsp;categoryId||integer(int64)||
|&emsp;&emsp;categoryName||string||
|&emsp;&emsp;description||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;image||string||
|&emsp;&emsp;marketerId||integer(int64)||
|&emsp;&emsp;name||string||
|&emsp;&emsp;price||number||
|&emsp;&emsp;status||integer(int32)||
|&emsp;&emsp;tradeStyle||integer(int32)||
|&emsp;&emsp;updateTime||string(date-time)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"amount": 0,
		"categoryId": 0,
		"categoryName": "",
		"description": "",
		"id": 0,
		"image": "",
		"marketerId": 0,
		"name": "",
		"price": 0,
		"status": 0,
		"tradeStyle": 0,
		"updateTime": ""
	},
	"msg": ""
}
```