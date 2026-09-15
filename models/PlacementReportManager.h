#ifndef PLACEMENT_REPORT_MANAGER_H
#define PLACEMENT_REPORT_MANAGER_H

#include "PlacementReport.h"
#include <vector>
#include <string>
#include <map>

class PlacementReportManager
{
private:
    std::vector<PlacementReport> reports;

public:
    void addReport(const PlacementReport& report);

    std::vector<PlacementReport> getReportsByDomain(
        const std::string& domain) const;

    std::vector<std::string> getDomains() const;

    int getTotalStudentsPlaced(
        const std::string& domain) const;

    int getCompanyCount(
        const std::string& domain) const;

    std::map<std::string, int> getCompanyStatistics(
        const std::string& domain) const;

    std::map<std::string, int> getRoleStatistics(
        const std::string& domain) const;

    std::size_t getReportCount() const;
};

#endif