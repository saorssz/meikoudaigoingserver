import * as express from "express";
import * as typeorm from "typeorm";

import { GetMonster } from "../DB/entities/getMonster";
import { UserInfo } from "../DB/entities/userInfo";

// ユーザー情報登録
export const createUser = async (req: express.Request, res: express.Response) => {
    const uid = req.uid;
    const userName = req.body.userName;

    try {
        const userInfo = new UserInfo();
        userInfo.id = uid;
        userInfo.name = userName;

        const userInfoRepository: any = await typeorm.getRepository(UserInfo);
        const getMonsterRepository: any = await typeorm.getRepository(GetMonster);

        const storedUserInfo: UserInfo | undefined = await userInfoRepository.findOne({ id: uid });
        if (storedUserInfo !== undefined) {
            userInfoRepository.remove(storedUserInfo);

            const getMonsterByUserArray = await getMonsterRepository.find({ uuid: storedUserInfo.id });
            for (const monster of getMonsterByUserArray) {
                await getMonsterRepository.remove(monster);
            }
        }
        await userInfoRepository.save(userInfo);

        res.status(200).send(userInfo);
    } catch (error) {
        console.error(error);
    }
};

// ユーザー情報取得
export const getUserInfo = async (req: express.Request, res: express.Response) => {
    const uid: string = req.uid;

    try {
        const userInfoRepository: any = await typeorm.getRepository(UserInfo);

        const userInfo = await userInfoRepository.findOne({ id: uid });

        res.status(200).json(userInfo);
    } catch (e) {
        console.error(e);
    }
};

// 規約情報取得
export const getTerm = async (req: express.Request, res: express.Response) => {
    try {
        const term: string = `利用規約
        第1条(適用)
        本規約はユーザーとC0de(以下、当団体とします)との間の本サービスの利用に関わる一切の関係に適用されるものとします。

        第2条(利用登録、登録情報の管理)
        1.アプリケーション(以下、アプリとします)を利用する際に表示される登録画面に必要事項を入力し、利用登録が完了するものとします。

        2.ユーザーは、事故の責任において本サービスの登録情報を管理するものとします。

        3.ユーザーは、いかなる場合も登録情報を第三者に譲渡、または貸与できないものとします。

        第3条(禁止事項)
        ユーザーは本サービスを利用するに当たり、以下の行為をしてはなりません。

        法令、または公序良俗に違反する行為
        犯罪行為に関連する行為
        当団体のサーバー、またはネットワークの機能を破壊したり、妨害したりする行為。
        当団体のサービスの運営を妨害するおそれのある行為
        他のユーザーに関する個人情報、ゲームの進行状況などを収集する行為
        他のユーザーになりすます行為
        当団体のサービスに関連して反社会的勢力に対して直接的、または間接的に利益を供与する行為
        歩きながらのスマートフォン、タブレット等の操作、周囲に対して危険を及ぼすおそれのある行為
        当団体の提供するサービスにおける問題の内容、ストーリーなどをSNS等で発信する行為
        その他、当団体が不適切と判断する行為
        第4条(サービスの停止等)
        1.当団体は以下のいずれかの自由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部、または一部の提供を停止、または中断することができるものとします。

        本サービスにかかるコンピュータシステムの保守点検、または更新を行う場合
        地震、落雷、火災、停電、噴火、戦争などの不可抗力により、本サービスの提供が困難になった場合
        コンピュータまたは通信回線等が事故により停止した場合
        そのほか、当団体が本サービスの提供が困難だと判断した場合
        2.当団体は、本サービスの提供の停止、または中断により、ユーザーまたは第三者の被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。

        第5条(情報の収集およびその利用)
        1.アプリではGPSによる位置情報を利用してゲームを進行させます、そのために必要な端末固有の情報(デバイスID、機種、OSバージョンなど)、GPSによる位置情報を収集します。

        2.収集した情報は当団体、名古屋工業大学関係者がサービスの運用、運営を目的として利用するほか、個人が特定できないよう匿名化したデータ（非個人情報）を研究目的で内部あるいは外部へ提供する場合があります。収集した個人情報、または個人の特定できるデータは第三者へ一切提供しません。ただし、法令に基づく場合、捜査機関からの要請があった場合は本人の同意なく個人情報を利用、または提供することがあります。

        第6条(利用の制限)
        当団体は以下の場合には、事前の通知無く、ユーザーに対して、本サービスの全部、もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。

        本規約のいずれかの条項に違反した場合
        登録事項などに虚偽を記載した場合
        その他、当団体が本サービスの利用を適当でないと判断した場合
        第7条(免責事項)
        1.本サービス利用中において生じたユーザーの損害は当団体の故意、または重過失によらない場合には免責されるものとします。

        2.当団体は本サービスに関してユーザーと他のユーザー、または第三者との間において生じた取引、連絡、または紛争等について一切の責任を負いません。

        第8条(サービス内容の変更)
        当団体はユーザーに通知することなく本サービスの内容を変更し、または、本サービスまたは本サービスの一部の提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。

        第9条(通知または連絡)
        ユーザーと当団体の間の通知または連絡は当団体の定める方法によって行うものとします。

        第10条(準拠法・裁判管轄)
        1.本規約の成立、効力発生、解釈に当たっては日本法を準拠法とします。

        2.当団体のサービス、ソフトウェアに起因、または関連して当団体とユーザーの間で生じた紛争については名古屋地方裁判所を第一審の専属的合意管轄裁判所とします。`;

        res.status(200).json({ content: term });
    } catch (e) {
        console.error(e);
    }
};
