import { Router } from "express";
import * as monsterController from "../controllers/monsterController";
import * as redirectcontroller from "../controllers/redirectController";
import * as userController from "../controllers/userController";
import * as auth from "../middlewares/auth";

export const router = Router();

// ユーザー情報登録
router.post(
    "/user/register",
    [
        auth.checkUser,
        userController.createUser,
    ],
);

// ユーザー情報取得
router.get(
    "/user/me",
    [
        auth.checkUser,
        userController.getUserInfo,
    ],
);

// 規約取得
router.get(
    "/term",
    [
        userController.getTerm,
    ],
);

// GPSを送って周囲のモンスター情報を取得
router.get(
    "/monsters/map",
    [
        auth.checkUser,
        monsterController.getMonster,
    ],
);

// 図鑑取得
router.get(
    "/monsters",
    [
        auth.checkUser,
        monsterController.getKind,
    ],
);

// モンスター取得
router.put(
    "/monsters/get",
    [
        auth.checkUser,
        monsterController.putMonster,
    ],
);

router.get(
    "/store/android",
    redirectcontroller.redirectForGooglePlay,
);

router.get(
    "/store/ios",
    redirectcontroller.redirectForAppleStore,
);
