import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { MonsterInfo } from "./monsterInfo";

@Entity("GetMonster")
export class GetMonster extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: "varchar" })
    public uuid!: string;

    @Column({ type: "int" })
    public kindId!: number;
}

export default GetMonster;
