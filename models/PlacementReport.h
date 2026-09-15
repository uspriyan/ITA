#ifndef PLACEMENT_REPORT_H
#define PLACEMENT_REPORT_H

#include "PortalItem.h"
#include <string>

class PlacementReport : public PortalItem
{
private:
    std::string domain;
    std::string company;
    std::string role;
    std::string academicYear;
    int studentsPlaced;

public:
    PlacementReport();

    PlacementReport(const std::string& title,
                    const std::string& description,
                    const std::string& domain,
                    const std::string& company,
                    const std::string& role,
                    const std::string& academicYear,
                    int studentsPlaced);

    ~PlacementReport() override;

    std::string getType() const override;
    crow::json::wvalue toJson() const override;

    std::string getDomain() const;
    std::string getCompany() const;
    std::string getRole() const;
    std::string getAcademicYear() const;
    int getStudentsPlaced() const;

    void setDomain(const std::string& domain);
    void setCompany(const std::string& company);
    void setRole(const std::string& role);
    void setAcademicYear(const std::string& academicYear);
    void setStudentsPlaced(int studentsPlaced);
};

#endif