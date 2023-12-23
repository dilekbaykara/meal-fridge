import * as crypto from "node:crypto";

export interface Env {
  DB: D1Database;
}

interface ParsedRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // Add other fields as needed
}

const handler: ExportedHandler = {
  async fetch(request: Request, env: Env) {
    if (request.method !== "POST") {
      return new Response(createErrorResponse("Method not allowed"), {
        status: 405,
      });
    }

    try {
      // Parse incoming JSON POST body
      const requestBody: ParsedRequestBody = await request.json();

      // Extract fields from parsed JSON
      const { firstName, lastName, email, password } = requestBody;

      // Convert email addresses to lowercase
      const lowercaseEmail = email.toLowerCase();

      // Validate password is at least 8 characters
      if (password.length < 8) {
        const errorResponse = createErrorResponse(
          "Password must be at least 8 characters"
        );
        return new Response(errorResponse, {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        });
      }
      const salt = crypto.randomBytes(64).toString("base64");

      const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("base64");

      const countQuery = env.DB.prepare(
        "INSERT INTO users(password, email, first_name, last_name, created_at) VALUES(?,?,?,?,?)"
      );
      const countResult = await countQuery
        .bind(`${salt}.${hash}`, email, firstName, lastName, new Date().toString())
        .run();
      if (!countResult.success) {
        console.error(countResult.error);
        const json = JSON.stringify({ error: "unknown error" }, null, 2);

        return new Response(json, {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        });
      }

      const data = {
        hello: "world",
        count_users: countResult.results,
      };

      const json = JSON.stringify(data, null, 2);

      return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      console.error(error);
      const json = JSON.stringify({ error: "invalid JSON format" }, null, 2);
      return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });
    }
  },
};

function createErrorResponse(message: string) {
  return JSON.stringify({ error: message }, null, 2);
}
export default handler;
