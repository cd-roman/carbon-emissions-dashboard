const UPSTREAM = "https://carbonsutra1.p.rapidapi.com";

const ALLOWED_PATHS = new Set([
  "/flight_estimate",
  "/distance-between-airports",
]);

export default async (request: Request) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(
    /^(\/\.netlify\/functions\/carbonsutra|\/carbonsutra)/,
    ""
  );

  if (!ALLOWED_PATHS.has(path)) {
    return new Response(JSON.stringify({ error: "Unsupported endpoint" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  const headers: Record<string, string> = {
    "X-RapidAPI-Key": process.env.VITE_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": process.env.VITE_RAPID_API_HOST ?? "",
    Authorization: `Bearer ${process.env.VITE_RAPID_API_AUTHORIZATION ?? ""}`,
  };

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers["content-type"] = contentType;
  }

  const upstream = await fetch(`${UPSTREAM}${path}${url.search}`, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text(),
  });

  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
};

export const config = {
  path: "/carbonsutra/*",
};
