/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/requests") {
      if (request.method !== "POST") {
        return Response.json({ message: "Метод не поддерживается." }, { status: 405 });
      }

      try {
        const payload = await request.json() as Record<string, unknown>;
        const clean = (value: unknown, maxLength: number) =>
          typeof value === "string" ? value.trim().slice(0, maxLength) : "";

        if (clean(payload.website, 200)) {
          return Response.json({ ok: true });
        }

        const name = clean(payload.name, 80);
        const contact = clean(payload.contact, 120);
        const question = clean(payload.question, 1000);

        if (name.length < 2 || contact.length < 5) {
          return Response.json(
            { message: "Проверьте имя и контакт для связи." },
            { status: 400 },
          );
        }

        await env.DB.prepare(
          "INSERT INTO consultation_requests (name, contact, question) VALUES (?, ?, ?)",
        ).bind(name, contact, question).run();

        return Response.json({ ok: true }, { status: 201 });
      } catch (error) {
        console.error("Unable to save consultation request", error);
        return Response.json(
          { message: "Сервис временно недоступен. Попробуйте отправить заявку позже." },
          { status: 503 },
        );
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
