# Aura Enterprise Engine

Enterprise-scale inventory analytics and management platform built with the MERN stack.

The application is designed to manage large inventory datasets while providing operational visibility through analytics, filtering, reporting, and inventory health monitoring.

# Demo Link

**(Frontend Server)[]** 
**(Backend Server)[]**

# Overview

## Key Capabilities

### Inventory Operations

* Product inventory management
* Server-side pagination
* Product search with debouncing
* Category-based filtering
* Price range filtering
* Stock-level filtering
* Dynamic sorting
* CSV export for reporting

### Analytics Dashboard

* Total inventory valuation
* SKU tracking
* Out-of-stock monitoring
* Low-stock analysis
* Category-wise inventory distribution

### Data Integrity

* Request validation using Joi
* Business rule enforcement
* Centralized error handling
* MongoDB schema validation

### Performance

* Optimized MongoDB indexes
* Aggregation pipelines for analytics
* Batch data generation and seeding
* Efficient query filtering and pagination


## System Architecture

```text
Frontend (React + Vite)
        │
        ▼
REST API (Express)
        │
        ▼
Service Layer
        │
        ▼
MongoDB (Mongoose)
```

The application follows a layered architecture:

```text
controllers
    │
    ▼
services
    │
    ▼
models
```

This separation keeps business logic isolated from request handling and database operations.


## Technology Stack

### Frontend

* React
* React Router
* Axios
* Recharts
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Joi

## Database Model

Each inventory item contains:

```json
{
  "productName": "Product Name",
  "sku": "SKU-000001",
  "category": "Electronics",
  "price": 299.99,
  "cost": 180.00,
  "stockQuantity": 125,
  "reorderLevel": 25
}
```

### Index Strategy

```js
sku
category
productName (text index)
```

Indexes were introduced to improve query performance for inventory searches and category-based filtering across large datasets.

## Analytics Engine

Analytics are generated using MongoDB aggregation pipelines.

### Dashboard Metrics

* Total Inventory Value
* Total SKU Count
* Out-of-Stock Products

### Inventory Insights

* Low Stock Products
* Category Valuation Breakdown

All calculations are executed at the database layer to minimize application-side processing.

## API Endpoints

### Inventory

```http
GET /api/inventory
POST /api/inventory
PUT /api/inventory/:id
```

Supported query capabilities:

```http
?page=
&limit=
&search=
&category=
&priceRange=
&stockLevel=
&sort=
```

### Analytics

```http
GET /api/analytics
```

Returns dashboard KPIs and visualization datasets.

## Validation Rules

The system enforces the following business constraints:

```text
Price >= Cost
Stock Quantity >= 0
Reorder Level >= 0
```

Invalid requests are rejected before reaching the database layer.

## Dataset

A seeding utility generates 50,000 inventory records using Faker.

The dataset is used to evaluate:

* Query performance
* Pagination behavior
* Aggregation efficiency
* Dashboard responsiveness

## Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend

```env
PORT=5000
MONGODB_URI=<mongodb_connection_string>
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Highlights

* 50,000+ inventory records
* Aggregation-based analytics
* Enterprise-style filtering and reporting
* CSV export workflow
* Validation and error-handling layer
* Scalable service-oriented backend architecture


