import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';


@Component({
  selector: 'app-activequestions',
  templateUrl: './activequestions.component.html',
  styleUrls: ['./activequestions.component.css']
})
export class ActivequestionsComponent implements OnInit {
  questions: any;

  constructor(
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questionService.getActiveQuestions().subscribe(data => {
      if(data.success){
        this.questions = data.questions;
      }
    })
  }

  removeQuestion(question, index){
    question.status = "Removed";
    this.questions.splice(index, 1);

    this.questionService.updateQuestion(question).subscribe(data => {
      console.log(data);
    });
  }
}
