export class RemoteUrl {
    public static BaseUrl = 'http://192.168.10.17:5000/api/';
    public static Warehouse = RemoteUrl.BaseUrl + 'Warehouse/List';
    public static Account = {
        Login: RemoteUrl.BaseUrl + 'Account/Login',
        Logout: RemoteUrl.BaseUrl + 'Account/Logout',
        Register: RemoteUrl.BaseUrl + 'Account/Register',
        Get(id: string): string { return RemoteUrl.BaseUrl + 'Account/Get/' + id; },
        Update(id: string): string { return RemoteUrl.BaseUrl + 'Account/Update/' + id; }
    };
    public static Orders = {
        Check: RemoteUrl.BaseUrl + 'Orders/Check',
        Confirm: RemoteUrl.BaseUrl + 'Orders/Confirm',
        List: RemoteUrl.BaseUrl + 'Orders/List'
    };
    public static Categories = {
        List: RemoteUrl.BaseUrl + 'Categories/List'
    };
    public static Items = {
        // Order/{orderId}/StorageSpaces/[action]/{storageId}
        Insert(orderId, storageId): string { return RemoteUrl.BaseUrl + `Order/${orderId}/StorageSpaces/Insert/${storageId}`; },
        Remove(orderId, storageId): string { return RemoteUrl.BaseUrl + `Order/${orderId}/StorageSpaces/Remove/${storageId}`; }
    };
    public static News(count: number) {
        return this.BaseUrl + 'News/List/?count=' + count.toString();
    }
}
