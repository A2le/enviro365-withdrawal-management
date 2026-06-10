#!/bin/bash

echo "Starting backend..."
cd giftntintiliapi || exit
./mvnw spring-boot:run &
BACKEND_PID=$!

cd ..

echo "Starting frontend..."
cd enviro365-withdrawal-ui || exit

if [ ! -d "node_modules" ]; then
  npm install
fi

npm run dev &
FRONTEND_PID=$!

echo ""
echo "================================="
echo "Backend : http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo "Swagger : http://localhost:8080/swagger-ui.html"
echo "================================="
echo ""
echo "Press CTRL+C to stop both apps."

wait