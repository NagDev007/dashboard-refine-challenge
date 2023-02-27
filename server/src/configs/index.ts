import dotenv from "dotenv";

dotenv.config();

// const MONGO_USERNAME = process.env.MONGO_USERNAME || ''
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
const MONGO_URL = process.env.MONGO_LOCAL_URL || "";

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

const ACCESS = process.env.JWT_SECRET || "";
const REFRESH = process.env.JWT_REFRESH_SECRET || "";
const ACCESS_TTL = Number(process.env.JWT_LIFETIME_EXPIRATION) || 3600;
const REFRESH_TTL =
  Number(process.env.JWT_REFRESH_LIFETIME_EXPIRATION) || 86400;

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const MAIN_FOLDER_NAME = process.env.MAIN_FOLDER;

export const defaultConfiguration = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  jwt: {
    access: ACCESS,
    refresh: REFRESH,
    access_ttl: ACCESS_TTL,
    refresh_ttl: REFRESH_TTL,
  },
  cloudinary: {
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  },
  assets: {
    main_folder: MAIN_FOLDER_NAME,
  },
};
