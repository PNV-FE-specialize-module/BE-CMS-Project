import { AbstractEntity } from "src/common/entities";
import { StatusEnum } from "src/common/enum/enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends AbstractEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
    nullable: false,
  })
  status: StatusEnum;
}