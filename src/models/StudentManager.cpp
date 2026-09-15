#include "../../include/models/StudentManager.h"

// Add student
void StudentManager::addStudent(const Student& student)
{
    students.push_back(student);
}

// Authenticate student
bool StudentManager::authenticate(
    const std::string& gmail,
    const std::string& password) const
{
    for (const Student& student : students)
    {
        // StudentManager is a friend of Student,
        // so it can access private members.
        if (student.gmail == gmail &&
            student.password == password)
        {
            return true;
        }
    }

    return false;
}

// Find student
Student* StudentManager::findStudent(
    const std::string& gmail)
{
    for (Student& student : students)
    {
        if (student.gmail == gmail)
        {
            return &student;
        }
    }

    return nullptr;
}

// Get number of students
std::size_t StudentManager::getStudentCount() const
{
    return students.size();
}