export class OverSummary{
    matchId:string | number = '';
    postId: string | number = '';
    overs:Over[] = [];
}
export class Score {
    batsman: object = {};
    bowler: object = {};
    score:number = 0;
    extraType:string|null|number = null
    extraRun:number = 0
}
export class Over {
    [key: string]: Score
}