#include "../../include/models/PlacementReport.h"

PlacementReport::PlacementReport()
    : PortalItem(),
      domain(""),
      company(""),
      role(""),
      academicYear(""),
      studentsPlaced(0)
{
}

PlacementReport::PlacementReport(
    const std::string& title,
    const std::string& description,
    const std::string& domain,
    const std::string& company,
    const std::string& role,
    const std::string& academicYear,
    int studentsPlaced)
    : PortalItem(title, description),
      domain(domain),
      company(company),
      role(role),
      academicYear(academicYear),
      studentsPlaced(studentsPlaced)
{
}

PlacementReport::~PlacementReport()
{
}

std::string PlacementReport::getType() const
{
    return "PlacementReport";
}

crow::json::wvalue PlacementReport::toJson() const
{
    crow::json::wvalue json;

    json["title"] = title;
    json["description"] = description;
    json["domain"] = domain;
    json["company"] = company;
    json["role"] = role;
    json["academicYear"] = academicYear;
    json["studentsPlaced"] = studentsPlaced;
    json["type"] = getType();

    return json;
}

std::string PlacementReport::getDomain() const
{
    return domain;
}

std::string PlacementReport::getCompany() const
{
    return company;
}

std::string PlacementReport::getRole() const
{
    return role;
}

std::string PlacementReport::getAcademicYear() const
{
    return academicYear;
}

int PlacementReport::getStudentsPlaced() const
{
    return studentsPlaced;
}

void PlacementReport::setDomain(const std::string& domain)
{
    this->domain = domain;
}

void PlacementReport::setCompany(const std::string& company)
{
    this->company = company;
}

void PlacementReport::setRole(const std::string& role)
{
    this->role = role;
}

void PlacementReport::setAcademicYear(const std::string& academicYear)
{
    this->academicYear = academicYear;
}

void PlacementReport::setStudentsPlaced(int studentsPlaced)
{
    this->studentsPlaced = studentsPlaced;
}