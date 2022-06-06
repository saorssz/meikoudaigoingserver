import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MonsterKind } from "./monsterKind";

@Entity("MonsterInfo")
export class MonsterInfo extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: "decimal", precision: 7, scale: 5 })
    public latitude: number = 0.0;

    @Column({ type: "decimal", precision: 8, scale: 5 })
    public longitude: number = 0.0;

    @OneToOne((type) => MonsterKind)
    @JoinColumn()
    public kind!: MonsterKind;
}

export default MonsterInfo;
