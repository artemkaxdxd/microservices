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

order-migrations - https://hub.docker.com/r/artemkaxdxd/order-migrations
```bash
docker pull artemkaxdxd/order-migrations
```

car-migrations - https://hub.docker.com/r/artemkaxdxd/car-migrations
```bash
docker pull artemkaxdxd/car-migrations
```

customer-migrations - https://hub.docker.com/r/artemkaxdxd/customer-migrations
```bash
docker pull artemkaxdxd/customer-migrations
```

client - https://hub.docker.com/r/er4ik/client
```bash
docker pull er4ik/client
```

## Test lab4

To test the freezing go to the **test** folder and do this:
Make sure you have the node.js and npm installed on your pc.

```bash
npm i
npm run start
```
