#include <iostream>
int getDigit(const int number);
int sumOdd(const std::string cardNumber);
int sumEven(const std::string cardNumber);
int main(){
//const parameter = parameter that is effectively read-only
//code is more secure and conveys intent
//useful for references and pointers
std::string cardNumber;
int result = 0;
std::cout << "Enter your credit card number here.\n";
getline(std::cin, cardNumber);
result = sumEven(cardNumber) + sumOdd(cardNumber);
if(result % 10 == 0){
std::cout << cardNumber << ": Is Valid";
}
else{
std::cout << cardNumber << ": Is not Valid";
}
return 0;
}
int getDigit(const int number){
return number  % 10 + (number / 10 % 10);
}
int sumOdd(const std::string cardNumber){
int sum = 0;
for(int i = cardNumber.size() -1; i >= 0; i -= 2){
sum += cardNumber[i] - '0';
}
return sum;
}
int sumEven(const std::string cardNumber){
int sum = 0;
for(int i = cardNumber.size() -2; i >= 0; i -= 2){
sum += getDigit((cardNumber[i] - '0') * 2);
}
return sum;
}

