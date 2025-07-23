/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_batch_import_cameras_cameras_batch_import_post } from '../models/Body_batch_import_cameras_cameras_batch_import_post';
import type { Body_batch_import_lenses_lenses_batch_import_post } from '../models/Body_batch_import_lenses_lenses_batch_import_post';
import type { Body_batch_import_users_users_batch_import_post } from '../models/Body_batch_import_users_users_batch_import_post';
import type { Body_login_auth_login_post } from '../models/Body_login_auth_login_post';
import type { BrandCreate } from '../models/BrandCreate';
import type { BrandRead } from '../models/BrandRead';
import type { BrandUpdate } from '../models/BrandUpdate';
import type { CameraCreate } from '../models/CameraCreate';
import type { CameraRead } from '../models/CameraRead';
import type { CameraUpdate } from '../models/CameraUpdate';
import type { LensCreate } from '../models/LensCreate';
import type { LensRead } from '../models/LensRead';
import type { LensUpdate } from '../models/LensUpdate';
import type { MountCreate } from '../models/MountCreate';
import type { MountRead } from '../models/MountRead';
import type { MountUpdate } from '../models/MountUpdate';
import type { UserCreate } from '../models/UserCreate';
import type { UserRead } from '../models/UserRead';
import type { UserUpdate } from '../models/UserUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * 用户登录
     * 使用用户名和密码获取访问令牌
     * @param formData
     * @returns any 包含访问令牌的响应
     * @throws ApiError
     */
    public static loginAuthLoginPost(
        formData: Body_login_auth_login_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                401: `认证失败`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 用户注册
     * 创建新用户账号
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static registerAuthRegisterPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `认证失败`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 获取当前用户信息
     * 获取当前登录用户的详细信息
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static readUsersMeUsersMeGet(): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }
    /**
     * 获取用户列表
     * 获取用户列表，仅超级管理员可访问
     * - 支持分页查询
     * - 需要超级管理员权限
     * @param skip 分页起始位置
     * @param limit 每页最大数量
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static readUsersUsersGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<UserRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 创建新用户
     * 创建新用户，仅超级管理员可访问
     * - 用户名和邮箱需唯一
     * - 密码将自动加密存储
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static createUserUsersPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 获取用户详情
     * 通过用户ID获取用户详细信息，仅超级管理员可访问
     * @param userId
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static readUserUsersUserIdGet(
        userId: number,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 更新用户信息
     * 更新用户信息，仅超级管理员可访问
     * - 可更新邮箱、用户名、密码和激活状态
     * - 用户名和邮箱更新需保证唯一性
     * @param userId
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static updateUserUsersUserIdPut(
        userId: number,
        requestBody: UserUpdate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 删除用户
     * 删除用户，仅超级管理员可访问
     * @param userId
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static deleteUserUsersUserIdDelete(
        userId: number,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 批量导入用户
     * 从Excel文件批量导入用户，仅超级管理员可访问
     * - Excel文件需包含以下列：username, email, password, is_active, is_superuser, avatar
     * - 密码将自动加密存储
     * - 会检查用户名和邮箱的唯一性
     * @param formData
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static batchImportUsersUsersBatchImportPost(
        formData: Body_batch_import_users_users_batch_import_post,
    ): CancelablePromise<Array<UserRead>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/batch-import',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 切换用户激活状态
     * 切换用户激活状态，仅超级管理员可访问
     * @param userId
     * @param isActive 是否激活用户
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static toggleUserActiveUsersUserIdActivePatch(
        userId: number,
        isActive: boolean,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{user_id}/active',
            path: {
                'user_id': userId,
            },
            query: {
                'is_active': isActive,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 获取所有品牌
     * 获取系统中所有品牌信息，支持分页
     * @param skip
     * @param limit
     * @param name
     * @returns BrandRead Successful Response
     * @throws ApiError
     */
    public static readBrandsBrandsGet(
        skip?: number,
        limit: number = 100,
        name?: (string | null),
    ): CancelablePromise<Array<BrandRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/brands/',
            query: {
                'skip': skip,
                'limit': limit,
                'name': name,
            },
            errors: {
                404: `品牌不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 创建品牌
     * 创建新品牌，仅超级管理员可操作
     * @param requestBody
     * @returns BrandRead Successful Response
     * @throws ApiError
     */
    public static createBrandBrandsPost(
        requestBody: BrandCreate,
    ): CancelablePromise<BrandRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/brands/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `品牌不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 获取品牌详情
     * 通过ID获取品牌详情
     * @param id
     * @returns BrandRead Successful Response
     * @throws ApiError
     */
    public static readBrandBrandsIdGet(
        id: number,
    ): CancelablePromise<BrandRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/brands/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `品牌不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 更新品牌
     * 更新品牌信息，仅超级管理员可操作
     * @param id
     * @param requestBody
     * @returns BrandRead Successful Response
     * @throws ApiError
     */
    public static updateBrandBrandsIdPut(
        id: number,
        requestBody: BrandUpdate,
    ): CancelablePromise<BrandRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/brands/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `品牌不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 删除品牌
     * 删除品牌，仅超级管理员可操作
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteBrandBrandsIdDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/brands/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `品牌不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 创建相机
     * 创建新相机
     * @param requestBody
     * @returns CameraRead Successful Response
     * @throws ApiError
     */
    public static createCameraCamerasPost(
        requestBody: CameraCreate,
    ): CancelablePromise<CameraRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cameras/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
                404: `相机不存在`,
                409: `资源冲突`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 获取相机列表
     * 获取相机列表（分页）
     * @param skip
     * @param limit
     * @returns CameraRead Successful Response
     * @throws ApiError
     */
    public static readCamerasCamerasGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<CameraRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cameras/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                400: `请求参数错误`,
                404: `相机不存在`,
                409: `资源冲突`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 获取相机详情
     * 通过ID获取相机
     * @param id
     * @returns CameraRead Successful Response
     * @throws ApiError
     */
    public static readCameraCamerasIdGet(
        id: number,
    ): CancelablePromise<CameraRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cameras/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `请求参数错误`,
                404: `相机不存在`,
                409: `资源冲突`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 更新相机信息
     * 更新相机信息
     * @param id
     * @param requestBody
     * @returns CameraRead Successful Response
     * @throws ApiError
     */
    public static updateCameraCamerasIdPut(
        id: number,
        requestBody: CameraUpdate,
    ): CancelablePromise<CameraRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/cameras/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
                404: `相机不存在`,
                409: `资源冲突`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 删除相机
     * 删除相机
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteCameraCamerasIdDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/cameras/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `请求参数错误`,
                404: `相机不存在`,
                409: `资源冲突`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 批量导入相机
     * 从Excel文件批量导入相机，仅超级管理员可访问
     * - Excel文件需包含以下必要列：model, megapixels, sensor_size, interchangeable_lens, brand_id
     * - 可选列：series, mount_type, weight, image_stabilization, built_in_flash, hot_shoe, release_date
     * - 会检查相机型号的唯一性和品牌ID的存在性
     * - 如果提供了mount_column参数，将处理相机与卡口的关联关系
     * @param formData
     * @param mountColumn Excel中包含卡口ID的列名，多个ID用逗号分隔
     * @returns CameraRead Successful Response
     * @throws ApiError
     */
    public static batchImportCamerasCamerasBatchImportPost(
        formData: Body_batch_import_cameras_cameras_batch_import_post,
        mountColumn?: (string | null),
    ): CancelablePromise<Array<CameraRead>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cameras/batch-import',
            query: {
                'mount_column': mountColumn,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `请求参数错误`,
                404: `相机不存在`,
                409: `资源冲突`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 创建镜头
     * 创建新镜头
     * @param requestBody
     * @returns LensRead Successful Response
     * @throws ApiError
     */
    public static createLensLensesPost(
        requestBody: LensCreate,
    ): CancelablePromise<LensRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lenses/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
                404: `镜头不存在`,
                409: `资源冲突，如镜头型号已存在`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 获取镜头列表
     * 获取所有镜头列表
     * @param skip
     * @param limit
     * @returns LensRead Successful Response
     * @throws ApiError
     */
    public static readLensesLensesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<LensRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lenses/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                400: `请求参数错误`,
                404: `镜头不存在`,
                409: `资源冲突，如镜头型号已存在`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 获取镜头详情
     * 通过ID获取镜头信息
     * @param id
     * @returns LensRead Successful Response
     * @throws ApiError
     */
    public static readLensLensesIdGet(
        id: number,
    ): CancelablePromise<LensRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lenses/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `请求参数错误`,
                404: `镜头不存在`,
                409: `资源冲突，如镜头型号已存在`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 更新镜头信息
     * 更新镜头信息
     * @param id
     * @param requestBody
     * @returns LensRead Successful Response
     * @throws ApiError
     */
    public static updateLensLensesIdPut(
        id: number,
        requestBody: LensUpdate,
    ): CancelablePromise<LensRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/lenses/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
                404: `镜头不存在`,
                409: `资源冲突，如镜头型号已存在`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 删除镜头
     * 删除镜头
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteLensLensesIdDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/lenses/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `请求参数错误`,
                404: `镜头不存在`,
                409: `资源冲突，如镜头型号已存在`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 批量导入镜头
     * 从Excel文件批量导入镜头，仅超级管理员可访问
     * - Excel文件需包含以下必要列：model, mount_type, sensor_size, is_prime, min_focal_length, max_focal_length, min_focus_distance, max_aperture_max, length, weight, brand_id
     * - 可选列：series, magnification, max_aperture_min, color
     * - 会检查镜头型号的唯一性和品牌ID的存在性
     * - 如果提供了mount_column参数，将处理镜头与卡口的关联关系
     * @param formData
     * @param mountColumn Excel中包含卡口ID的列名，多个ID用逗号分隔
     * @returns LensRead Successful Response
     * @throws ApiError
     */
    public static batchImportLensesLensesBatchImportPost(
        formData: Body_batch_import_lenses_lenses_batch_import_post,
        mountColumn?: (string | null),
    ): CancelablePromise<Array<LensRead>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lenses/batch-import',
            query: {
                'mount_column': mountColumn,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `请求参数错误`,
                404: `镜头不存在`,
                409: `资源冲突，如镜头型号已存在`,
                422: `Validation Error`,
                500: `服务器内部错误`,
            },
        });
    }
    /**
     * 获取所有卡口
     * 获取系统中所有卡口信息，支持分页和按名称/简称筛选
     * @param skip
     * @param limit
     * @param name 按卡口名称筛选
     * @param shortName 按卡口简称筛选
     * @returns MountRead Successful Response
     * @throws ApiError
     */
    public static readMountsMountsGet(
        skip?: number,
        limit: number = 100,
        name?: (string | null),
        shortName?: (string | null),
    ): CancelablePromise<Array<MountRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/mounts/',
            query: {
                'skip': skip,
                'limit': limit,
                'name': name,
                'short_name': shortName,
            },
            errors: {
                404: `卡口不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 创建卡口
     * 创建新卡口，仅超级管理员可操作
     * @param requestBody
     * @returns MountRead Successful Response
     * @throws ApiError
     */
    public static createMountMountsPost(
        requestBody: MountCreate,
    ): CancelablePromise<MountRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/mounts/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `卡口不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 获取卡口详情
     * 通过ID获取卡口详情
     * @param id
     * @returns MountRead Successful Response
     * @throws ApiError
     */
    public static readMountMountsIdGet(
        id: number,
    ): CancelablePromise<MountRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/mounts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `卡口不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 更新卡口
     * 更新卡口信息，仅超级管理员可操作
     * @param id
     * @param requestBody
     * @returns MountRead Successful Response
     * @throws ApiError
     */
    public static updateMountMountsIdPut(
        id: number,
        requestBody: MountUpdate,
    ): CancelablePromise<MountRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/mounts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `卡口不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 删除卡口
     * 删除卡口，仅超级管理员可操作
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteMountMountsIdDelete(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/mounts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `卡口不存在`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 下载模板文件
     * 下载指定的Excel导入模板文件
     * - **filename**: 模板文件名，必须是允许的模板之一
     * @param filename
     * @returns any Successful Response
     * @throws ApiError
     */
    public static downloadTemplateTemplatesDownloadFilenameGet(
        filename: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templates/download/{filename}',
            path: {
                'filename': filename,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
