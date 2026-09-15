#include "../../include/models/Student.h"

#include <iostream>

// Default constructor
Student::Student()
    : name(""),
      gmail(""),
      password(""),
      registerNumber(""),
      department(""),
      year(0)
{
}

// Parameterized constructor
Student::Student(
    const std::string& name,
    const std::string& gmail,
    const std::string& password,
    const std::string& registerNumber,
    const std::string& department,
    int year)
    : name(name),
      gmail(gmail),
      password(password),
      registerNumber(registerNumber),
      department(department),
      year(year)
{
}

// Getters
std::string Student::getName() const
{
    return name;
}

std::string Student::getGmail() const
{
    return gmail;
}

std::string Student::getRegisterNumber() const
{
    return registerNumber;
}

std::string Student::getDepartment() const
{
    return department;
}

int Student::getYear() const
{
    return year;
}

// Setters
void Student::setName(const std::string& name)
{
    this->name = name;
}

void Student::setGmail(const std::string& gmail)
{
    this->gmail = gmail;
}

void Student::setRegisterNumber(const std::string& registerNumber)
{
    this->registerNumber = registerNumber;
}

void Student::setDepartment(const std::string& department)
{
    this->department = department;
}

void Student::setYear(int year)
{
    this->year = year;
}

// Check password
bool Student::checkPassword(
    const std::string& enteredPassword) const
{
    return password == enteredPassword;
}

// Friend operator<<
std::ostream& operator<<(std::ostream& os,
                         const Student& student)
{
    os << "Student Information\n";
    os << "Name: " << student.name << '\n';
    os << "Gmail: " << student.gmail << '\n';
    os << "Register Number: "
       << student.registerNumber << '\n';
    os << "Department: "
       << student.department << '\n';
    os << "Year: " << student.year << '\n';

    return os;
}