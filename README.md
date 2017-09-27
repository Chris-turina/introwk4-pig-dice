### Specs

| Behavior                                                                     | Input            | Output                                        |
|------------------------------------------------------------------------------|------------------|-----------------------------------------------|
| The user can click a 'roll' button, and a number 1-6 is displayed            | "click roll"     | shows a number 1-6                            |
| The current roll gets added to the round score                               | "click roll"     | rolled number is added to round score         |
| If they roll a 1, their round score is set to zero                           | "1 is rolled"    | score for the round is zero                   |
| If they roll a 1, their turn ends                                            | "1 is rolled"    | turn ends and next player's turn starts       |
| The user can choose to roll again or hold                                    | "click hold"     | their turn ends and next player's turn starts |
| If the player holds, they add their score for the round to their total score | "click hold"     | add round score to total score                |
| If player's total score is at least 100, they win                            | "score = 100"    | they win                                      |
| Players can enter their names before the game starts                         | "name here"      | "Chris"                                       |
| Game starts when start button is pressed                                     | "click start"    | game starts                                   |
| Players can restart game by pressing new game button                         | "click New Game" | game restarts                                 |
