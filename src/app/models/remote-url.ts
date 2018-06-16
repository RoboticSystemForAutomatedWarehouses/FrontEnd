export class RemoteUrl {
    public static BaseUrl = 'http://localhost:56717/api/';
    public static Account = {
        Login: RemoteUrl.BaseUrl + 'Account/Login',
        Logout: RemoteUrl.BaseUrl + 'Account/Logout',
        Register: RemoteUrl.BaseUrl + 'Account/Register'
    };
    public static Warehouse = RemoteUrl.BaseUrl + 'Warehouse/List';
    public static Orders = {
        Check: RemoteUrl.BaseUrl + 'Orders/Check',
        Confirm: RemoteUrl.BaseUrl + 'Orders/Confirm'
    };
}
