import {Component} from '@angular/core';
import {RecipesDataService} from "../../services/recipes-data.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(private _recipesDataService: RecipesDataService) { }

  public onSave() {
    this._recipesDataService.save();
  }

  public onFetch() {
    this._recipesDataService.getAll().subscribe();
  }

}
