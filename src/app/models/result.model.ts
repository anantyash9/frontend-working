export class Result {
    abandoned: boolean;
active: boolean;
id: number;
interviewee: {id: number, candidateId: string, remaining: number}
netQuestions: number
netScore: number
netWeight: number
questionset: {id: number, name: string, intro: string, outro: string}

}
