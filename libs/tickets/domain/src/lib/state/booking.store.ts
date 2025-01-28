import { patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import { Flight } from '../entities/flight';
import { computed, inject } from '@angular/core';
import { FlightService } from '../infrastructure/flight.service';


export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState({
    filter: {
      from: 'Hamburg',
      to: 'Graz',
      urgent: false
    },
    flights: [] as Flight[],
    basket: {
      3: true,
      5: true
    } as Record<number, boolean>
  }),
  withComputed(store => ({
    delayedFlights: computed(() => store.flights().filter(
      flight => flight.delayed
    ))
  })),
  // Updater
  withMethods(store => ({
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
    updateFilter: (filter: Partial<{ from: string, to: string }>) => patchState(store, state => ({
      filter: {
        ...state.filter,
        ...filter
      }
    })),
    updateBasket: (id: number, selected: boolean) => patchState(store, state => ({
      basket: {
        ...state.basket,
        [id]: selected
      }
    })),
    resetFlights: () => patchState(store, { flights: [] }),
  })),
  // Side-Effects
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights: () => {
      flightService.find(
        store.filter.from(),
        store.filter.to()
      ).subscribe(
        flights => store.setFlights(flights)
      );
    }
  }))
);
