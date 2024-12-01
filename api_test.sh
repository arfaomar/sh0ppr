#!/bin/bash
################################################################################################
# Prerequisites: jq, curl
################################################################################################

BASE_URL="http://localhost:3000/api"

make_request() {
    echo -e "  Method: \t $method"
    echo -e "  URL: \t\t $BASE_URL$path"
    echo -e "  Body: \t $body"
    echo

    response=$(curl -sw "\n%{http_code}" -X "$method" "$BASE_URL$path" \
      -H "Content-Type: application/json" \
      -d "$body")

    response_body=$(echo "$response" | head -n -1)
    status_code=$(echo "$response" | tail -n1)

    echo "  Response"

    if (($status_code >= 200 && $status_code < 300)); then
      echo -e "    - Status: \t \e[32m$status_code\e[0m"
      echo -e "    - Body: \t $response_body"
    else
      if (($badcase == true && $status_code == 404)); then
        echo -e "    - Status: \t \e[31m$status_code\e[0m \e[32mBut it is OK!\e[0m"
      else
        echo -e "    - Status: \t \e[31m$status_code\e[0m"
      fi
      echo -e "    - Body: \t $response_body"
    fi

    echo
    echo
    echo
}

badcase=false

echo "Create new shopping list"
method="POST"
path="/shoppinglist/"
body='{ "name": "Test shopping list", "description": "Test shopping list description" }'
make_request
shoppingListUuid=$(echo "$response_body" | jq -r '.shoppingListUuid')

echo "Get shopping list"
method="GET"
path="/shoppinglist/$shoppingListUuid/"
body=''
make_request

echo "Create new article"
method="POST"
path="/article/"
body='{ "name": "Test article", "description": "Test article description" }'
make_request
articleId=$(echo "$response_body" | jq -r '.articleId')

echo "Get article"
method="GET"
path="/article/$articleId/"
body=''
make_request

echo "Add article to shopping list"
method="POST"
path="/shoppinglist/$shoppingListUuid/articles/"
body="{ \"articleId\": $articleId, \"quantity\": 69 }"
make_request

echo "Update article"
method="PATCH"
path="/article/$articleId/"
body='{ "name": "Updated test article" }'
make_request

echo "Update shopping list"
method="PATCH"
path="/shoppinglist/$shoppingListUuid/"
body='{ "name": "Updated test shopping list" }'
make_request

echo "Get articles in shopping list"
method="GET"
path="/shoppinglist/$shoppingListUuid/articles/"
body=""
make_request

echo "Get all shopping lists"
method="GET"
path="/shoppinglist/"
body=''
make_request

echo "Get all articles"
method="GET"
path="/article/"
body=''
make_request

echo
echo
echo "--- DELETE ---"
echo

echo "Delete article from shopping list"
method="DELETE"
path="/shoppinglist/$shoppingListUuid/articles/$articleId/"
body=''
make_request

echo "Check if shopping list is empty"
method="GET"
path="/shoppinglist/$shoppingListUuid/articles/"
body=""
badcase=true
make_request
badcase=false

echo "Delete article"
method="DELETE"
path="/article/$articleId/"
body=''
make_request

echo "Check if article is gone"
method="GET"
path="/article/$articleId/"
body=''
badcase=true
make_request
badcase=false

echo "Delete shopping-list"
method="DELETE"
path="/shoppinglist/$shoppingListUuid/"
body=''
make_request

echo "Check if shopping list is gone"
method="GET"
path="/shoppinglist/$shoppingListUuid/"
body=''
badcase=true
make_request
badcase=false
