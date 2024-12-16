
# 用户端Api

## 接口1：查询分类


**接口地址**:`/user/category/list`


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

## 接口2：根据分类id查商品

**接口地址**:`/user/thing/list`


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
|200|OK|Result«List«ThingVO»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|ThingVO|
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
	"data": [
		{
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
		}
	],
	"msg": ""
}
```

## 地址相关接口



## 新增地址


**接口地址**:`/user/addressBook`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "area": "",
  "consignee": "",
  "doorCode": "",
  "dormitoriesId": "",
  "id": 0,
  "isDefault": 0,
  "phone": "",
  "sex": "",
  "unitNumber": "",
  "userId": 0
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|addressBook|addressBook|body|true|AddressBook|AddressBook|
|&emsp;&emsp;area|||false|string||
|&emsp;&emsp;consignee|||false|string||
|&emsp;&emsp;doorCode|||false|string||
|&emsp;&emsp;dormitoriesId|||false|string||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;isDefault|||false|integer(int32)||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;sex|||false|string||
|&emsp;&emsp;unitNumber|||false|string||
|&emsp;&emsp;userId|||false|integer(int64)||


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


## 根据id修改地址


**接口地址**:`/user/addressBook`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "area": "",
  "consignee": "",
  "doorCode": "",
  "dormitoriesId": "",
  "id": 0,
  "isDefault": 0,
  "phone": "",
  "sex": "",
  "unitNumber": "",
  "userId": 0
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|addressBook|addressBook|body|true|AddressBook|AddressBook|
|&emsp;&emsp;area|||false|string||
|&emsp;&emsp;consignee|||false|string||
|&emsp;&emsp;doorCode|||false|string||
|&emsp;&emsp;dormitoriesId|||false|string||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;isDefault|||false|integer(int32)||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;sex|||false|string||
|&emsp;&emsp;unitNumber|||false|string||
|&emsp;&emsp;userId|||false|integer(int64)||


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


## 根据id删除地址


**接口地址**:`/user/addressBook`


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


## 查询默认地址


**接口地址**:`/user/addressBook/default`


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
|200|OK|Result«AddressBook»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||AddressBook|AddressBook|
|&emsp;&emsp;area||string||
|&emsp;&emsp;consignee||string||
|&emsp;&emsp;doorCode||string||
|&emsp;&emsp;dormitoriesId||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;isDefault||integer(int32)||
|&emsp;&emsp;phone||string||
|&emsp;&emsp;sex||string||
|&emsp;&emsp;unitNumber||string||
|&emsp;&emsp;userId||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"area": "",
		"consignee": "",
		"doorCode": "",
		"dormitoriesId": "",
		"id": 0,
		"isDefault": 0,
		"phone": "",
		"sex": "",
		"unitNumber": "",
		"userId": 0
	},
	"msg": ""
}
```


## 设置默认地址


**接口地址**:`/user/addressBook/default`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "area": "",
  "consignee": "",
  "doorCode": "",
  "dormitoriesId": "",
  "id": 0,
  "isDefault": 0,
  "phone": "",
  "sex": "",
  "unitNumber": "",
  "userId": 0
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|addressBook|addressBook|body|true|AddressBook|AddressBook|
|&emsp;&emsp;area|||false|string||
|&emsp;&emsp;consignee|||false|string||
|&emsp;&emsp;doorCode|||false|string||
|&emsp;&emsp;dormitoriesId|||false|string||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;isDefault|||false|integer(int32)||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;sex|||false|string||
|&emsp;&emsp;unitNumber|||false|string||
|&emsp;&emsp;userId|||false|integer(int64)||


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


## 查询当前登录用户的所有地址信息


**接口地址**:`/user/addressBook/list`


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
|200|OK|Result«List«AddressBook»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|AddressBook|
|&emsp;&emsp;area||string||
|&emsp;&emsp;consignee||string||
|&emsp;&emsp;doorCode||string||
|&emsp;&emsp;dormitoriesId||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;isDefault||integer(int32)||
|&emsp;&emsp;phone||string||
|&emsp;&emsp;sex||string||
|&emsp;&emsp;unitNumber||string||
|&emsp;&emsp;userId||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"area": "",
			"consignee": "",
			"doorCode": "",
			"dormitoriesId": "",
			"id": 0,
			"isDefault": 0,
			"phone": "",
			"sex": "",
			"unitNumber": "",
			"userId": 0
		}
	],
	"msg": ""
}
```


## 根据id查询地址


**接口地址**:`/user/addressBook/{id}`


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
|200|OK|Result«AddressBook»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||AddressBook|AddressBook|
|&emsp;&emsp;area||string||
|&emsp;&emsp;consignee||string||
|&emsp;&emsp;doorCode||string||
|&emsp;&emsp;dormitoriesId||string||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;isDefault||integer(int32)||
|&emsp;&emsp;phone||string||
|&emsp;&emsp;sex||string||
|&emsp;&emsp;unitNumber||string||
|&emsp;&emsp;userId||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"area": "",
		"consignee": "",
		"doorCode": "",
		"dormitoriesId": "",
		"id": 0,
		"isDefault": 0,
		"phone": "",
		"sex": "",
		"unitNumber": "",
		"userId": 0
	},
	"msg": ""
}
```


## 微信登陆


**接口地址**:`/user/user/login`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "code": ""
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userLoginDTO|userLoginDTO|body|true|UserLoginDTO|UserLoginDTO|
|&emsp;&emsp;code|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|Result«UserLoginVO»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||UserLoginVO|UserLoginVO|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;openid||string||
|&emsp;&emsp;token||string||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"id": 0,
		"openid": "",
		"token": ""
	},
	"msg": ""
}
```


## 添加购物车


**接口地址**:`/user/shoppingCart/add`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "thingId": 0
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|shoppingCartDTO|shoppingCartDTO|body|true|ShoppingCartDTO|ShoppingCartDTO|
|&emsp;&emsp;thingId|||false|integer(int64)||


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


## 清空购物车


**接口地址**:`/user/shoppingCart/clean`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


暂无


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


## 查看购物车


**接口地址**:`/user/shoppingCart/list`


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
|200|OK|Result«List«ShoppingCart»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|ShoppingCart|
|&emsp;&emsp;amount||integer(int64)||
|&emsp;&emsp;createTime||string(date-time)||
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;image||string||
|&emsp;&emsp;marketerId||integer(int64)||
|&emsp;&emsp;name||string||
|&emsp;&emsp;price||number||
|&emsp;&emsp;thingId||integer(int64)||
|&emsp;&emsp;userId||integer(int64)||
|msg||string||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"amount": 0,
			"createTime": "",
			"id": 0,
			"image": "",
			"marketerId": 0,
			"name": "",
			"price": 0,
			"thingId": 0,
			"userId": 0
		}
	],
	"msg": ""
}
```


## 删除购物车商品


**接口地址**:`/user/shoppingCart/remove/{id}`


**请求方式**:`DELETE`


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