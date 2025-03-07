import { Component, DestroyRef, inject, Injector, signal } from '@angular/core';

@Component({
  selector: 'app-base-list-component',
  imports: [],
  templateUrl: './base-list-component.component.html',
  styleUrl: './base-list-component.component.scss'
})
export abstract class BaseListComponentComponent {
  searchItem = signal<string>('');
  nextIsNull = signal<boolean>(false);
  previousIsNull = signal<boolean>(true);

  protected destroyRef = inject(DestroyRef);
  protected injector = inject(Injector);

}
