export class RemoteUrl {
    public static BaseUrl = 'http://localhost:56717/api/';
    public static Account = {
        get Login(): string { return RemoteUrl.BaseUrl + 'Login'; },
        get Logout(): string { return RemoteUrl.BaseUrl + 'Logout'; },
        get Register(): string { return RemoteUrl.BaseUrl + 'Register'; }
    };
}
