eval $(minikube docker-env)
docker build -t client:1 -f client/Dockerfile client
docker build -t customer:1 -f services/customer/Dockerfile services/customer
docker build -t car:1 -f services/car/Dockerfile services/car
docker build -t order:1 -f services/order/Dockerfile services/order
kubectl apply -R -f k8s
minikube addons enable ingress