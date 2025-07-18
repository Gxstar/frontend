/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 读取镜头时使用的模型，包含所有字段和自动生成的ID及时间戳
 */
export type LensRead = {
    id: number;
    created_at: string;
    updated_at: string;
    is_active?: boolean;
    /**
     * 镜头型号
     */
    model: string;
    /**
     * 卡口类型
     */
    mount_type: string;
    /**
     * 镜头系列
     */
    series: (string | null);
    /**
     * 适用画幅
     */
    sensor_size: string;
    /**
     * 是否定焦镜头
     */
    is_prime: boolean;
    /**
     * 最小焦距(mm)
     */
    min_focal_length: number;
    /**
     * 最大焦距(mm)
     */
    max_focal_length: number;
    /**
     * 放大倍率
     */
    magnification: (number | null);
    /**
     * 最近对焦距离(m)
     */
    min_focus_distance: number;
    /**
     * 最大光圈最大值(如f/1.4)
     */
    max_aperture_max: string;
    /**
     * 最大光圈最小值(变焦镜头)
     */
    max_aperture_min: (string | null);
    /**
     * 镜头长度(mm)
     */
    length: number;
    /**
     * 镜头重量(g)
     */
    weight: number;
    /**
     * 镜头颜色
     */
    color: (string | null);
    /**
     * 品牌ID
     */
    brand_id: number;
};

