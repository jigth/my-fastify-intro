async function routes(fastify, options, done) {
    fastify.register((fastify, opts, done) => {
        fastify.addHook('preSerialization', (request, reply, payload, done) => {
            payload['currentUTCDate'] = new Date();
            done();
        });

        fastify.get('/', async (request, reply) => {
            return { response: "Welcome to the Jigth's Fastify example API" };
        });

        fastify.post('/throw-it-back', async (request, reply) => {
            return { 'your-request': request.body };
        });

        fastify.post('/throw-it-back-with-joy', async (request, reply) => {
            request.body['joy'] = 'infinite';
            return { 'your-request-with-joy': request.body };
        });
        done();
    });

    fastify.get('/maybe', (request, reply) => {
        const num = Math.round(Math.random());
        const response = num ? 'yes' : 'nope';
        return { response };
    });

    fastify.get('/regex/:file(^\\w+).png', (request, reply) => {
        const { file } = request.params;
        const requestedImage = `${file}.png`;

        reply.send({
            requestedImage,
            tip: "Accept any regex like: '(any word characters).png'",
            examples: [
                {
                    numbers: '1234.png',
                },
                {
                    letters: 'abcd.png',
                },
                {
                    alnum: 'abc123.png',
                },
                {
                    alnumAndUnderscores: 'foo__abc_123.png',
                },
            ],
        });
    });
    done();
}

module.exports = routes;
