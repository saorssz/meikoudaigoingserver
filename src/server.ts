import * as bodyParser from "body-parser";
import Express from "express";
import * as admin from "firebase-admin";
import { MySQL } from "./DB/MySQL";
import { router } from "./routers/router";

import * as serviceAccount from "../secret_key/serviceAccountKey.json";

const params = {
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    authUri: serviceAccount.auth_uri,
    clientC509CertUrl: serviceAccount.client_x509_cert_url,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    privateKey: serviceAccount.private_key,
    privateKeyId: serviceAccount.private_key_id,
    projectId: serviceAccount.project_id,
    tokenUri: serviceAccount.token_uri,
    type: serviceAccount.type,
};

class Server {

    public app: Express.Application;

    constructor() {
        this.app = Express();
        MySQL.init()
            .then((connection) => {
                this.middleware();
                this.routers();
                this.launch();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        admin.initializeApp({
            credential: admin.credential.cert(params),
        });
    }

    private routers(): void {
        this.app.use(
            "/",
            router,
        );
    }

    private launch(): void {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log("Example app listening on http://localhost:3000");
        });
    }
}

export default new Server().app;
