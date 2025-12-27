export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Ticket Event API (Gatekeeper Logic)",
    version: "1.0.0",
    description: "Dokumentasi API untuk Soal 2 & Soal 3 (Backend Submission)",
    contact: {
      name: "Developer",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterInput: {
        type: "object",
        properties: {
          full_name: { type: "string", example: "Budi Santoso" },
          email: { type: "string", example: "budi@mail.com" },
          password: { type: "string", example: "rahasia123" },
          role: {
            type: "string",
            enum: ["CUSTOMER", "ADMIN"],
            example: "CUSTOMER",
          },
        },
      },
      LoginInput: {
        type: "object",
        properties: {
          email: { type: "string", example: "budi@mail.com" },
          password: { type: "string", example: "rahasia123" },
        },
      },
      EventInput: {
        type: "object",
        properties: {
          title: { type: "string", example: "Konser Musik 2025" },
          description: { type: "string", example: "Konser meriah banget" },
          event_date: {
            type: "string",
            format: "date-time",
            example: "2025-12-31T19:00:00Z",
          },
          location: { type: "string", example: "GBK Jakarta" },
          quota_total: { type: "integer", example: 100 },
          price: { type: "number", example: 150000 },
        },
      },
      TransactionInput: {
        type: "object",
        properties: {
          event_id: { type: "string", example: "masukkan-uuid-event-disini" },
          quantity: { type: "integer", example: 2 },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register User Baru",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterInput" },
            },
          },
        },
        responses: {
          201: { description: "Created" },
          400: { description: "Email exist" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login User",
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" },
            },
          },
        },
        responses: {
          200: { description: "Success (Token returned)" },
          401: { description: "Invalid Creds" },
        },
      },
    },
    "/events": {
      get: {
        tags: ["Events"],
        summary: "Get All Events (Public)",
        responses: { 200: { description: "List Events" } },
      },
      post: {
        tags: ["Events"],
        summary: "Create Event (Admin Only)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EventInput" },
            },
          },
        },
        responses: {
          201: { description: "Event Created" },
          403: { description: "Forbidden" },
        },
      },
    },
    "/events/{id}": {
      get: {
        tags: ["Events"],
        summary: "Get Event Detail",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Detail Event" },
          404: { description: "Not Found" },
        },
      },
    },
    "/transactions": {
      post: {
        tags: ["Transactions"],
        summary: "Buy Ticket (Gatekeeper Logic)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TransactionInput" },
            },
          },
        },
        responses: {
          201: { description: "Transaction Created" },
          400: { description: "Sold Out" },
        },
      },
    },
  },
};
