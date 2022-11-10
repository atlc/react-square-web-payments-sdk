import * as dotenv from "dotenv";
dotenv.config();

export const square = {
    appId: process.env.SQUARE_APP_ID!,
    accessToken: process.env.SQUARE_ACCESS_TOKEN!,
    appName: process.env.SQUARE_APP_NAME!,
    apiVersion: process.env.SQUARE_API_VERSION!,
    locationId: process.env.SQUARE_LOCATION_ID!
};

console.log({ appId: square.appId, locationId: square.locationId });
