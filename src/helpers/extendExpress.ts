import * as Express from "express";

// Requestにuidを追加
declare global {
    namespace Express {
        interface Request {
            uid: string;
        }
    }
}
