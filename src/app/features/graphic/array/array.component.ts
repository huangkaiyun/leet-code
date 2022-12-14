import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'graphic-array',
  templateUrl: './array.component.html',
})
export class GraphicArrayComponent implements OnInit {
  @Input() data?: (string | number)[];
  @Input() bgColor: Record<number, string> = {};

  constructor() {}

  ngOnInit(): void {}
}
