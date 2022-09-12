// import { UserStorage } from '@app/core/store/user/user.storage';
import { Feature } from '@app/shared/app.enum';

export class PermissionModel {
    public featureName: string;
    public view: boolean;
    public modified: boolean;

    public constructor(init?: Partial<PermissionModel>) {
        Object.assign(this, init);
    }

    static getPermissionByFeature(params: { permissions?: PermissionModel[]; featureName: Feature }): PermissionModel {
        const permissions: PermissionModel[] = params.permissions;
        // const permissions: PermissionModel[] = params.permissions ? params.permissions : UserStorage.getUserPermissions();
        if (!permissions || !permissions.length) {
            return new PermissionModel({ featureName: params.featureName });
        }
        //
        const permissionByFeature: PermissionModel = permissions.find(_ => _.featureName === params.featureName);
        return !!permissionByFeature
            ? permissionByFeature
            : new PermissionModel({ featureName: params.featureName });
    }
}
