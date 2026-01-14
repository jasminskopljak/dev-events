// Server-only utility for establishing and caching a MongoDB connection via Mongoose.
//
// Why cache? In Next.js (especially during development with HMR), modules can be
// re-evaluated multiple times. Without caching, each import could create a new
// Mongoose connection, eventually exhausting the connection pool. This module
// stores the connection state on the Node.js global object so that subsequent
// imports reuse the same connection.

import mongoose, { type ConnectOptions, type Mongoose } from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('Missing required environment variable: "MONGODB_URI"');
const MONGODB_URI_STRING: string = MONGODB_URI;

// Type for the cached connection object stored on globalThis.
type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Initialize the cache on first import. Reuse across HMR reloads in development.
const cached: MongooseCache = globalThis.mongooseCache ?? { conn: null, promise: null };
globalThis.mongooseCache = cached;

// Connection options tuned for serverless/Next.js environments.
const options: ConnectOptions = {
  bufferCommands: false, // Rely on explicit connection readiness instead of buffering.
  maxPoolSize: 10, // Reasonable default for API routes/functions.
  serverSelectionTimeoutMS: 5000, // Fail fast if the server is unreachable.
};

/**
 * Establishes a singleton Mongoose connection and returns the Mongoose instance.
 * - Safe to call multiple times; the same connection is reused.
 * - On connection failure, the cached promise is cleared so future calls can retry.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // Return existing connection if ready.
  if (cached.conn) return cached.conn;

  // If there's no in-flight promise, start a new connection attempt.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI_STRING, options);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise so that future calls can retry establishing the connection.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
