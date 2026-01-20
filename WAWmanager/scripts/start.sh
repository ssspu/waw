#!/bin/bash

# WAWmanager 快速启动脚本
# 用于快速启动开发环境

echo "🚀 WAWmanager 快速启动"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 检查依赖
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⚠ 依赖未安装，正在安装...${NC}"
  npm install
  if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 依赖安装失败${NC}"
    exit 1
  fi
  echo -e "${GREEN}✓ 依赖安装完成${NC}"
else
  echo -e "${GREEN}✓ 依赖已安装${NC}"
fi
echo ""

# 清理旧的构建产物
echo "🧹 清理旧的构建产物..."
if [ -d "unpackage/dist" ]; then
  rm -rf unpackage/dist
  echo -e "${GREEN}✓ 清理完成${NC}"
else
  echo -e "${GREEN}✓ 无需清理${NC}"
fi
echo ""

# 选择启动模式
echo "请选择启动模式："
echo "  1) H5 开发模式"
echo "  2) 小程序开发模式"
echo "  3) H5 生产构建"
echo "  4) 小程序生产构建"
echo ""
read -p "请输入选项 (1-4): " choice

case $choice in
  1)
    echo ""
    echo -e "${BLUE}🌐 启动 H5 开发模式...${NC}"
    echo "访问地址: http://localhost:5151"
    echo ""
    npm run dev:h5
    ;;
  2)
    echo ""
    echo -e "${BLUE}📱 启动小程序开发模式...${NC}"
    echo "构建目录: unpackage/dist/dev/mp-weixin"
    echo "请使用微信开发者工具打开该目录"
    echo ""
    npm run dev:mp-weixin
    ;;
  3)
    echo ""
    echo -e "${BLUE}🏗️  构建 H5 生产版本...${NC}"
    npm run build:h5
    echo ""
    echo -e "${GREEN}✓ 构建完成${NC}"
    echo "构建目录: unpackage/dist/build/h5"
    ;;
  4)
    echo ""
    echo -e "${BLUE}🏗️  构建小程序生产版本...${NC}"
    npm run build:mp-weixin
    echo ""
    echo -e "${GREEN}✓ 构建完成${NC}"
    echo "构建目录: unpackage/dist/build/mp-weixin"
    echo "请使用微信开发者工具上传"
    ;;
  *)
    echo ""
    echo -e "${YELLOW}⚠ 无效的选项${NC}"
    exit 1
    ;;
esac
