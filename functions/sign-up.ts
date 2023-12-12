export interface Env {
  DB: D1Database;
}
const handler: ExportedHandler = {
  async fetch(request: Request, env: Env) {
    const countQuery = env.DB.prepare("select count(*) from users");
    const countResult = await countQuery.run();
    if (!countResult.success){
      console.error(countResult.error)
        const json = JSON.stringify({error: "unknown error"}, null, 2);

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
  },
};
export default handler;
