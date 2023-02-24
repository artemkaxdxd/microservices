# Microservices

## Team 1
- **Бондарчук Артем** - Customer Service
- **Маковій Віктор** - Car Service
- **Курзанцев Андрій** - Maintenance Service
- **Османов Ервін** - Order Service

## Usage

### Docker images
```
docker build -t customer:1 -f services/customer/Dockerfile services/customer
docker build -t car:1 -f services/car/Dockerfile services/car
docker build -t order:1 -f services/order/Dockerfile services/order
```

### Minikube
```bash
minikube start
eval $(minikube docker-env)
kubectl apply -R -f k8s
minikube addons enable ingress
minikube tunnel
```