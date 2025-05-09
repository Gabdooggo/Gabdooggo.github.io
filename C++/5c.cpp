#include <iostream>
// recurions = a programming technique where a function invokes itself from within break a complex concept into a repeatable single step. 
// (iterative vs recursive)
// advantages = less code and is cleaner. Useful for sorting and searching algorithms.
// Disadvantages = uses more meory and is slower.
void walk(int steps);
int main(){
walk(100);
return 0;
}
void walk(int steps){
if(steps > 0){
std::cout << "You take a step!\n";
walk(steps - 1);
}}
