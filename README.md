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
```

### Step 2 - Docker images
```
chmod +x docker.sh && ./docker.sh
```

Client available on the port: 4000

### Step 3 - Run tunnel
Be sure that you wrote **eval $(minikube docker-env)** in terminal

```bash
kubectl apply -R -f k8s
minikube addons enable ingress
minikube tunnel
```

## Docker hub
order - https://hub.docker.com/r/er4ik/order
```bash
docker pull er4ik/order
```

car - https://hub.docker.com/r/er4ik/car
```bash
docker pull er4ik/car
```

customer - https://hub.docker.com/r/er4ik/customer
```bash
docker pull er4ik/customer
```

client - https://hub.docker.com/r/er4ik/client
```bash
docker pull er4ik/client
```