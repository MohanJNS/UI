import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  cards = [
    {
      title: 'Overall',
      value: '400K',
      description: 'Sales',
      details: [
        { label: 'FIT', value: 6 },
        { label: 'CFT', value: 4 },
        { label: 'GT', value: 1 }
      ]
    },
    {
      title: 'This Month',
      value: '400K',
      description: 'Sales',
      details: [
        { label: 'FIT', value: 6 },
        { label: 'CFT', value: 4 },
        { label: 'GT', value: 1 }
      ]
    },
    {
      title: 'March',
      value: '400K',
      description: 'Sales',
      details: [
        { label: 'FIT', value: 6 },
        { label: 'CFT', value: 4 },
        { label: 'GT', value: 1 }
      ]
    },
    {
      title: 'April',
      value: '400K',
      description: 'Sales',
      details: [
        { label: 'FIT', value: 6 },
        { label: 'CFT', value: 4 },
        { label: 'GT', value: 1 }
      ]
    },
    {
      title: 'Lead Status',
      value: '400K',
      description: 'Leads',
      details: [
        { label: 'New', value: 6 },
        { label: 'Followup', value: 4 },
        { label: 'quotation', value: 2}
      ]
    },
    {
      title: 'FIT',
      value: '400K',
      description: 'Leads',
      details: [
        { label: 'New', value: 6 },
        { label: 'Followup', value: 4 },
        { label: 'quotation', value: 2}
      ]
    },
    {
      title: 'CFT',
      value: '400K',
      description: 'Leads',
      details: [
        { label: 'New', value: 6 },
        { label: 'Followup', value: 4 },
        { label: 'quotation', value: 2}
      ]
    },
    {
      title: 'GT',
      value: '400K',
      description: 'Leads',
      details: [
        { label: 'New', value: 6 },
        { label: 'Followup', value: 4 },
        { label: 'quotation', value: 2}
      ]
    },
    {
      title: 'Trips',
      value: '50',
      description: '# persons',
      details: [
        { label: 'Ongoing', value: 6 },
        { label: 'Upcomming', value: 4 },
        { label: 'Planned', value: 2 }
      ]
    },
    {
      title: 'FIT',
      value: '50',
      description: '# persons',
      details: [
        { label: 'Ongoing', value: 6 },
        { label: 'Upcomming', value: 4 },
        { label: 'Planned', value: 2 }
      ]
    },
    {
      title: 'CFT',
      value: '50',
      description: '# persons',
      details: [
        { label: 'Ongoing', value: 6 },
        { label: 'Upcomming', value: 4 },
        { label: 'Planned', value: 2 }
      ]
    },
    {
      title: 'GT',
      value: '50',
      description: '# persons',
      details: [
        { label: 'Ongoing', value: 6 },
        { label: 'Upcomming', value: 4 },
        { label: 'Planned', value: 2 }
      ]
    },

    
  ];
}
