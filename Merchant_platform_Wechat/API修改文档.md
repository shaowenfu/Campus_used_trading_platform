# 登录相关API修改文档

## 1. 登录接口修改

### POST /marketer/login

修改请求参数:

```json
{
  "username": "string",     // 用户名/手机号
  "password": "string",     // 密码(账号密码登录时必填)
  "loginType": "string",    // 登录方式: account-账号密码, weixin-微信, qq-QQ, weibo-微博
  "code": "string",        // 第三方登录code(第三方登录时必填)
  "userInfo": {           // 第三方登录用户信息(第三方登录时必填)
    "nickName": "string",
    "avatarUrl": "string",
    "gender": number
  }
}
```

返回参数不变。

Java代码示例:
```java
@Data
public class LoginDTO {
    private String username;
    private String password;
    private String loginType;
    private String code;
    private UserInfo userInfo;
}

@RestController
@RequestMapping("/marketer")
public class LoginController {
    
    @Autowired
    private LoginService loginService;
    
    @PostMapping("/login")
    public R<LoginVO> login(@RequestBody LoginDTO loginDTO) {
        // 根据loginType判断登录方式
        if("account".equals(loginDTO.getLoginType())) {
            // 账号密码登录
            return loginService.accountLogin(loginDTO);
        } else {
            // 第三方登录
            return loginService.thirdPartyLogin(loginDTO);
        }
    }
}

@Service
public class LoginServiceImpl implements LoginService {
    
    @Autowired
    private EmployeeMapper employeeMapper;
    
    @Override
    public R<LoginVO> accountLogin(LoginDTO loginDTO) {
        // 1. 校验用户名密码
        Employee employee = employeeMapper.getByUsername(loginDTO.getUsername());
        if(employee == null || !employee.getPassword().equals(loginDTO.getPassword())) {
            return R.error("用户名或密码错误");
        }
        
        // 2. 生成token
        String token = JwtUtil.generateToken(employee);
        
        // 3. 组装返回数据
        LoginVO loginVO = new LoginVO();
        loginVO.setId(employee.getId());
        loginVO.setUsername(employee.getUsername());
        loginVO.setToken(token);
        
        return R.success(loginVO);
    }
    
    @Override 
    public R<LoginVO> thirdPartyLogin(LoginDTO loginDTO) {
        // 1. 获取第三方用户信息
        ThirdPartyUserInfo userInfo = getThirdPartyUserInfo(loginDTO.getCode());
        
        // 2. 查询或注册用户
        Employee employee = employeeMapper.getByThirdPartyId(userInfo.getOpenId());
        if(employee == null) {
            employee = registerThirdPartyUser(userInfo);
        }
        
        // 3. 生成token并返回
        String token = JwtUtil.generateToken(employee);
        LoginVO loginVO = new LoginVO();
        loginVO.setId(employee.getId());
        loginVO.setUsername(employee.getUsername());
        loginVO.setToken(token);
        
        return R.success(loginVO);
    }
}
```

## 2. 新增注册接口

### POST /marketer/register

请求参数:
```json
{
  "username": "string",    // 用户名
  "password": "string",    // 密码
  "phone": "string",      // 手机号
  "verifyCode": "string"  // 验证码
}
```

返回参数:
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": "number",       // 用户ID
    "username": "string", // 用户名
    "phone": "string",    // 手机号
    "token": "string"     // 登录token
  }
}
```

Java代码示例:
```java
@Data
public class RegisterDTO {
    private String username;
    private String password;
    private String phone;
    private String verifyCode;
}

@RestController
@RequestMapping("/marketer")
public class RegisterController {
    
    @Autowired
    private RegisterService registerService;
    
    @PostMapping("/register")
    public R<RegisterVO> register(@RequestBody RegisterDTO registerDTO) {
        // 1. 验证码校验
        if(!verifyCodeService.verify(registerDTO.getPhone(), registerDTO.getVerifyCode())) {
            return R.error("验证码错误");
        }
        
        // 2. 注册用户
        return registerService.register(registerDTO);
    }
}

@Service
public class RegisterServiceImpl implements RegisterService {
    
    @Autowired
    private EmployeeMapper employeeMapper;
    
    @Override
    public R<RegisterVO> register(RegisterDTO registerDTO) {
        // 1. 检查用户名是否存在
        if(employeeMapper.getByUsername(registerDTO.getUsername()) != null) {
            return R.error("用户名已存在");
        }
        
        // 2. 创建用户
        Employee employee = new Employee();
        employee.setUsername(registerDTO.getUsername());
        employee.setPassword(registerDTO.getPassword());
        employee.setPhone(registerDTO.getPhone());
        employeeMapper.insert(employee);
        
        // 3. 生成token
        String token = JwtUtil.generateToken(employee);
        
        // 4. 返回数据
        RegisterVO registerVO = new RegisterVO();
        registerVO.setId(employee.getId());
        registerVO.setUsername(employee.getUsername());
        registerVO.setPhone(employee.getPhone());
        registerVO.setToken(token);
        
        return R.success(registerVO);
    }
}
```

## 3. 新增发送验证码接口

### POST /marketer/sendVerifyCode

请求参数:
```json
{
  "phone": "string"      // 手机号
}
```

返回参数:
```json
{
  "code": 0,
  "msg": "string",
  "data": null
}
```

Java代码示例:
```java
@RestController
@RequestMapping("/marketer")
public class VerifyCodeController {
    
    @Autowired
    private VerifyCodeService verifyCodeService;
    
    @PostMapping("/sendVerifyCode")
    public R<Void> sendVerifyCode(@RequestParam String phone) {
        // 1. 生成验证码
        String code = generateVerifyCode();
        
        // 2. 发送验证码
        verifyCodeService.send(phone, code);
        
        // 3. 保存验证码
        verifyCodeService.save(phone, code);
        
        return R.success();
    }
}
```

## 4. 新增重置密码接口

### POST /marketer/resetPassword

请求参数:
```json
{
  "phone": "string",      // 手机号
  "verifyCode": "string", // 验证码
  "newPassword": "string" // 新密码
}
```

返回参数:
```json
{
  "code": 0,
  "msg": "string",
  "data": null
}
```

Java代码示例:
```java
@Data
public class ResetPasswordDTO {
    private String phone;
    private String verifyCode;
    private String newPassword;
}

@RestController
@RequestMapping("/marketer")
public class PasswordController {
    
    @Autowired
    private PasswordService passwordService;
    
    @PostMapping("/resetPassword")
    public R<Void> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        // 1. 验证码校验
        if(!verifyCodeService.verify(resetPasswordDTO.getPhone(), resetPasswordDTO.getVerifyCode())) {
            return R.error("验证码错误");
        }
        
        // 2. 重置密码
        return passwordService.resetPassword(resetPasswordDTO);
    }
}
```

## 5. 新增第三方账号绑定接口

### POST /marketer/bindThirdParty

请求参数:
```json
{
  "userId": "number",     // 用户ID
  "type": "string",      // 绑定类型: weixin/qq/weibo
  "openId": "string"     // 第三���openId
}
```

返回参数:
```json
{
  "code": 0,
  "msg": "string",
  "data": null
}
```

Java代码示例:
```java
@Data
public class BindThirdPartyDTO {
    private Long userId;
    private String type;
    private String openId;
}

@RestController
@RequestMapping("/marketer")
public class ThirdPartyController {
    
    @Autowired
    private ThirdPartyService thirdPartyService;
    
    @PostMapping("/bindThirdParty")
    public R<Void> bindThirdParty(@RequestBody BindThirdPartyDTO bindThirdPartyDTO) {
        // 1. 检查是否已绑定
        if(thirdPartyService.checkBind(bindThirdPartyDTO.getOpenId())) {
            return R.error("该第三方账号已被绑定");
        }
        
        // 2. 绑定账号
        return thirdPartyService.bind(bindThirdPartyDTO);
    }
}
```

## 相关数据库表设计

```sql
-- 商家用户表
CREATE TABLE employee (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL COMMENT '用户名',
    password VARCHAR(64) NOT NULL COMMENT '密码',
    phone VARCHAR(11) COMMENT '手机号',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 第三方账号绑定表
CREATE TABLE third_party_bind (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    type VARCHAR(20) NOT NULL COMMENT '第三方类型',
    open_id VARCHAR(64) NOT NULL COMMENT '第三方openId',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_type_openid (type, open_id)
);

-- 验证码记录表
CREATE TABLE verify_code (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(11) NOT NULL COMMENT '手机号',
    code VARCHAR(6) NOT NULL COMMENT '验证码',
    expire_time DATETIME NOT NULL COMMENT '过期时间',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
``` 