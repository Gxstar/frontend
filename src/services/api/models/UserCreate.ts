/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserCreate = {
    id?: (number | null);
    created_at?: string;
    updated_at?: string;
    is_active?: boolean;
    /**
     * 用户登录名
     */
    username: string;
    /**
     * 用户电子邮箱
     */
    email: string;
    /**
     * 是否为超级管理员
     */
    is_superuser?: boolean;
    /**
     * 用户密码
     */
    password: string;
};

