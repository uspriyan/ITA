#include "../../include/models/PortalItem.h"

// Default constructor
PortalItem::PortalItem()
    : title(""), description("")
{
}

// Parameterized constructor
PortalItem::PortalItem(const std::string& title,
                       const std::string& description)
    : title(title), description(description)
{
}

// Virtual destructor
PortalItem::~PortalItem()
{
}