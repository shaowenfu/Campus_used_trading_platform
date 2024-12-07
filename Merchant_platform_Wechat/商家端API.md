---
title: 数据库
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.23"

---

# 数据库

Base URLs:

# Authentication

# 商家端/marketer/商家相关接口

## PUT 修改密码 Copy

PUT /marketer/editPassword

> Body 请求参数

```json
{
  "empId": 0,
  "newPassword": "string",
  "oldPassword": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | PasswordEditDTO|none|
|» empId|body|integer(int64)| 是 ||商户id|
|» newPassword|body|string| 是 ||新密码|
|» oldPassword|body|string| 是 ||旧密码|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«string»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|string|false|none||none|
|» msg|string|false|none||none|

## POST 登录 Copy

POST /marketer/login

> Body 请求参数

```json
{
  "password": "string",
  "username": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | EmployeeLoginDTO|none|
|» password|body|string| 是 ||密码|
|» username|body|string| 是 ||用户名|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "name": "string",
    "token": "string",
    "userName": "string"
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«EmployeeLoginVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|false|none|EmployeeLoginVO|员工登录返回的数据格式|
|»» id|integer(int64)|false|none||主键值|
|»» name|string|false|none||姓名|
|»» token|string|false|none||jwt令牌|
|»» userName|string|false|none||用户名|
|» msg|string|false|none||none|

## PUT 编辑商家信息 Copy

PUT /marketer

> Body 请求参数

```json
{
  "id": 0,
  "name": "string",
  "phone": "string",
  "username": "string",
  "idNumber": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | EmployeeDTO|none|
|» id|body|integer(int64)| 是 ||none|
|» name|body|string| 是 ||none|
|» phone|body|string| 是 ||none|
|» username|body|string| 是 ||none|
|» idNumber|body|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«string»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|string|false|none||none|
|» msg|string|false|none||none|

## POST 退出登录 Copy

POST /marketer/logout

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | empty object|none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«string»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|string|false|none||none|
|» msg|string|false|none||none|

# 商家端/marketer/工作台接口

## GET 查询今日运营数据

GET /marketer/workspace/businessData

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "orderCompletionRate": 0.1,
    "turnover": 0.1,
    "validOrderCount": 0
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«BusinessDataVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|true|none|BusinessDataVO|none|
|»» orderCompletionRate|number(double)|true|none||订单完成率|
|»» turnover|number(double)|true|none||营业额|
|»» validOrderCount|integer(int32)|true|none||有效订单数|
|» msg|string|false|none||none|

## GET 查询商品总览

GET /marketer/workspace/overviewDishes

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "discontinued": 0,
    "sold": 0
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«DishOverViewVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|true|none|DishOverViewVO|none|
|»» discontinued|integer(int32)|true|none||已停售菜品数量|
|»» sold|integer(int32)|true|none||已启售菜品数量|
|» msg|string|false|none||none|

## GET 查询订单管理数据

GET /marketer/workspace/overviewOrders

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "allOrders": 0,
    "cancelledOrders": 0,
    "completedOrders": 0,
    "unsolvedOrders": 0,
    "tradingOrders": 0
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«OrderOverViewVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|true|none|OrderOverViewVO|none|
|»» allOrders|integer(int32)|true|none||全部订单|
|»» cancelledOrders|integer(int32)|true|none||已取消数量|
|»» completedOrders|integer(int32)|true|none||已完成数量|
|»» unsolvedOrders|integer(int32)|true|none||未处理数量|
|»» tradingOrders|integer(int32)|true|none||交易中数量|
|» msg|string|false|none||none|

# 商家端/marketer/数据统计相关接口

## GET 查询销量排名top10接口

GET /marketer/report/top10

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|begin|query|string| 是 ||开始日期（DateOverViewDTO）|
|end|query|string| 是 ||结束日期|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "nameList": "string",
    "numberList": "string"
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«SalesTop10ReportVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|true|none|SalesTop10ReportVO|none|
|»» nameList|string|true|none||商品名称列表，以逗号分隔|
|»» numberList|string|true|none||销量列表，以逗号分隔|
|» msg|string|false|none||none|

## GET 营业额统计接口

GET /admin/report/turnoverStatistics

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|begin|query|string| 是 ||开始日期|
|end|query|string| 是 ||结束日期|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "dateList": "string",
    "turnoverList": "string"
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«TurnoverReportVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|true|none|TurnoverReportVO|none|
|»» dateList|string|true|none||日期列表，日期之间以逗号分隔|
|»» turnoverList|string|true|none||营业额列表，营业额之间以逗号分隔|
|» msg|string|false|none||none|

## GET 订单统计接口

GET /admin/report/ordersStatistics

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|begin|query|string| 是 ||开始日期|
|end|query|string| 是 ||结束日期|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "dateList": "string",
    "orderCompletionRate": 0.1,
    "orderCountList": "string",
    "totalOrderCount": 0,
    "validOrderCount": 0,
    "validOrderCountList": "string"
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«OrderReportVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|true|none|OrderReportVO|none|
|»» dateList|string|true|none||日期列表，以逗号分隔|
|»» orderCompletionRate|number(double)|true|none||订单完成率|
|»» orderCountList|string|true|none||订单数列表，以逗号分隔|
|»» totalOrderCount|integer(int32)|true|none||订单总数|
|»» validOrderCount|integer(int32)|true|none||有效订单数|
|»» validOrderCountList|string|true|none||有效订单数列表，以逗号分隔|
|» msg|string|false|none||none|

# 商家端/marketer/订单管理接口 Copy

## PUT 取消订单

PUT /marketer/order/cancel

> Body 请求参数

```json
{
  "cancelReason": "string",
  "id": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | OrdersCancelDTO|none|
|» cancelReason|body|string| 是 ||订单取消原因|
|» id|body|integer(int64)| 是 ||订单id|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|false|none||none|
|» msg|string|false|none||none|

## PUT 完成订单

PUT /marketer/order/complete/{id}

> Body 请求参数

```
string

```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|string| 是 ||订单id|
|Content-Type|header|string| 是 ||none|
|body|body|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|false|none||none|
|» msg|string|false|none||none|

## PUT 接单

PUT /marketer/order/confirm

> Body 请求参数

```json
{
  "id": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | OrdersConfirmDTO|none|
|» id|body|integer(int64)| 是 ||订单id|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {},
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|false|none||none|
|» msg|string|false|none||none|

## GET 订单搜索

GET /marketer/order/conditionSearch

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|beginTime|query|string| 否 ||beginTime（OrderPageQueryDTO）|
|endTime|query|string| 否 ||endTime|
|number|query|string| 否 ||number|
|page|query|string| 是 ||page|
|pageSize|query|string| 是 ||pageSize|
|phone|query|string| 否 ||phone|
|status|query|string| 否 ||status|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": null,
  "data": {
    "total": 0,
    "records": [
      {
        "id": 0,
        "number": "string",
        "status": 0,
        "userId": 0,
        "addressBookId": 0,
        "orderTime": "string",
        "checkoutTime": null,
        "payMethod": 0,
        "payStatus": 0,
        "amount": 0,
        "remark": "string",
        "userName": "string",
        "phone": "string",
        "address": "string",
        "consignee": "string",
        "cancelReason": "string",
        "rejectionReason": "string",
        "cancelTime": "string",
        "estimatedDeliveryTime": "string",
        "deliveryStatus": 0,
        "deliveryTime": "string",
        "packAmount": 0,
        "tablewareNumber": 0,
        "tablewareStatus": 0,
        "orderDishes": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||none|
|» msg|null|false|none||none|
|» data|object|false|none||none|
|»» total|number|false|none||none|
|»» records|[object]|false|none||none|
|»»» id|number|true|none||none|
|»»» number|string|true|none||none|
|»»» status|number|true|none||none|
|»»» userId|number|true|none||none|
|»»» addressBookId|number|true|none||none|
|»»» orderTime|string|true|none||none|
|»»» checkoutTime|null¦null|true|none||none|
|»»» payMethod|number|true|none||none|
|»»» payStatus|number|true|none||none|
|»»» amount|number|true|none||none|
|»»» remark|string|true|none||none|
|»»» userName|string|true|none||none|
|»»» phone|string|true|none||none|
|»»» address|string|true|none||none|
|»»» consignee|string|true|none||none|
|»»» cancelReason|string|true|none||none|
|»»» rejectionReason|string|true|none||none|
|»»» cancelTime|string|true|none||none|
|»»» estimatedDeliveryTime|string|true|none||none|
|»»» deliveryStatus|number|true|none||none|
|»»» deliveryTime|string|true|none||none|
|»»» packAmount|number|true|none||none|
|»»» tablewareNumber|number|true|none||none|
|»»» tablewareStatus|number|true|none||none|
|»»» orderDishes|string|true|none||订单包含的菜品，以字符串形式展示|

## GET 各个状态的订单数量统计 Copy

GET /marketer/order/statistics

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "deliveryInProgress": 0,
    "toBeConfirmed": 0
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«OrderStatisticsVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|true|none|OrderStatisticsVO|none|
|»» deliveryInProgress|integer(int32)|true|none||交易中数量|
|»» toBeConfirmed|integer(int32)|true|none||待接单数量|
|» msg|string|false|none||none|

## GET 查询订单详情 Copy

GET /marketer/order/details/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|string| 是 ||订单id|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "address": "string",
    "addressBookId": 0,
    "amount": 0,
    "cancelReason": "string",
    "cancelTime": "2019-08-24T14:15:22Z",
    "checkoutTime": "2019-08-24T14:15:22Z",
    "consignee": "string",
    "deliveryStatus": 0,
    "deliveryTime": "2019-08-24T14:15:22Z",
    "estimatedDeliveryTime": "2019-08-24T14:15:22Z",
    "id": 0,
    "number": "string",
    "orderDetailList": [
      {
        "amount": 0,
        "thingId": 0,
        "id": 0,
        "image": "string",
        "name": "string",
        "number": 0,
        "orderId": 0
      }
    ],
    "orderDishes": "string",
    "orderTime": "2019-08-24T14:15:22Z",
    "packAmount": 0,
    "payMethod": 0,
    "payStatus": 0,
    "phone": "string",
    "rejectionReason": "string",
    "remark": "string",
    "status": 0,
    "tablewareNumber": 0,
    "tablewareStatus": 0,
    "userId": 0,
    "userName": "string"
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«OrderVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|false|none|OrderVO（detail外的东西buyongcare，直接copy）|none|
|»» address|string|false|none||none|
|»» addressBookId|integer(int64)|false|none||none|
|»» amount|number|false|none||none|
|»» cancelReason|string|false|none||none|
|»» cancelTime|string(date-time)|false|none||none|
|»» checkoutTime|string(date-time)|false|none||none|
|»» consignee|string|false|none||none|
|»» deliveryStatus|integer(int32)|false|none||none|
|»» deliveryTime|string(date-time)|false|none||none|
|»» estimatedDeliveryTime|string(date-time)|false|none||none|
|»» id|integer(int64)|false|none||none|
|»» number|string|false|none||none|
|»» orderDetailList|[object]|false|none||none|
|»»» OrderDetail|object|false|none|OrderDetail|none|
|»»»» amount|number|false|none||none|
|»»»» thingId|integer(int64)|false|none||none|
|»»»» id|integer(int64)|false|none||none|
|»»»» image|string|false|none||none|
|»»»» name|string|false|none||none|
|»»»» number|integer(int32)|false|none||none|
|»»»» orderId|integer(int64)|false|none||none|
|»» orderDishes|string|false|none||none|
|»» orderTime|string(date-time)|false|none||none|
|»» packAmount|integer(int32)|false|none||none|
|»» payMethod|integer(int32)|false|none||none|
|»» payStatus|integer(int32)|false|none||none|
|»» phone|string|false|none||none|
|»» rejectionReason|string|false|none||none|
|»» remark|string|false|none||none|
|»» status|integer(int32)|false|none||none|
|»» tablewareNumber|integer(int32)|false|none||none|
|»» tablewareStatus|integer(int32)|false|none||none|
|»» userId|integer(int64)|false|none||none|
|»» userName|string|false|none||none|
|» msg|string|false|none||none|

# 商家端/marketer/商品相关接口 Copy

## DELETE 批量删除菜品

DELETE /marketer/thing

> Body 请求参数

```
string

```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|ids|query|string| 是 ||商品id，之间用逗号分隔|
|body|body|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«string»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|string|false|none||none|
|» msg|string|false|none||none|

## POST 新增菜品

POST /marketer/dish

> Body 请求参数

```json
{
  "categoryId": 0,
  "description": "string",
  "id": 0,
  "image": "string",
  "name": "string",
  "price": 0,
  "status": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | ThingDTO|none|
|» categoryId|body|integer(int64)| 是 ||分类id|
|» description|body|string| 否 ||菜品描述|
|» id|body|integer(int64)| 否 ||菜品id|
|» image|body|string| 是 ||菜品图片路径|
|» name|body|string| 是 ||菜品名称|
|» price|body|number| 是 ||菜品价格|
|» status|body|integer(int32)| 否 ||菜品状态：1为起售，0为停售|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«string»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|string|false|none||none|
|» msg|string|false|none||none|

## PUT 修改菜品

PUT /marketer/dish

> Body 请求参数

```json
{
  "categoryId": 0,
  "description": "string",
  "id": 0,
  "image": "string",
  "name": "string",
  "price": 0,
  "status": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 | ThingDTO|none|
|» categoryId|body|integer(int64)| 是 | ThingDTO|none|
|» description|body|string| 否 ||none|
|» id|body|integer(int64)| 是 ||none|
|» image|body|string| 是 ||none|
|» name|body|string| 是 ||none|
|» price|body|number| 是 ||none|
|» status|body|integer(int32)| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«string»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|string|false|none||none|
|» msg|string|false|none||none|

## GET 根据id查询商品

GET /marketer/dish/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|string| 是 ||菜品id|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "categoryId": 0,
    "categoryName": "string",
    "description": "string",
    "id": 0,
    "image": "string",
    "name": "string",
    "price": 0,
    "status": 0,
    "updateTime": "2019-08-24T14:15:22Z",
    "amount": "string"
  },
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«ThingVO»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|object|true|none|ThingVO|none|
|»» categoryId|integer(int64)|true|none||none|
|»» categoryName|string|true|none||none|
|»» description|string|true|none||none|
|»» id|integer(int64)|true|none||none|
|»» image|string|true|none||none|
|»» name|string|true|none||none|
|»» price|number|true|none||none|
|»» status|integer(int32)|true|none||none|
|»» updateTime|string(date-time)|true|none||none|
|»» amount|string|true|none||none|
|» msg|string|false|none||none|

## POST 菜品起售、停售

POST /admin/dish/status/{status}

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|status|path|string| 是 ||菜品状态：1为起售，0为停售|
|id|query|string| 是 ||菜品id|
|Content-Type|header|string| 是 ||none|
|body|body|object| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«string»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|string|false|none||none|
|» msg|string|false|none||none|

## GET 根据分类id查询商品 Copy

GET /marketer/thing/list

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|categoryId|query|string| 是 ||分类id|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": [
    {
      "categoryId": 0,
      "amount": 0,
      "createTime": "2019-08-24T14:15:22Z",
      "createUser": 0,
      "description": "string",
      "id": 0,
      "image": "string",
      "name": "string",
      "price": 0,
      "status": 0,
      "updateTime": "2019-08-24T14:15:22Z",
      "updateUser": 0
    }
  ],
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

*R«List«Thing»»*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer(int32)|true|none||none|
|» data|[object]|false|none||none|
|»» Dish|object|false|none|Dish|none|
|»»» categoryId|integer(int64)|false|none||none|
|»»» amount|integer(int64)|true|none||none|
|»»» createTime|string(date-time)|false|none||none|
|»»» createUser|integer(int64)|false|none||none|
|»»» description|string|false|none||none|
|»»» id|integer(int64)|false|none||none|
|»»» image|string|false|none||none|
|»»» name|string|false|none||none|
|»»» price|number|false|none||none|
|»»» status|integer(int32)|false|none||none|
|»»» updateTime|string(date-time)|false|none||none|
|»»» updateUser|integer(int64)|false|none||none|
|» msg|string|false|none||none|

## GET 商品分页查询 Copy

GET /marketer/thing/page

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|categoryId|query|string| 否 ||分类id（ThingPageQueryDTO）|
|name|query|string| 否 ||菜品名称|
|page|query|string| 是 ||页码|
|pageSize|query|string| 是 ||每页记录数|
|status|query|string| 否 ||分类状态|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": null,
  "data": {
    "total": 0,
    "records": [
      {
        "id": 0,
        "name": "string",
        "categoryId": 0,
        "price": 0,
        "image": "string",
        "description": "string",
        "status": 0,
        "updateTime": "string",
        "categoryName": "string",
        "amount": 0
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||none|
|» msg|null|false|none||none|
|» data|object|false|none||none|
|»» total|number|true|none||总记录数|
|»» records|[object]|true|none|ThingVO|当前页数据|
|»»» id|number|true|none||none|
|»»» name|string|true|none||none|
|»»» categoryId|number|true|none||none|
|»»» price|number|true|none||none|
|»»» image|string|true|none||none|
|»»» description|string|true|none||none|
|»»» status|number|true|none||none|
|»»» updateTime|string|true|none||none|
|»»» categoryName|string|true|none||分类名称|
|»»» amount|integer(int64)|true|none||none|

# 数据模型

