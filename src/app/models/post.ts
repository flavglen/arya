export class postComments {
    Id: number;
    CommentText: string;
    CommentedBy: number;
    CommentedDate: Date;
    ParentCommentId: number;
    PostId: number;
    CommentedByName: string;
}
export class notification {
    Content: string;
    CreatedDate: Date;
    FromUserPic: string;
    IsRead: boolean;
    Title: string;
    NotificationFrom: number;
    Id: number;
}
export class post {
    Id: number;
    Content: string;
    CreatedDate: Date;
    CreatedBy: string;
    ApprovedBy: string;
    Status: string;
    Details: string;
    Title: string;
    CommentsCount: number;
    FirstName: string;
    LastName: string;
    Liked: number;
    LikesCount: number;
    UnlikeCount: number;
    UserName: string;
    CanEdit: boolean;
    Event_end:Date;
    Event_start:Date;
    Location:string;
}
export class postLikes {
    Id: number;
    UserName: string;
    LikedDate: Date;
    CreatedDate: Date;
    Like: number;
}
export class sports {
    ID: number;
    Name: string;
}