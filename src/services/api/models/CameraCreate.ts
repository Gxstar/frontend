/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CameraCreate = {
    id?: (number | null);
    created_at?: string;
    updated_at?: string;
    is_active?: boolean;
    /**
     * 相机型号
     */
    model: string;
    /**
     * 相机系列
     */
    series: (string | null);
    /**
     * 传感器像素(百万)
     */
    megapixels: number;
    /**
     * 相机画幅
     */
    sensor_size: string;
    /**
     * 是否可更换镜头
     */
    interchangeable_lens: boolean;
    /**
     * 镜头卡口类型
     */
    mount_type: (string | null);
    /**
     * 重量(克)
     */
    weight: (number | null);
    /**
     * 是否支持防抖
     */
    image_stabilization: boolean;
    /**
     * 是否内置闪光灯
     */
    built_in_flash: boolean;
    /**
     * 是否有热靴
     */
    hot_shoe: boolean;
    /**
     * 发布日期
     */
    release_date: (string | null);
    /**
     * 品牌ID
     */
    brand_id: number;
};

