const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("./my-plugins/routes/index"))
    .after(err => console.log({ err }))  // Handle error during plugin registration

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
