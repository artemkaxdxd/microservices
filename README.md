# Microservices

## Team 1
- **Бондарчук Артем** - Customer Service
- **Маковій Віктор** - Car Service
- **Курзанцев Андрій** - Maintenance Service
- **Османов Ервін** - Order Service

## Installation
Be sure that Minikube, Kubectl, Node.js and npm installed on your pc

## Usage

### Step 1 - Minikube
```bash
minikube start
eval $(minikube docker-env)
kubectl apply -R -f k8s
minikube addons enable ingress
```

### Step 2 - Docker images
Be sure that you wrote **eval $(minikube docker-env)** in terminal

**Client**
```
docker build -t client:1 -f client/Dockerfile client
```

Client available on the port: 4000

**Backends**
```
docker build -t customer:1 -f services/customer/Dockerfile services/customer
docker build -t car:1 -f services/car/Dockerfile services/car
docker build -t order:1 -f services/order/Dockerfile services/order
```

### Step 3 - Run tunnel
```bash
minikube tunnel
```
