#ifndef PORTAL_ITEM_H
#define PORTAL_ITEM_H

#include "../crow_all.h"
#include <string>

class PortalItem
{
protected:
    std::string title;
    std::string description;

public:
    // Default constructor
    PortalItem();

    // Parameterized constructor
    PortalItem(const std::string& title,
               const std::string& description);

    // Virtual destructor
    virtual ~PortalItem();

    // Pure virtual functions
    virtual std::string getType() const = 0;

    virtual crow::json::wvalue toJson() const = 0;
};

#endif