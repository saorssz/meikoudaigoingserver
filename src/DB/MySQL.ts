import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { GetMonster } from "./entities/getMonster";
import { MonsterInfo } from "./entities/monsterInfo";
import { MonsterKind } from "./entities/monsterKind";
import { UserInfo } from "./entities/userInfo";

export class MySQL {

    public static init(): Promise<Connection> {
        const options: ConnectionOptions = {
            database: "heroku_4e357308ff60e41",
            entities: [
                UserInfo,
                GetMonster,
                MonsterInfo,
                MonsterKind,
            ],
            host: "us-cdbr-iron-east-05.cleardb.net",
            password: "c288bcb9",
            port: 3306,
            synchronize: false,
            type: "mysql",
            username: "be8bef6de8c56b",
            logging: false,
        };

        return createConnection(options);
    }
}
