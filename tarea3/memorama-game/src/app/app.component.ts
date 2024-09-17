import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Card {
  id: number;
  image: string;
  revealed: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  
  title = 'memorama-game';
  cards: Card[] = [];
  flippedCards: Card[] = [];
  attempts: number = 0;
  totalPairs: number = 8;
  matchedPairs: number = 0;
  gameOver: boolean = false;

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    const images = ['🐶', '🐱', '🦊', '🐸', '🐧', '🦁', '🐼', '🐨'];
    this.cards = this.shuffle([...images, ...images].map((image, index) => ({
      id: index,
      image,
      revealed: false,
      matched: false,
    })));
  }

  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  flipCard(card: Card) {
    if (card.revealed || card.matched || this.flippedCards.length === 2) {
      return;
    }
    
    card.revealed = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.attempts++;
      this.checkForMatch();
    }
  }

  restartGame() {
    this.cards = [];
    this.flippedCards = [];
    this.attempts = 0;
    this.matchedPairs = 0;
    this.gameOver = false;
    this.initializeGame();
  }

  checkForMatch() {
    const [firstCard, secondCard] = this.flippedCards;
    if (firstCard.image === secondCard.image) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.matchedPairs++;
      this.flippedCards = [];

      if (this.matchedPairs === this.totalPairs) {
        setTimeout(() => {
          this.gameOver = true;
        }, 500);
      }
    } else {
      setTimeout(() => {
        firstCard.revealed = false;
        secondCard.revealed = false;
        this.flippedCards = [];
      }, 1000);
    }
  }
}
