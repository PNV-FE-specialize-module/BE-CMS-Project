import { AbstractEntity } from 'src/common/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Project } from './project.entity';
import { PositionEnum } from 'src/common/enum/enums';

@Entity()
export class EmployeeProject extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PositionEnum,
    array: true,
    default: [PositionEnum.BA],
  })
  roles: PositionEnum[];

  @Column()
  joinDate: Date;

  @Column({ nullable: true })
  fireDate: Date;

  @Column({ nullable: true })
  projectId: string;

  @Column({ nullable: true })
  employeeId: string;

  @ManyToOne(() => Project, (project) => project.employee_project, {
    cascade: true,
  })
  project: Project;

  @ManyToOne(() => Employee, (employee) => employee.employee_project)
  @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
  employee: Employee;
  formattedRoles: PositionEnum[];
  constructor(assign: Partial<EmployeeProject>) {
    super();
    Object.assign(this, assign);
  }
}
