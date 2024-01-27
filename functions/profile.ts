import * as crypto from "node:crypto";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { type PagesFunction } from "@cloudflare/workers-types";

const JWT_SECRET = "hashbrown";

export interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async function ({
  env,
  request,
}) {
  console.log("hi");
  try {
    return new Response("OK");
    // Parse incoming JSON POST body
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
