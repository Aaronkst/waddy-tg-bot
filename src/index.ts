import { resolve } from "path";
import { addAlias } from "module-alias";

const alias = "@";
const aliasPath = resolve(__dirname, ".");

addAlias(alias, aliasPath);

import { bootstrapServer } from "@/app";

bootstrapServer()
  .then((server) => {
    server.listen({ host: "0.0.0.0", port: 3000 }, function (err, address) {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`Server is now listening on ${address} ✨`);

      server.io.on("connect", (socket) =>
        server.log.info("Socket connected: " + socket.id),
      );
    });
  })
  .catch((err) => {
    console.error("error starting server", err);
  });
