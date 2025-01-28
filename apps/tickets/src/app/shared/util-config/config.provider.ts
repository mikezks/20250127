import { APP_INITIALIZER, computed, EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, Signal, signal, WritableSignal } from "@angular/core";
import { ConfigState, initialConfigState } from "./config.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";


export const CONFIG_STATE = new InjectionToken<WritableSignal<ConfigState>>('CONFIG_STATE', {
  providedIn: 'root',
  factory: () => signal(initialConfigState)
});

export function provideConfigState(url: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (
        http = inject(HttpClient),
        configState = inject(CONFIG_STATE),
      ) => () =>
        http.get<ConfigState>(url).pipe(
          tap(
            config => configState.set(config)
          )
        )
    }
  ]);
}

/* provideAppInitializer((
  configState = inject(CONFIG_STATE),
  http = inject(HttpClient)
) => http.get<ConfigState>(url).pipe(
  tap(config => configState.set(config))
)) */

export function injectFullname(): Signal<string> {
  const config = inject(CONFIG_STATE);

  return computed(() => config().userInfo.firstname + ' ' + config().userInfo.lastname);
}
