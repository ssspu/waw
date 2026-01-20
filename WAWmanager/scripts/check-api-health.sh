#!/bin/bash

# WAWmanager API 健康检查脚本
# 用于验证前后端API对齐情况

echo "🔍 WAWmanager API 健康检查"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查计数
PASS=0
FAIL=0
WARN=0

# 1. 检查API模块文件
echo "📁 检查 API 模块文件..."
API_MODULES=(
  "api/modules/auth.js"
  "api/modules/shop.js"
  "api/modules/order.js"
  "api/modules/service.js"
  "api/modules/customer.js"
  "api/modules/staff.js"
  "api/modules/finance.js"
  "api/modules/statistics.js"
)

for module in "${API_MODULES[@]}"; do
  if [ -f "$module" ]; then
    echo -e "  ${GREEN}✓${NC} $module"
    ((PASS++))
  else
    echo -e "  ${RED}✗${NC} $module (缺失)"
    ((FAIL++))
  fi
done
echo ""

# 2. 检查配置文件
echo "⚙️  检查配置文件..."
CONFIG_FILES=(
  "api/config.js"
  "api/request.js"
  "vite.config.js"
  "manifest.json"
  "pages.json"
)

for config in "${CONFIG_FILES[@]}"; do
  if [ -f "$config" ]; then
    echo -e "  ${GREEN}✓${NC} $config"
    ((PASS++))
  else
    echo -e "  ${RED}✗${NC} $config (缺失)"
    ((FAIL++))
  fi
done
echo ""

# 3. 检查是否有错误的API调用
echo "🔎 检查错误的 API 调用..."
if grep -r "shop/info" api/modules/*.js 2>/dev/null | grep -v "^Binary" | grep -q "shop/info"; then
  echo -e "  ${RED}✗${NC} 发现错误的 /shop/info 调用"
  ((FAIL++))
else
  echo -e "  ${GREEN}✓${NC} 未发现 /shop/info 调用"
  ((PASS++))
fi

if grep -r "uni.request\|wx.request" pages/*.vue 2>/dev/null | grep -v "^Binary" | grep -v "//" | grep -q "request"; then
  echo -e "  ${YELLOW}⚠${NC} 发现直接使用 uni.request 的页面"
  ((WARN++))
else
  echo -e "  ${GREEN}✓${NC} 所有页面都使用封装的 API"
  ((PASS++))
fi
echo ""

# 4. 检查硬编码的URL
echo "🌐 检查硬编码的 URL..."
if grep -r "localhost\|127.0.0.1\|192.168" api/ pages/ --include="*.js" --include="*.vue" 2>/dev/null | grep -v "^Binary" | grep -q "localhost"; then
  echo -e "  ${YELLOW}⚠${NC} 发现硬编码的 localhost URL"
  ((WARN++))
else
  echo -e "  ${GREEN}✓${NC} 未发现硬编码的 localhost URL"
  ((PASS++))
fi
echo ""

# 5. 检查Mock数据
echo "🎭 检查 Mock 数据..."
if [ -f "api/mock/modules/shop.js" ]; then
  if grep -q "GET /shop/my" api/mock/modules/shop.js; then
    echo -e "  ${GREEN}✓${NC} Mock 数据已更新为 /shop/my"
    ((PASS++))
  else
    echo -e "  ${RED}✗${NC} Mock 数据仍使用旧的 /shop/info"
    ((FAIL++))
  fi
else
  echo -e "  ${YELLOW}⚠${NC} Mock 文件不存在"
  ((WARN++))
fi
echo ""

# 6. 检查文档
echo "📚 检查文档..."
DOCS=(
  "API-COMPATIBILITY-REPORT.md"
  "API-FIX-SUMMARY.md"
  "API-FINAL-REPORT.md"
  "API-QUICK-REFERENCE.md"
  "README-API-FIX.md"
)

for doc in "${DOCS[@]}"; do
  if [ -f "$doc" ]; then
    echo -e "  ${GREEN}✓${NC} $doc"
    ((PASS++))
  else
    echo -e "  ${YELLOW}⚠${NC} $doc (缺失)"
    ((WARN++))
  fi
done
echo ""

# 7. 检查构建产物
echo "🏗️  检查构建产物..."
if [ -d "unpackage/dist" ]; then
  echo -e "  ${YELLOW}⚠${NC} 发现旧的构建产物，建议清理"
  echo "     运行: rm -rf unpackage/dist"
  ((WARN++))
else
  echo -e "  ${GREEN}✓${NC} 无旧的构建产物"
  ((PASS++))
fi
echo ""

# 8. 检查依赖
echo "📦 检查依赖..."
if [ -f "package.json" ]; then
  if [ -d "node_modules" ]; then
    echo -e "  ${GREEN}✓${NC} 依赖已安装"
    ((PASS++))
  else
    echo -e "  ${RED}✗${NC} 依赖未安装，请运行: npm install"
    ((FAIL++))
  fi
else
  echo -e "  ${RED}✗${NC} package.json 不存在"
  ((FAIL++))
fi
echo ""

# 总结
echo "================================"
echo "📊 检查结果汇总"
echo "================================"
echo -e "${GREEN}通过: $PASS${NC}"
echo -e "${RED}失败: $FAIL${NC}"
echo -e "${YELLOW}警告: $WARN${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}✅ 所有关键检查都通过了！${NC}"
  echo ""
  echo "🚀 下一步操作："
  echo "  1. 清理构建产物: rm -rf unpackage/dist"
  echo "  2. 启动开发服务: npm run dev:mp-weixin"
  echo "  3. 测试关键功能"
  exit 0
else
  echo -e "${RED}❌ 发现 $FAIL 个错误，请修复后再继续${NC}"
  exit 1
fi
