import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  id: any;
  question: String;
  //answer: String;
  choices: any;
  status: String;
  test: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.choices = [];
    this.choices.push({ text: '', answer: false });

    // Check for id param and get question to fill
    this.route.params.subscribe(params => {
       this.id = params.id;

       if(this.id){
         this.questionService.getItemById(this.id).subscribe(data => {
           if(data.success){
             this.question = data.question.question;
             //this.answer = data.question.answer;
             this.choices = data.question.choices;
           }
         })
       }
    });
  }

  onQuestionSubmit(){
    let questionSubmission = {
      question: this.question,
      //answer: this.answer,
      choices: this.choices,
      status: 'Active'
    }

    if(!this.id){
      this.questionService.addQuestion(questionSubmission).subscribe(data => {
        if(data.success){
          this.router.navigate(['/hiring']);
        }
        else {
          console.log(data);
        }
      })
    }
    else{
      questionSubmission["_id"] = this.id;

      this.questionService.updateQuestion(questionSubmission).subscribe(data => {
        if(data.success){
          this.router.navigate(['/hiring']);
        }
        else{
          console.log(data);
        }
      })
    }
  }

  addPossibleChoice(){
    this.choices.push({ text: '', answer: false });
  }

  // Track for multiple choice array for ngFor
  trackByFn(index: any, item: any) {
   return index;
  }

}
