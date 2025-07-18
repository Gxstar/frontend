/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 更新卡口时使用的模型，所有字段可选
 */
export type MountUpdate = {
    id?: (number | null);
    created_at?: string;
    updated_at?: string;
    is_active?: (boolean | null);
    /**
     * 卡口名称
     */
    name?: (string | null);
    /**
     * 卡口简称
     */
    short_name?: (string | null);
    /**
     * 卡口描述
     */
    description?: (string | null);
    flange_focal_distance?: (number | null);
    introduced_year?: (number | null);
};

