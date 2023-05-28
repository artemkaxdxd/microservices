eval $(minikube docker-env)
docker build -t client:2 -f client/Dockerfile client
docker build -t customer:2 -f services/customer/Dockerfile services/customer
docker build -t car:2 -f services/car/Dockerfile services/car
docker build -t order:2 -f services/order/Dockerfile services/order
docker build -t customer-migrations:1 -f services/customer/migrations/Dockerfile services/customer
docker build -t car-migrations:1 -f services/car/migrations/Dockerfile services/car
docker build -t order-migrations:1 -f services/order/migrations/Dockerfile services/order
docker build -t email:5 -f services/email/Dockerfile services/email
