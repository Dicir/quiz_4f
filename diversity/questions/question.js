export class Question{

    constructor(question, answers){
        this.question = question
        this.answers = answers
    }

    set questions(newQuestion){
        if(newQuestion instanceof Question){
            this.question = newQuestion
        }
    }

    get questions(){
        return this.question
    }

}