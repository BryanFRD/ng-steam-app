import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { getPokemonsAtPage } from '../repository/PokemonRepository';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = "Pokemon";
  pokemons: Pokemon[] = [];
  
  ngOnInit(): void {
    getPokemonsAtPage(0).then((response) => {
      console.log();
      
      this.pokemons = response.data ?? [];
    });
  }
  
}
