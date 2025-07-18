/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 更新镜头时使用的模型，所有字段可选
 */
export type LensUpdate = {
    id?: (number | null);
    created_at?: string;
    updated_at?: string;
    is_active?: boolean;
    /**
     * 镜头型号
     */
    model?: (string | null);
    /**
     * 卡口类型
     */
    mount_type?: (string | null);
    /**
     * 镜头系列
     */
    series?: (string | null);
    /**
     * 适用画幅
     */
    sensor_size?: (string | null);
    is_prime?: (boolean | null);
    min_focal_length?: (number | null);
    max_focal_length?: (number | null);
    magnification?: (number | null);
    min_focus_distance?: (number | null);
    max_aperture_max?: (string | null);
    max_aperture_min?: (string | null);
    length?: (number | null);
    weight?: (number | null);
    color?: (string | null);
    brand_id?: (number | null);
};

