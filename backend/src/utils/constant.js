import dotenv from 'dotenv';
dotenv.config();

export const DB_CONNECT = process.env.DB_CONNECT;
export const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
export const PORT = process.env.PORT || 5000;
export const statusCode = {
    SUCCESS:200,
    VALIDATION_ERROR : 202,
    UNPROCESSABLE_ENTRY : 202,
    AUTH_ERROR:203,
}