[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

# Tickets Microservices Application


A full stack application powered by the microservice architecture pattern using Nodejs, ExpressJS , NextJS, Nats Streaming server as broker, 
Kubernetes, Docker, Jest, github actions and skaffold..

## Infrastructure

By now, the functional services are still decomposed into 6 core services. Each of them can be tested, built, and deployed independently.

![Infrastructure plan](https://github.com/ridhamz/Tickets-MicroServices-App/blob/main/tickets-app.png)

### Run and deploy all service into kubernetes cluster using skaffold

Skaffold is a command line tool that facilitates continuous development for Kubernetes applications.

```yml
skaffold dev
```

![skaffold](https://github.com/ridhamz/Tickets-MicroServices-App/blob/main/skaffold.png)

### Publish and Receive events using Nats Streaming Server:

NATS Streaming is a data streaming framework powered by NATS. It is an open-source messaging system written in Go programming language. 

![skaffold](https://github.com/ridhamz/Tickets-MicroServices-App/blob/main/publish-event.png)

### Client service
NextJS application that provides several ui interfaces with all front-end logic.

| Method | Path               | Description                                 
|--------|--------------------|-----------------------------------------------
| GET    | /                  | Get the available list of tickets 
| GET    | /auth/signin       | Display sign in form  
| GET    | /auth/signup       | Display sign up  form 
| GET    | /tickets/new       | Add or Sell ticket  
| GET    | /tickets/:id       | Ticket details
| GET    | /orders/:id        | Display specific order  
| GET    | /orders            | Display all user orders  
| GET    | /orders/:id        | Display specific order  


### Auth service
Provides several API for user authentication and authorization JWT and cookie session.

| Method | Path                    | Description                                 
|--------|-------------------------|-----------------------------------------------
| POST   | /api/users/signin       | User sign in                                
| POST   | /api/users/signup       | User sign up    
| GET    | /api/users/current user | Get the current user data 
| POST   | /api/users/logout       | User logout                                 

### Ticket service
Provides several API create, read, update and delete a Ticket.

| Method   | Path              | Description                                   
|----------|-------------------|----------------------------------------------
| GET      | /api/tickets      | Get all available tickets                 
| POST     | /api/tickets/new  | Create new ticket 
| PUT      | /api/tickets/:id  | Update ticket
| DELETE   | /api/tickets/:id  | Delete ticket 

### Order service
Provides several API create, read, and delete an order.

| Method   | Path              | Description                                   
|----------|-------------------|----------------------------------------------
| GET      | /api/orders       | Get all orders that the login user has             
| POST     | /api/orders/new   | Create new order 
| DELETE   | /api/order/:id    | Delete order 

### Payment service
Provides several API create a payment based on Stripe API.

| Method   | Path              | Description                                   
|----------|-------------------|----------------------------------------------         
| POST     | /api/payment/new  | Create new payment 



### Expiration service
This service is only responsible for watching active orders it publish an event when a psecific order is expired.





