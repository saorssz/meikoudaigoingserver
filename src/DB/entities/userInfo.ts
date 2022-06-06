import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("UserInfo")
export class UserInfo extends BaseEntity {
    @PrimaryColumn()
    public id!: string;

    @Column({ type: "varchar", length: 191 })
    public name!: string;

    @Column({ type: "int" })
    public grade: number = 1;

    @Column({ type: "int" })
    public progress: number = 0;

    @Column({ type: "int" })
    public monstersCount: number = 0;
}

export default UserInfo;
