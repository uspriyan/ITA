#ifndef STUDENT_H
#define STUDENT_H

#include <string>
#include <iosfwd>

// Forward declaration
class StudentManager;

class Student
{
private:
    std::string name;
    std::string gmail;
    std::string password;

    std::string registerNumber;
    std::string department;
    int year;

    // Friend class
    friend class StudentManager;

    // Friend function
    friend std::ostream& operator<<(std::ostream& os,
                                    const Student& student);

public:
    // Default constructor
    Student();

    // Parameterized constructor
    Student(const std::string& name,
            const std::string& gmail,
            const std::string& password,
            const std::string& registerNumber,
            const std::string& department,
            int year);

    // Getters
    std::string getName() const;
    std::string getGmail() const;
    std::string getRegisterNumber() const;
    std::string getDepartment() const;
    int getYear() const;

    // Setters
    void setName(const std::string& name);
    void setGmail(const std::string& gmail);
    void setRegisterNumber(const std::string& registerNumber);
    void setDepartment(const std::string& department);
    void setYear(int year);

    // Password-related function
    bool checkPassword(const std::string& enteredPassword) const;
};

// Friend operator function
std::ostream& operator<<(std::ostream& os,
                         const Student& student);

#endif