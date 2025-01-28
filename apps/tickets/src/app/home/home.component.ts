import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectFullname } from '../shared/util-config/config.provider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  fullname = injectFullname();
}
