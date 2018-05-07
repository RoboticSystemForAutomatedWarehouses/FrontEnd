export class UserRegisterModel {
    public email: string;
    public name: string;
    public password: string;
    public confirm_password: string;
    public gender: Gender;

    public ValidatePassword(): boolean {
        return !!this.password;
    }

    public ValidateEmail(): boolean {
        return !!this.email;
    }

    public ValidateName(): boolean {
        return !!this.name;
    }

    public ValidatePasswordConfirmation(): boolean {
        return this.password === this.confirm_password;
    }

    public ValidateGender(): boolean {
        // tslint:disable-next-line:triple-equals
        return this.gender == Gender.Male || this.gender == Gender.Female;
    }
}

export enum Gender {
    Male = 0,
    Female = 1
}
