#include <iostream>
// function template = describes what a function looks like. 
// Can be used to generate as many overloaded function as needed,
// Each using different data types.
//struct = A structure that group related variables under one name
// Structs can contain many different data types (string, int, double, bool, etc.)
// Variables in a struct are known as "Members"
// Members can be accessed with . "Class Member Access Operator"
struct Car{
std::string model;
int year;
std::string color;
};
void printCar(Car car);
int main(){
Car car1;
Car car2;
car1.model = "Mustang";
car1.year = 2023;
car1.color = "red";
car2.model = "Corvette";
car2.year = 2024;
car2.color = "blue";
printCar(car1);
return 0;
}
void printCar(Car car){
std::cout << car.model << '\n';
std::cout << car.year << '\n';
std::cout << car.color << '\n';
}
