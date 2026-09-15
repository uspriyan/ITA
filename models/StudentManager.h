#ifndef STUDENT_MANAGER_H
#define STUDENT_MANAGER_H

#include "Student.h"
#include <vector>
#include <string>

class StudentManager
{
private:
    std::vector<Student> students;

public:
    // Add student
    void addStudent(const Student& student);

    // Authenticate student
    bool authenticate(const std::string& gmail,
                      const std::string& password) const;

    // Find student
    Student* findStudent(const std::string& gmail);

    // Number of students
    std::size_t getStudentCount() const;
};

#endif