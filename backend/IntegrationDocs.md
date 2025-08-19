# 🧩 Backend Integration Guide

This document describes how the frontend can integrate with the **Labs Y Clinical Trial Backend (Express + MongoDB)**.
All endpoints are prefixed with:

```
/api
```

## 🔑 Authentication

### Register

```http
POST /api/auth/register
```

**Body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123",
  "role": "patient" // roles: patient, doctor, nurse, admin, lab_scientist, supervisor
}
```

### Login

```http
POST /api/auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Response:**

```json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token",
  "user": {
    "id": "...",
    "role": "patient"
  }
}
```

Use `Authorization: Bearer <accessToken>` for all protected routes.

### Refresh Token

```http
POST /api/auth/refresh
```

**Body:**

```json
{ "refreshToken": "refresh-token" }
```

### Logout

```http
POST /api/auth/logout
```

---

## 👤 Patient APIs

* **Dashboard**

  ```http
  GET /api/patient/dashboard
  ```
* **Sign Consent**

  ```http
  POST /api/patient/consent
  { "trialId": "12345", "consent": true }
  ```
* **View Results**

  ```http
  GET /api/patient/results
  ```

---

## 👨‍⚕️ Doctor APIs

* **Approvals List**

  ```http
  GET /api/doctor/approvals
  ```
* **Request Test**

  ```http
  POST /api/doctor/request-test
  { "patientId": "123", "testType": "blood" }
  ```
* **Search Patient**

  ```http
  GET /api/doctor/search?query=John
  ```
* **Consent Decision**

  ```http
  POST /api/doctor/consent-decision
  { "consentId": "123", "status": "approved" }
  ```

---

## 🧑‍⚕️ Nurse APIs

* **Today’s Tasks**

  ```http
  GET /api/nurse/tasks
  ```
* **Update Patient Status**

  ```http
  PATCH /api/nurse/status
  { "patientId": "123", "status": "stable" }
  ```
* **Schedule Follow-up**

  ```http
  POST /api/nurse/follow-up
  { "patientId": "123", "date": "2025-08-21" }
  ```

---

## 🏥 Hospital Admin APIs

* **Dashboard Metrics**

  ```http
  GET /api/admin/dashboard
  ```
* **Users Management**

  ```http
  GET /api/admin/users
  POST /api/admin/users
  PATCH /api/admin/users/:id
  DELETE /api/admin/users/:id
  ```
* **Trials Management**

  ```http
  GET /api/admin/trials
  POST /api/admin/trials
  PATCH /api/admin/trials/:id
  ```
* **Generate QR Code**

  ```http
  POST /api/admin/qrcode
  { "trialId": "123" }
  ```

---

## 🔬 Lab Scientist APIs

* **Test Requests**

  ```http
  GET /api/lab/requests
  ```
* **Upload Results**

  ```http
  POST /api/lab/results
  { "requestId": "123", "fileUrl": "https://..." }
  ```
* **View Results**

  ```http
  GET /api/lab/results/:id
  ```

---

## 🧑‍💼 Supervisor APIs

* **Pending Reports**

  ```http
  GET /api/supervisor/pending
  ```
* **Approve Report**

  ```http
  POST /api/supervisor/approve
  { "reportId": "123", "status": "approved" }
  ```
* **Verify Blockchain Hash**

  ```http
  POST /api/supervisor/verify
  { "reportId": "123" }
  ```

---

## ⚠️ Error Response Format

```json
{
  "error": true,
  "message": "Unauthorized"
}
```

---

## 📌 Notes

* Always include `Authorization: Bearer <accessToken>` for protected routes.
* Tokens expire: handle refresh token flow in the frontend.
* Role-based access enforced — unauthorized roles will receive `403 Forbidden`.

