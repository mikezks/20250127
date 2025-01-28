import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { BookingStore } from '@flight-demo/tickets/domain';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, FlightCardComponent],
})
export class FlightSearchComponent {
  private store = inject(BookingStore);

  filter = this.store.filter;
  flights = this.store.flights;
  basket = this.store.basket

  search(): void {
    if (!this.filter.from() || !this.filter.to()) {
      return;
    }

    this.store.loadFlights();
  }

  updateFilter(filter: Partial<{ from: string, to: string }>) {
    this.store.updateFilter(filter);
  }

  updateBasket(id: number, selected: boolean) {
    this.store.updateBasket(id, selected);
  }
}
