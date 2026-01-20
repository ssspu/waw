#!/bin/bash

# WAWmanager API 测试脚本
# 用于测试关键API接口是否正常

echo "🧪 WAWmanager API 测试"
echo "================================"
echo ""

# 配置
API_BASE_URL="https://bioflex.cn/api"
TOKEN=""  # 需要先登录获取Token

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# 测试计数
PASS=0
FAIL=0

# 测试函数
test_api() {
  local name=$1
  local method=$2
  local endpoint=$3
  local expected_code=$4

  echo -n "测试 $name ... "

  if [ -z "$TOKEN" ]; then
    # 无Token的公开接口测试
    response=$(curl -s -w "\n%{http_code}" -X $method "$API_BASE_URL$endpoint")
  else
    # 需要Token的接口测试
    response=$(curl -s -w "\n%{http_code}" -X $method \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      "$API_BASE_URL$endpoint")
  fi

  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n-1)

  if [ "$http_code" = "$expected_code" ]; then
    echo -e "${GREEN}✓ 通过${NC} (HTTP $http_code)"
    ((PASS++))
  else
    echo -e "${RED}✗ 失败${NC} (HTTP $http_code, 期望 $expected_code)"
    echo "  响应: $body"
    ((FAIL++))
  fi
}

# 开始测试
echo "📡 测试公开接口..."
echo ""

# 测试店铺列表（公开接口）
test_api "获取店铺列表" "GET" "/shop/list?page=1&limit=10" "200"

# 测试服务分类（公开接口）
test_api "获取服务分类" "GET" "/category/list" "200"

echo ""
echo "🔐 测试需要认证的接口..."
echo ""

if [ -z "$TOKEN" ]; then
  echo -e "${BLUE}ℹ 跳过需要认证的接口测试（未提供Token）${NC}"
  echo "  提示: 在脚本中设置 TOKEN 变量后可测试认证接口"
else
  # 测试获取我的店铺
  test_api "获取我的店铺" "GET" "/shop/my" "200"

  # 测试获取用户信息
  test_api "获取用户信息" "GET" "/user/info" "200"

  # 测试获取订单列表
  test_api "获取订单列表" "GET" "/order/list?page=1&limit=10" "200"
fi

echo ""
echo "================================"
echo "📊 测试结果汇总"
echo "================================"
echo -e "${GREEN}通过: $PASS${NC}"
echo -e "${RED}失败: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}✅ 所有测试都通过了！${NC}"
  exit 0
else
  echo -e "${RED}❌ 有 $FAIL 个测试失败${NC}"
  exit 1
fi
