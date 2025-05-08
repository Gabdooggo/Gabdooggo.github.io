#include <iostream>
#include <ctime>
//Null Value = a special value that means something has no value.
// When a pointer is holding a null value,
// that pointer is not pointing at anything (null pointer)
// nullptr = keyword represents a null pointer literal
//nullptr are helpful when determining if an address
// was succesfully assigned to a pointer
void drawBoard(char *spaces);
void playerMove(char *spaces, char player);
void computerMove(char *spaces, char computer);
bool Winner(char *spaces, char player, char computer);
bool Tie(char *spaces);
int main(){
char spaces[9] = {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '};
char player = 'X';
char computer = 'O';
bool running = "true";
drawBoard(spaces);
while(running){
playerMove(spaces, player);
drawBoard(spaces);
}
return 0;
}
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
void playerMove(char *spaces, char player){
int number;
do{
std::cout << "Enter a spot to place a marker (1-9)";
std::cin >> number;
number--;
if(spaces[number] == ' '){
spaces[number] = player;
break;
}
}while(!number > 0 &&  !number < 8);
}
void computerMove(char *spaces, char computer){

}
bool Winner(char *spaces, char player, char computer){

return 0;
}
bool Tie(char *spaces){

return 0;
}
