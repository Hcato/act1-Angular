import { Component, inject, Input, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Students } from '../../models/students';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  template: 	`<p>Mensaje recibido del papa: {{mensaje}}</p>`
})
export class DashboardComponent implements OnInit{
  
  usuario = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    materias: new FormControl('')
  });
  add(){
    const id = Number(this.usuario.get('id')?.value);
    const exists = this.studentsArray.some(student => student.id === id);
    if (exists) {
        alert("este alumno ya existe");
        this.usuario.reset();
        return
    }
    const newStudent : Students = {
        id: Number(this.usuario.get('id')?.value),
        name: String(this.usuario.get('nombre')?.value),
        asignature: this.usuario.get('materias')?.value?.split(',') || []
    }
    this.studentsArray.push(newStudent);
    this.usuario.reset();
  }
  studentsArray : Students[] = [
    {
      id:1,
      name:'waos',
      asignature:["POO","WEB"]
    },
    {
      id:2,
      name:'waos',
      asignature:["POO","OS"]
    },

    {
      id:3,
      name:'waos',
      asignature:["POO","WEB"]
    }

  ]
  ngOnInit(): void {
    //this.studentsArray.push(this.alumno)
    console.log(this.studentsArray);
    
}

deleteStudent(id: number){
var NewListStudent: Students[] = this.studentsArray
this.studentsArray = NewListStudent.filter(student =>student.id != id)
}

  private breakpointObserver = inject(BreakpointObserver);
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
  constructor(public dialog: MatDialog) {}
  showName(asignature: string[]): void {
    this.dialog.open(DialogComponent, {
      width: '750px',
      data: { asignature: asignature }
    });
  }
}
