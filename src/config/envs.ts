import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  STATE: string;
  DATABASE_URL: string;
  NATS_SERVERS: string[];
  JWT_SECRET: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    STATE: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({ ...process.env, NATS_SERVERS: process.env.NATS_SERVERS?.split(',') });

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  state: envVars.STATE,
  databaseUrl: envVars.DATABASE_URL,
  natsServers: envVars.NATS_SERVERS,
  jwtSecret: envVars.JWT_SECRET,
};
