/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { ResponseLike, REST, Routes } from "discord.js";
import { ReadableStream } from "node:stream/web";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest(async (request, response) => {
  const responseLike: ResponseLike = {
    body: new ReadableStream(),
    arrayBuffer: function (): Promise<ArrayBuffer> {
      throw new Error("Function not implemented.");
    },
    bodyUsed: false,
    headers: new Headers(),
    json: function (): Promise<unknown> {
      throw new Error("Function not implemented.");
    },
    ok: false,
    status: 0,
    statusText: "",
    text: function (): Promise<string> {
      throw new Error("Function not implemented.");
    },
  };

  console.log({ responseLike });

  const rest = new REST({ version: "10" }).setToken("TOKEN");
  try {
    await rest.post(Routes.channelMessages("CHANNEL_ID"), {
      body: {
        content: "A message via REST!",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }

  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
