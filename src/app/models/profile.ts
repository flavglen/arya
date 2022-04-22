export class profile{
    Address1:string;
    Address2:string;
    City:string;
    State:string;
    Country:number;
    Zip:string;
    Picture:string;
    FirstName:string;
    LastName:string;
    Email:string;
}
export class Country{
    ID:number;
    Name:string;
}
export class UserSettings{
    ID:number;
    AboutPrivacy:string;
    Language:number;
    TimeZone:number;
    Notification_like:boolean;
    Notification_comment:boolean;
}