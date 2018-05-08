export class RemoteUrl {
    public static BaseUrl = 'http://localhost:56717/api/';
    public static Account = {
        Login: RemoteUrl.BaseUrl + 'Account/Login',
        Logout: RemoteUrl.BaseUrl + 'Account/Logout',
        Register: RemoteUrl.BaseUrl + 'Account/Register'
    };
}
