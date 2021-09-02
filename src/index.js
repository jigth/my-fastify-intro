const { join } = require('path');

const fastify = require("fastify")({
  logger: true,
});

// Official Plugins
fastify.register(require('fastify-static'), {
  root: join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})

// My Plugins
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
