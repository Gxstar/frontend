/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 读取卡口时使用的模型，包含所有字段和自动生成的ID及时间戳
 */
export type MountRead = {
    id: number;
    created_at: string;
    updated_at: string;
    /**
     * 是否启用
     */
    is_active?: boolean;
    /**
     * 卡口名称
     */
    name: string;
    /**
     * 卡口简称
     */
    short_name?: string;
    /**
     * 卡口描述
     */
    description?: string;
    /**
     * 卡口法兰焦距
     */
    flange_focal_distance?: number;
    /**
     * 卡口引入年份
     */
    introduced_year?: number;
};

