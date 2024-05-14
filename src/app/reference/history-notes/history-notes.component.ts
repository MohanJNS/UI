import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-history-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './history-notes.component.html',
  styleUrl: './history-notes.component.scss'
})
export class HistoryNotesComponent {
  constructor(private router: Router) {}

  backToPlanTravel(){
    this.router.navigate(['/plantravel']);
  }
  cards = [
    { id: 1, title: '02-02-2024 3:00pm', status:'Discussion', content: 'Explained Family trip plan to Sikkim', isExpanded:true },
    { id: 2, title: '01-02-2024 3:00pm', status:'Discussion', content: 'Explained Family trip plan to Rajastan', isExpanded:false },
    // Add more card objects as needed
  ];
  // Function to toggle accordion
  toggleAccordion(card: any) {
    card.isExpanded = !card.isExpanded;
  }
}
