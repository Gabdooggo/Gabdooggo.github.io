#include <iostream>
//pointers = Variable that stores a memory address of another variable
//Sometimes its easier to work with an address
//& address-of operator
// * dereference operator
int main(){
int age = 21;
std::string name = "Gabriel";
std::string freePizzas[5] = {"P1", "P2", "P3", "P4", "P5"};
std::string *pFree = freePizzas;
std::string *pName = &name;
int *pAge = &age;
std::cout << *pName << '\n';
std::cout << *pAge << '\n';
std::cout << *pFree << '\n';



return 0;
}
