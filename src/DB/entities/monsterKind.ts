import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("MonsterKind")
export class MonsterKind extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: "varchar" })
    public name!: string;

    @Column({ type: "int" })
    public rank: number = 0;

    @Column({ type: "bool" })
    public isGet: boolean = false;

    @Column({ type: "int" })
    public modelId!: number;

    @Column({ type: "varchar" })
    public text!: string;
}

export default MonsterKind;
