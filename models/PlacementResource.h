#ifndef PLACEMENT_RESOURCE_H
#define PLACEMENT_RESOURCE_H

#include "PortalItem.h"
#include <string>

class PlacementResource : public PortalItem
{
private:
    std::string category;
    std::string filePath;
    std::string company;

public:
    // Default constructor
    PlacementResource();

    // Parameterized constructor
    PlacementResource(const std::string& title,
                      const std::string& description,
                      const std::string& category,
                      const std::string& filePath,
                      const std::string& company);

    // Destructor
    ~PlacementResource() override;

    // Polymorphic functions
    std::string getType() const override;
    crow::json::wvalue toJson() const override;

    // Getters
    std::string getCategory() const;
    std::string getFilePath() const;
    std::string getCompany() const;

    // Setters
    void setCategory(const std::string& category);
    void setFilePath(const std::string& filePath);
    void setCompany(const std::string& company);
};

#endif