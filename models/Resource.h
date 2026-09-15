#ifndef RESOURCE_H
#define RESOURCE_H

#include "PortalItem.h"
#include <string>

class Resource : public PortalItem
{
private:
    std::string category;
    std::string filePath;

public:
    // Default constructor
    Resource();

    // Parameterized constructor
    Resource(const std::string& title,
             const std::string& description,
             const std::string& category,
             const std::string& filePath);

    // Destructor
    ~Resource() override;

    // Override base-class functions
    std::string getType() const override;

    crow::json::wvalue toJson() const override;

    // Getters
    std::string getCategory() const;
    std::string getFilePath() const;

    // Setters
    void setCategory(const std::string& category);
    void setFilePath(const std::string& filePath);
};

#endif