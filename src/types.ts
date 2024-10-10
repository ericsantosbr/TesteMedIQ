import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable
} from 'kysely';

export interface Database {
    'MedIQ.users': UserTable
}

export interface UserTable {
    id: Generated<Number>,
    email: string,
    username: string,
    password: string,
    created_at: string,
    updated_at: string
};

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
