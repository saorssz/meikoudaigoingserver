import * as express from "express";

export const redirectForGooglePlay = async (req: express.Request, res: express.Response) => {
    res.set("Location", "http://play.google.com/store/apps/details?id=com.google.android.youtube").status(302).end();
};

export const redirectForAppleStore = async (req: express.Request, res: express.Response) => {
    res.set("Location", "https://apps.apple.com/jp/app/%E5%90%8D%E5%B7%A5%E5%A4%A7going/id1488129145").status(302).end();
};
