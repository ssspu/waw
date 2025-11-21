#!/bin/bash

# Ngrok 启动脚本
# 用于快速启动 ngrok 内网穿透

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 默认端口
DEFAULT_PORT=8090
DEFAULT_H5_PORT=8080

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  uni-app Ngrok 内网穿透启动脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查 ngrok 是否安装
if ! command -v ngrok &> /dev/null; then
    echo -e "${RED}错误：未找到 ngrok 命令${NC}"
    echo -e "${YELLOW}请先安装 ngrok：${NC}"
    echo "  macOS: brew install ngrok/ngrok/ngrok"
    echo "  或访问: https://ngrok.com/download"
    exit 1
fi

# 检查 ngrok 是否已配置 authtoken
if [ ! -f ~/.ngrok2/ngrok.yml ] && [ ! -f ~/Library/Application\ Support/ngrok/ngrok.yml ]; then
    echo -e "${YELLOW}警告：未检测到 ngrok 配置${NC}"
    echo -e "${YELLOW}请先配置 authtoken：${NC}"
    echo "  ngrok config add-authtoken YOUR_AUTH_TOKEN"
    echo ""
    read -p "是否继续？(y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 选择模式
echo -e "${GREEN}请选择要穿透的端口：${NC}"
echo "1) 开发服务器端口 (默认: 8090)"
echo "2) H5 预览端口 (默认: 8080)"
echo "3) 自定义端口"
echo ""
read -p "请选择 [1-3] (默认: 1): " mode
mode=${mode:-1}

case $mode in
    1)
        PORT=$DEFAULT_PORT
        TYPE="开发服务器"
        ;;
    2)
        PORT=$DEFAULT_H5_PORT
        TYPE="H5 预览"
        ;;
    3)
        read -p "请输入端口号: " PORT
        TYPE="自定义"
        ;;
    *)
        PORT=$DEFAULT_PORT
        TYPE="开发服务器"
        ;;
esac

# 检查端口是否被占用
if ! lsof -i :$PORT &> /dev/null; then
    echo -e "${YELLOW}警告：端口 $PORT 似乎未被占用${NC}"
    echo -e "${YELLOW}请确保 uni-app 开发服务器正在运行${NC}"
    echo ""
    read -p "是否继续？(y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}启动 ngrok ($TYPE - 端口: $PORT)${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}提示：${NC}"
echo "  - 按 Ctrl+C 停止 ngrok"
echo "  - 访问 http://127.0.0.1:4040 查看请求日志"
echo ""

# 启动 ngrok
ngrok http $PORT

