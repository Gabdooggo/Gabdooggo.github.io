#include <iostream>

int main(){
//switch = alternative to using many "else if" statements
// Compare one value against matching cases
char op;
double num1;
double num2;
double result;
std::cout << "********** CALCULATOR ************* '\n'";
std::cout << "Enter either (+ - * /.)";
std::cin >> op;
if(op == '+' or '*' or '-' or '/'){
std::cout << "Enter #1: ";
std::cin >> num1;
std::cout << "Enter #2: ";
std::cin >> num2;
}
else{
std::cout << "That wasn't a valid response";
}
switch(op){
case '+':
result = num1 + num2;
std::cout <<"result: " << result << '\n';
break;
case '-':
result = num1 - num2;
std::cout <<"result: " << result << '\n';
break;
case '*':
result = num1 * num2;
std::cout <<"result: " << result << '\n';
break;
case '/':
result = num1 / num2;
std::cout <<"result: " << result << '\n';
break;
default:
std::cout << "That wasn't a valid response '\n'";
break;
}
std::cout << "********************* *************";
return 0;}
