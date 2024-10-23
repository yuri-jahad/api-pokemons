import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import fastifyPlugin from "fastify-plugin";

async function ajvPlugin(fastify, options) {
  const ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true,
    $data: true,
    allErrors: true,
    removeAdditional: false,
    strict: false,
    verbose: true,
  });

  ajvFormats(ajv);

  fastify.setValidatorCompiler(({ schema }) => ajv.compile(schema));

  fastify.setErrorHandler(async (error, request, reply) => {
    if (error.validation) {
      const errors = error.validation.map((err) => {
        console.log(err.keyword);
        if (
          err.parentSchema &&
          err.parentSchema.errorMessage &&
          err.parentSchema.errorMessage[err.keyword]
        ) {
          return err.parentSchema.errorMessage[err.keyword];
        }
        return err;
      });

      return reply.status(400).send({
        errorType: "ValidationError",
        errorInfo: errors,
      });
    }
    reply.send(error);
  });

  fastify.decorate("ajv", ajv);
}

export default fastifyPlugin(ajvPlugin);
