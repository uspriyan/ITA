#include "../../include/models/PlacementReportManager.h"

void PlacementReportManager::addReport(
    const PlacementReport& report)
{
    reports.push_back(report);
}


std::vector<PlacementReport>
PlacementReportManager::getReportsByDomain(
    const std::string& domain) const
{
    std::vector<PlacementReport> result;

    for (const PlacementReport& report : reports)
    {
        if (report.getDomain() == domain)
        {
            result.push_back(report);
        }
    }

    return result;
}


std::vector<std::string>
PlacementReportManager::getDomains() const
{
    std::vector<std::string> domains;

    for (const PlacementReport& report : reports)
    {
        bool alreadyExists = false;

        for (const std::string& domain : domains)
        {
            if (domain == report.getDomain())
            {
                alreadyExists = true;
                break;
            }
        }

        if (!alreadyExists)
        {
            domains.push_back(report.getDomain());
        }
    }

    return domains;
}


int PlacementReportManager::getTotalStudentsPlaced(
    const std::string& domain) const
{
    int total = 0;

    for (const PlacementReport& report : reports)
    {
        if (report.getDomain() == domain)
        {
            total += report.getStudentsPlaced();
        }
    }

    return total;
}


int PlacementReportManager::getCompanyCount(
    const std::string& domain) const
{
    std::map<std::string, int> companies =
        getCompanyStatistics(domain);

    return static_cast<int>(companies.size());
}


std::map<std::string, int>
PlacementReportManager::getCompanyStatistics(
    const std::string& domain) const
{
    std::map<std::string, int> statistics;

    for (const PlacementReport& report : reports)
    {
        if (report.getDomain() == domain)
        {
            statistics[report.getCompany()]
                += report.getStudentsPlaced();
        }
    }

    return statistics;
}


std::map<std::string, int>
PlacementReportManager::getRoleStatistics(
    const std::string& domain) const
{
    std::map<std::string, int> statistics;

    for (const PlacementReport& report : reports)
    {
        if (report.getDomain() == domain)
        {
            statistics[report.getRole()]
                += report.getStudentsPlaced();
        }
    }

    return statistics;
}


std::size_t PlacementReportManager::getReportCount() const
{
    return reports.size();
}