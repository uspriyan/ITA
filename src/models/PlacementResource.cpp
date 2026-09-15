#include "../../include/models/PlacementResource.h"

// Default constructor
PlacementResource::PlacementResource()
    : PortalItem(),
      category(""),
      filePath(""),
      company("")
{
}

// Parameterized constructor
PlacementResource::PlacementResource(
    const std::string& title,
    const std::string& description,
    const std::string& category,
    const std::string& filePath,
    const std::string& company)
    : PortalItem(title, description),
      category(category),
      filePath(filePath),
      company(company)
{
}

// Destructor
PlacementResource::~PlacementResource()
{
}

// Return object type
std::string PlacementResource::getType() const
{
    return "PlacementResource";
}

// Convert object to JSON
crow::json::wvalue PlacementResource::toJson() const
{
    crow::json::wvalue json;

    json["title"] = title;
    json["description"] = description;
    json["category"] = category;
    json["filePath"] = filePath;
    json["company"] = company;
    json["type"] = getType();

    return json;
}

// Getters
std::string PlacementResource::getCategory() const
{
    return category;
}

std::string PlacementResource::getFilePath() const
{
    return filePath;
}

std::string PlacementResource::getCompany() const
{
    return company;
}

// Setters
void PlacementResource::setCategory(const std::string& category)
{
    this->category = category;
}

void PlacementResource::setFilePath(const std::string& filePath)
{
    this->filePath = filePath;
}

void PlacementResource::setCompany(const std::string& company)
{
    this->company = company;
}