#include "../../include/models/Resource.h"

// Default constructor
Resource::Resource()
    : PortalItem(), category(""), filePath("")
{
}

// Parameterized constructor
Resource::Resource(const std::string& title,
                   const std::string& description,
                   const std::string& category,
                   const std::string& filePath)
    : PortalItem(title, description),
      category(category),
      filePath(filePath)
{
}

// Destructor
Resource::~Resource()
{
}

// Return the type of object
std::string Resource::getType() const
{
    return "Resource";
}

// Convert Resource object into JSON
crow::json::wvalue Resource::toJson() const
{
    crow::json::wvalue json;

    json["title"] = title;
    json["description"] = description;
    json["category"] = category;
    json["filePath"] = filePath;
    json["type"] = getType();

    return json;
}

// Getter for category
std::string Resource::getCategory() const
{
    return category;
}

// Getter for file path
std::string Resource::getFilePath() const
{
    return filePath;
}

// Setter for category
void Resource::setCategory(const std::string& category)
{
    this->category = category;
}

// Setter for file path
void Resource::setFilePath(const std::string& filePath)
{
    this->filePath = filePath;
}