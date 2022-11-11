import * as dotenv from "dotenv";
dotenv.config();

export const square = {
    locationId: process.env.SQUARE_LOCATION_ID!,
    appName: process.env.SQUARE_APP_NAME!,
    apiVersion: process.env.SQUARE_API_VERSION!,

    appId: process.env.SQUARE_ACCESS_TOKEN_PROD! || process.env.SQUARE_APP_ID!,
    accessToken: process.env.SQUARE_ACCESS_TOKEN_PROD! || process.env.SQUARE_ACCESS_TOKEN!
};
