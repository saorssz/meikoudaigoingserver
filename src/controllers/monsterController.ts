import * as express from "express";
import * as typeorm from "typeorm";
import { GetMonster } from "../DB/entities/getMonster";
import { MonsterInfo } from "../DB/entities/monsterInfo";
import { MonsterKind } from "../DB/entities/monsterKind";
import { UserInfo } from "../DB/entities/userInfo";

// GPSを送って周囲のモンスター情報を取得(GET)
export const getMonster = async (req: express.Request, res: express.Response) => {
    const uid: string = req.uid;

    try {
        const getMonsterRepository: any = await typeorm.getRepository(MonsterInfo);
        const getMonsterArray = await getMonsterRepository.find({ relations: ["kind"] });

        const getMyMonsterRepository: any = await typeorm.getRepository(GetMonster);
        const myMonsterArray = await getMyMonsterRepository.find({ where: { uuid: uid }, order: { kindId: "ASC" } });

        for (let i = 0, j = 0; i < 25 && j < myMonsterArray.length; i++) {
            if (getMonsterArray[i].kind.id === myMonsterArray[j].kindId) {
                getMonsterArray[i].kind.isGet = true;
                j++;
            }
        }

        res.status(200).json(getMonsterArray);
    } catch (e) {
        console.error(e);
    }
};

// 図鑑取得(GET)
export const getKind = async (req: express.Request, res: express.Response) => {
    const uid: string = req.uid;

    try {
        const getKindRepository: any = await typeorm.getRepository(MonsterKind);
        const getKindArray = await getKindRepository.find();

        const getMyMonsterRepository: any = await typeorm.getRepository(GetMonster);
        const myMonsterArray = await getMyMonsterRepository.find({ where: { uuid: uid }, order: { kindId: "ASC" } });

        for (let i = 0, j = 0; i < 25 && j < myMonsterArray.length; i++) {
            if (getKindArray[i].id === myMonsterArray[j].kindId) {
                getKindArray[i].isGet = true;
                j++;
            }
        }

        res.status(200).json(getKindArray);
    } catch (e) {
        console.error(e);
    }
};

// モンスター取得API(PUT)
export const putMonster = async (req: express.Request, res: express.Response) => {
    const uid: string = req.uid;
    const kindId: number = req.body.id;

    try {
        const monster = new GetMonster();
        monster.uuid = uid;
        monster.kindId = kindId;

        const getMyMonsterRepository: any = await typeorm.getRepository(GetMonster);
        await getMyMonsterRepository.save(monster);

        const userInfoRepository: any = await typeorm.getRepository(UserInfo);
        const user = await userInfoRepository.findOne({ id: uid });

        user.monstersCount++;
        if (user.monstersCount <= 3) {
            user.grade = 1;
            user.progress = (999 / 3) * user.monstersCount;
        } else if (3 < user.monstersCount && user.monstersCount <= 8) {
            user.grade = 2;
            user.progress = (999 / 5) * (user.monstersCount - 3);
        } else if (8 < user.monstersCount && user.monstersCount <= 15) {
            user.grade = 3;
            user.progress = (999 / 7) * (user.monstersCount - 8);
        } else {
            user.grade = 4;
            user.progress = (999 / 10) * (user.monstersCount - 15);
        }
        await userInfoRepository.save(user);

        const kindRepository: any = await typeorm.getRepository(MonsterKind);
        const kind = await kindRepository.findOne({ select: ["id", "name", "rank", "isGet", "modelId", "text"], where: { id: kindId } });

        res.status(200).json(kind);
    } catch (e) {
        console.error(e);
    }
};
