import * as express from "express";
import * as admin from "firebase-admin";

// headerのIDTokenからuidの取得
export const checkUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const idTokenHeader: string | undefined = req.header("Authorization");
    if (typeof idTokenHeader === "undefined") {
        console.log("ID token not specified");
        return next(new Error("ID token not specified"));
    }

    const idToken = idTokenHeader.split(" ")[1];
    try {
        const decodedIdToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(idToken);
        req.uid = decodedIdToken.uid;
    } catch (err) {
        console.log(err);
        return next(new Error("Request not authorized"));
    }

    return next();
};
