//import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[]; // ist ein Array

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges().subscribe(
      item => {
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoListArray.push(x);
        })

        // Sort array isChecked false -> true
        this.toDoListArray.sort((a,b) => {
          return a.isChecked - b.isChecked
        })
      });
  }

  onAdd(itemTitle) {
    this.todoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheckt($key, isChecked) {
    this.todoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete($key) {
    this.todoService.removeTitle($key);
  }

}