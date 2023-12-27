import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { getPokemonsAtPage } from '../repository/PokemonRepository';
import { InfiniteScrollDirective } from './directives/InfiniteScroll.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InfiniteScrollDirective],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  private page = 0;
  
  title = "Pokemon";
  pokemons: Pokemon[] = [];
  loading: boolean = false;
  hasMore: boolean = true;
  
  ngOnInit(): void {
    getPokemonsAtPage(this.page).then((response) => {
      this.pokemons = response.data?.pokemons ?? [];
    });
  }
  
  showMore(): void {
    if(!this.hasMore || this.loading){
      return;
    }
    
    this.loading = true;
    this.page++;
    getPokemonsAtPage(this.page).then((response) => {
      this.pokemons = this.pokemons.concat(response.data?.pokemons ?? []);
      console.log(response.data)
      this.hasMore = response.data?.next ?? false;
    }).finally(() => this.loading = false);
  }
  
}
