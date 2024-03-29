import * as crypto from "node:crypto";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { type PagesFunction } from "@cloudflare/workers-types";

const JWT_SECRET = "hashbrown";

export interface Env {
  DB: D1Database;
}

interface ParsedRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const onRequestPost: PagesFunction<Env> = async function ({
  env,
  request,
}) {
  console.log("hi");

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
        status: 400,
      });
    }

    // Throw an error if lowercaseEmail matches another sign up request
    const checkEmailQuery = env.DB.prepare(
      "SELECT email FROM users WHERE email = ?"
    );
    const emailQueryResult = await checkEmailQuery.bind(lowercaseEmail).run();
    if (!emailQueryResult.success) {
      console.log(emailQueryResult.error);
      const json = JSON.stringify({ error: "unknown error 1" }, null, 2);

      return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        status: 500,
      });
    }

    if (emailQueryResult.results.length === 1) {
      const json = JSON.stringify({ error: "email already exists" }, null, 2);

      return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        status: 400,
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
      .bind(
        `${salt}.${hash}`,
        lowercaseEmail,
        firstName,
        lastName,
        new Date().toString()
      )
      .run();
    if (!countResult.success) {
      console.error(countResult.error);
      const json = JSON.stringify({ error: "unknown error 2" }, null, 2);

      return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        status: 500,
      });
    }

    const exp = Date.now() + 365 * 24 * 60 * 60 * 1000;

    const token = await jwt.sign({ email, exp }, JWT_SECRET);

    const data = {
      jwt: token,
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
    const json = JSON.stringify({ error: "unknown error 3" }, null, 2);
    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      status: 500,
    });
  }
};

function createErrorResponse(message: string) {
  return JSON.stringify({ error: message }, null, 2);
}
