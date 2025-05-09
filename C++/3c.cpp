#include <iostream>
#include <ctime>
//Null Value = a special value that means something has no value.
// When a pointer is holding a null value,
// that pointer is not pointing at anything (null pointer)
// nullptr = keyword represents a null pointer literal
//nullptr are helpful when determining if an address
// was succesfully assigned to a pointer
void drawBoard(char *spaces);
void playerMove(char *spaces, char player, char computer);
void computerMove(char *spaces, char computer);
bool Winner(char *spaces, char player, char computer);
bool Tie(char *spaces);
int main(){
char spaces[9] = {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '};
char player = 'X';
char computer = 'O';
bool running = true;
drawBoard(spaces);
while(running){
playerMove(spaces, player, computer);
drawBoard(spaces);
if (Winner(spaces, player, computer)){
running = false;
break;
}
else if(Tie(spaces)){
running = false;
break;
}
computerMove(spaces, computer);
drawBoard(spaces);
if (Winner(spaces, player, computer)){
running = false;
break;
}
else if(Tie(spaces)){
running = false;
break;
}
}
std::cout << "Thanks for playing";
return 0;}
void drawBoard(char *spaces){
std::cout << '\n';
std::cout << "     |     |     " << '\n';
std::cout << "  " << spaces[0] << "  |  "<< spaces[1] <<"  |  "<< spaces[2] <<"  " << '\n';
std::cout << "_____|_____|_____" << '\n';
std::cout << "     |     |     " << '\n';
std::cout << "  " << spaces[3] << "  |  "<< spaces[4] <<"  |  "<< spaces[5] <<"  " << '\n';
std::cout << "_____|_____|_____" << '\n';
std::cout << "     |     |     " << '\n';
std::cout << "  " << spaces[6] << "  |  "<< spaces[7] <<"  |  "<< spaces[8] <<"  " << '\n';
std::cout << '\n';
}
void playerMove(char *spaces, char player, char computer){
int number;
do{
std::cout << "Enter a spot to place a marker (1-9)";
std::cin >> number;
number--;
if(spaces[number] == ' '){
spaces[number] = player;
break;
}
}while(number > 0 &&  number < 8 || !Winner(spaces, player, computer) || Tie(spaces));
}
void computerMove(char *spaces, char computer){
int number;
srand(time(0));
while(true){
number = rand() % 9;
if(spaces[number] == ' '){
spaces[number] = computer;
break;
}}}
bool Winner(char *spaces, char player, char computer){
if((spaces[0] != ' ')&& (spaces[0] == spaces[1]) && (spaces[1] == spaces[2])){
spaces[0] == player? std::cout << "You win!\n" : std::cout << "You lose!\n";
return true;}
else if((spaces[3] != ' ')&& (spaces[3] == spaces[4]) && (spaces[4] == spaces[5])){
spaces[3] == player? std::cout << "You win!\n" : std::cout << "You lose!\n";
return true;}
else if((spaces[6] != ' ')&& (spaces[6] == spaces[7]) && (spaces[7] == spaces[8])){
spaces[6] == player? std::cout << "You win!\n" : std::cout << "You lose!\n";
return true;}
else if((spaces[0] != ' ')&& (spaces[0] == spaces[3]) && (spaces[3] == spaces[6])){
spaces[0] == player? std::cout << "You win!\n" : std::cout << "You lose!\n";
return true;}
else if((spaces[1] != ' ')&& (spaces[1] == spaces[4]) && (spaces[4] == spaces[7])){
spaces[1] == player? std::cout << "You win!\n" : std::cout << "You lose!\n";
return true;}
else if((spaces[2] != ' ')&& (spaces[2] == spaces[5]) && (spaces[5] == spaces[8])){
spaces[2] == player? std::cout << "You win!\n" : std::cout << "You lose!\n";
return true;}
else if((spaces[6] != ' ')&& (spaces[6] == spaces[4]) && (spaces[4] == spaces[2])){
spaces[6] == player? std::cout << "You win!\n" : std::cout << "You lose!\n";
return true;}
else if((spaces[0] != ' ')&& (spaces[0] == spaces[4]) && (spaces[4] == spaces[8])){
spaces[0] == player? std::cout << "You win!\n" : std::cout << "You lose!\n";
return true;}
return 0;
}
bool Tie(char *spaces){
for(int i = 0; i < 9; i++){
if(spaces[i] == ' '){
return false;
}
}
std::cout << "Its a tie!\n";
return true;}

