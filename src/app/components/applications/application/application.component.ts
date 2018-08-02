import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import { ApplicationService } from '../../../services/application/application.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  id: any;
  questions: any;
  name: String;
  answers: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;

      if(this.id){
        this.applicationService.getItemById(this.id).subscribe(data => {
          this.questions = [];

          for(var i=0; i<data.application.answers.length; i++){
            var questionId = data.application.answers[i].questionId;
            this.questionService.getItemById(questionId).subscribe(data => {
              this.questions.push(data.question);
            });
          }

          this.name = data.application.name;
          this.answers = data.application.answers;
        })
      }
      else{
        this.questionService.getActiveQuestions().subscribe(data => {
          if(data.success){
            this.questions = data.questions;

            this.answers = [];
            for(var i=0; i<this.questions.length; i++){
              let question = this.questions[i];

              this.answers.push({
                questionId: question._id,
                answer: '',
                correct: false
              });
            }
          }
        })
      }
    })
  }

  onSubmit(){
    let answerSubmission = {
      name: this.name,
      answers: this.answers,
      accepted: false
    }

    // Check to see if any questions are incorrect
    let incorrect = answerSubmission.answers.filter(x => x.correct == false);
    if(incorrect.length > 0){
      answerSubmission.accepted = false;
    }
    else{
      answerSubmission.accepted = true;
    }

    this.applicationService.addApplication(answerSubmission).subscribe(data => {
      if(data.success){
        this.router.navigate(['/home']);
      }
      else{
        console.log(data);
      }
    })
  }

  getQuestion(id){
    let question = this.questions.find(x => x._id == id);
    return question ? question.question : null;
  }

  getChoices(id){
    let question = this.questions.find(x => x._id == id);
    return question ? question.choices : null;
  }

  onToggle(index, value){
    let answer = this.answers[index];
    answer.answer = value;

    let question = this.questions.find(x => x._id == answer.questionId);
    if(question.choices.find(x => x.text == value).answer){
      answer.correct = true;
    }
    else{
      answer.correct = false;
    }
  }

  routeNext(){
    if(this.id){
      this.router.navigate(['/hiring']);
    }
    else{
      this.router.navigate(['/home']);
    }
  }

  // Track for multiple choice array for ngFor
  trackByFn(index: any, item: any) {
   return index;
  }
}
