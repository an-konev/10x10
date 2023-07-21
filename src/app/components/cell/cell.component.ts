import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent {
  @Input() id: number;
  _color: string = 'blue';
  set color(color: string) {
    this._color = color;
    this.cdr.detectChanges();
  }

  get color(): string {
    return this._color;
  }
  constructor(private cdr: ChangeDetectorRef) {}
}
