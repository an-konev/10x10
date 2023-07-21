import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { BehaviorSubject, skip, takeUntil, timer } from "rxjs";
import { CellComponent } from "./components/cell/cell.component";
import { MatDialog } from "@angular/material/dialog";
import { ResultDialogComponent } from "./components/result-dialog/result-dialog.component";
import { Colors } from "./models/colors.enum"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @ViewChildren(CellComponent) cellsElements!: QueryList<CellComponent>;

  timeForReactionControl: FormControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.min(1),
      Validators.max(5000)
    ]
  );
  currentPendingCell: CellComponent | undefined;

  cells: Array<number>;
  cellsForSelection: Array<number>;

  computerPoints: number = 0;
  userPoints: number = 0;

  $gameStarted: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cells = [...Array(100).keys()];
  }

  startGame(): void {
    if (!this.timeForReactionControl.value || this.timeForReactionControl.invalid) {
      this.timeForReactionControl.markAsTouched();
      return
    }

    this.$gameStarted.next(true);
    this.cellsForSelection = this.cells.slice(0);

    timer(0, this.timeForReactionControl.value)
      .pipe(
        takeUntil(
          this.$gameStarted.pipe(skip(1)))
      )
      .subscribe(() => {
        if (this.currentPendingCell && this.currentPendingCell.color === Colors.YELLOW) {
          this.changeCellColor(this.currentPendingCell, Colors.RED);
          ++this.computerPoints;
          this.checkWinner();
        }

        if (this.$gameStarted.value) {
          const randomCellId = this.getRandomCell(this.cellsForSelection);
          this.currentPendingCell = this.cellsElements.get(randomCellId);
          this.changeCellColor(this.currentPendingCell, Colors.YELLOW);
        }
      })
  }

  clickCellHandler(event: any): void {
    if (!event.target.id && event.target.id !== 0) {
      return;
    }

    const clickedCell: CellComponent | undefined = this.cellsElements.get(event.target.id)

    if (clickedCell?.color === Colors.YELLOW) {
      clickedCell.color = Colors.GREEN;
      ++this.userPoints;
      this.checkWinner();
      this.cdr.detectChanges();
    }
  }

  resetGame() {
    this.$gameStarted.next(false);
    this.userPoints = 0;
    this.computerPoints = 0;
    this.currentPendingCell = undefined;
    this.cells = [];
    this.cdr.detectChanges();
    this.cells = [...Array(100).keys()];
    this.cdr.detectChanges();
  }

  openResultDialog(): void {
    this.dialog.open(ResultDialogComponent, {
      data: {
        userPoints: this.userPoints
      },
    });
  }

  private changeCellColor(cell: any, color: Colors): void {
    cell.color = color;
    this.cdr.detectChanges();
  }

  private getRandomCell(array: Array<number>): number {
    return array.splice(Math.floor(Math.random() * array.length), 1)[0];
  }

  private checkWinner(): void {
    if (this.userPoints === 10 || this.computerPoints === 10) {
      this.openResultDialog();
      this.resetGame();
    }
  }
}
