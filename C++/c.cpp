#include <iostream>
void swap(std::string &x, std::string &y);
int main(){
//Memory address = a location in memory where data is stored
//a memory address can be accesed with & (address-of operator
std::string x = "Kool Aid";
std::string y = "water";
swap(x,y);
std::cout << "X: " << x << '\n';
std::cout << "Y: " << y << '\n';
return 0;
}
void swap(std::string &x, std::string &y){
std::string temp;
temp = x;
x = y;
y = temp;
}
