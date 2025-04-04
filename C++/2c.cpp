#include <iostream>

int main(){
//switch = alternative to using many "else if" statements
// Compare one value against matching cases
char grade;
std::cout << "What letter grade?: ";
std::cin >> grade;

switch(grade){
case 'A':
std::cout << "You did great!";
break;
case 'B':
std::cout << "You did good";
break;
case 'C':
std::cout << "you did okay";
break;
case 'D':
std::cout << "you did not do good";
break;
case 'F':
std::cout << "YOU FAILED!";
break;
default:
std::cout << "Please only enter in a letter grade (A-F)";
}

return 0;}
