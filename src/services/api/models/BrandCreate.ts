/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 创建品牌时使用的模型
 */
export type BrandCreate = {
    id?: (number | null);
    created_at?: string;
    updated_at?: string;
    /**
     * 是否启用
     */
    is_active?: boolean;
    /**
     * 品牌名称
     */
    name: string;
    /**
     * 品牌英文名称
     */
    english_name: (string | null);
    /**
     * 品牌Logo URL
     */
    logo_url: (string | null);
    /**
     * 成立年份
     */
    founded_year: (number | null);
    /**
     * 总部位置
     */
    headquarters: (string | null);
    /**
     * 官方网站
     */
    website: (string | null);
    /**
     * 品牌描述
     */
    description: (string | null);
};

