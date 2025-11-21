# Ngrok 内网穿透配置说明

## 项目信息
- 项目类型：uni-app
- 默认开发端口：8090（HBuilderX 开发服务器）
- H5 预览端口：通常为 8080 或其他端口

## 使用步骤

### 1. 安装 ngrok

#### macOS
```bash
# 使用 Homebrew 安装
brew install ngrok/ngrok/ngrok

# 或者下载二进制文件
# 访问 https://ngrok.com/download
```

#### Windows
- 访问 https://ngrok.com/download 下载 Windows 版本
- 解压到任意目录，将 ngrok.exe 添加到系统 PATH

#### Linux
```bash
# 下载并解压
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xzvf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin/
```

### 2. 注册 ngrok 账号并获取 Token

1. 访问 https://dashboard.ngrok.com/signup 注册账号
2. 登录后，访问 https://dashboard.ngrok.com/get-started/your-authtoken
3. 复制您的 authtoken

### 3. 配置 ngrok

```bash
# 设置 authtoken（只需执行一次）
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### 4. 启动 uni-app 开发服务器

#### 方式一：使用 HBuilderX
1. 在 HBuilderX 中打开项目
2. 运行 -> 运行到浏览器 -> Chrome（或其他浏览器）
3. 记录开发服务器端口（通常在控制台输出中显示，默认 8090）

#### 方式二：使用 CLI（如果已安装）
```bash
# 在项目根目录执行
npm run dev:h5
# 或
uni serve
```

### 5. 使用 ngrok 穿透

#### 穿透开发服务器（端口 8090）
```bash
ngrok http 8090
```

#### 穿透 H5 预览端口（端口 8080 或其他）
```bash
ngrok http 8080
```

#### 自定义域名（需要付费账号）
```bash
ngrok http 8090 --domain=your-domain.ngrok-free.app
```

#### 设置子域名（需要付费账号）
```bash
ngrok http 8090 --subdomain=your-project-name
```

### 6. 获取公网访问地址

执行 ngrok 命令后，您会看到类似以下输出：

```
Session Status                online
Account                       Your Name (Plan: Free)
Version                       3.x.x
Region                        United States (us)
Latency                       45ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxx-xx-xx-xx-xx.ngrok-free.app -> http://localhost:8090

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**重要**：复制 `Forwarding` 中的 HTTPS 地址（例如：`https://xxxx-xx-xx-xx-xx.ngrok-free.app`）

### 7. 访问项目

在浏览器中打开 ngrok 提供的 HTTPS 地址即可访问您的 uni-app 项目。

## 高级配置

### 使用配置文件

创建 `ngrok.yml` 配置文件：

```yaml
version: "2"
authtoken: YOUR_AUTH_TOKEN
tunnels:
  uni-app-dev:
    addr: 8090
    proto: http
    subdomain: your-project-name  # 需要付费账号
  uni-app-h5:
    addr: 8080
    proto: http
```

使用配置文件启动：
```bash
ngrok start --all
# 或启动特定隧道
ngrok start uni-app-dev
```

### 查看请求日志

ngrok 提供了 Web 界面查看所有请求：
- 访问 http://127.0.0.1:4040（ngrok 自动启动）

### 设置请求头转发

```bash
ngrok http 8090 --request-header-add "X-Forwarded-Proto: https"
```

## 注意事项

1. **免费账号限制**：
   - 每次连接地址会变化
   - 连接数有限制
   - 需要验证才能访问（首次访问会显示 ngrok 警告页）

2. **HTTPS 访问**：
   - ngrok 提供的是 HTTPS 地址，安全可靠
   - 如果项目中有 HTTP 请求，可能需要配置代理

3. **小程序开发**：
   - 如果开发微信小程序，需要在微信开发者工具中配置服务器地址
   - 在 `manifest.json` 中已设置 `urlCheck: false`，可以使用 ngrok 地址

4. **性能**：
   - ngrok 免费版有带宽限制
   - 如需更高性能，考虑升级到付费版

5. **端口占用**：
   - 确保 8090 或 8080 端口未被占用
   - 可使用 `lsof -i :8090` 检查端口占用情况

## 常见问题

### Q: 连接失败？
A: 检查开发服务器是否正常运行，端口是否正确。

### Q: 访问时出现 "ngrok free tier limit" 警告？
A: 这是正常现象，免费账号会有警告页，点击 "Visit Site" 即可继续访问。

### Q: 如何固定域名？
A: 需要升级到付费账号，然后可以设置自定义域名或固定子域名。

### Q: 如何停止 ngrok？
A: 在运行 ngrok 的终端中按 `Ctrl+C` 即可停止。

## 参考链接

- ngrok 官网：https://ngrok.com/
- ngrok 文档：https://ngrok.com/docs
- uni-app 文档：https://uniapp.dcloud.net.cn/

