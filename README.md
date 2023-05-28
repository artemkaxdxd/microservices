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
docker pull er4ik/order:2
```

car - https://hub.docker.com/r/er4ik/car
```bash
docker pull er4ik/car:2
```

customer - https://hub.docker.com/r/artemkaxdxd/customer
```bash
docker pull artemkaxdxd/customer:2
```

email - https://hub.docker.com/r/artemkaxdxd/email
```bash
docker pull artemkaxdxd/email:5
```

order-migrations - https://hub.docker.com/r/artemkaxdxd/order-migrations
```bash
docker pull artemkaxdxd/order-migrations:1
```

car-migrations - https://hub.docker.com/r/artemkaxdxd/car-migrations
```bash
docker pull artemkaxdxd/car-migrations:1
```

customer-migrations - https://hub.docker.com/r/artemkaxdxd/customer-migrations
```bash
docker pull artemkaxdxd/customer-migrations:1
```

client - https://hub.docker.com/r/er4ik/client
```bash
docker pull er4ik/client:2
```

## Test lab4

To test the freezing go to the **test** folder and do this:
Make sure you have the node.js and npm installed on your pc.

```bash
npm i
npm run start
```

## Test lab5

To test the correct work of rabbitmq do this after installing helm: 
```bash
minikube tunnel
kubectl port-forward service/rabbitmq 15672:15672 
```
Then go to [http://localhost:15672/#/queues/%2F/create_customer](http://localhost:15672/#/queues/%2F/create_customer) and log in using username and password - user, user.
After that, you need to go to [localhost](http://localhost) and make a new customer.
Then go back to rabbitmq console at http://localhost:15672/#/queues/%2F/create_customer and you can see that the message has been transmitted. Or you can go to your terminal and pull up logs from email pod like this:
```bash
kubectl logs pod/local-email-66c9545cb4-2cb25
```