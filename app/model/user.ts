'use strict';

import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    modelName: 'user',
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})
export default class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        comment: '用户ID'
    })
    id: number;

    @Column({
        field: 'user_name',
        comment: '用户名'
    })
    userName: string;

    @Column({
        field: 'created_at'
    })
    createdAt: Date;

    @Column({
        field: 'updated_at'
    })
    updatedAt: Date;
}
