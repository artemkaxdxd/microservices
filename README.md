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
```bash
minikube tunnel
```
