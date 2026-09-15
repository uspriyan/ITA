#ifndef EVENT_H
#define EVENT_H

#include "PortalItem.h"
#include <string>

class Event : public PortalItem
{
private:
    std::string date;
    std::string venue;
    std::string posterPath;

public:
    // Default constructor
    Event();

    // Parameterized constructor
    Event(const std::string& title,
          const std::string& description,
          const std::string& date,
          const std::string& venue,
          const std::string& posterPath);

    // Destructor
    ~Event() override;

    // Polymorphic functions
    std::string getType() const override;
    crow::json::wvalue toJson() const override;

    // Getters
    std::string getDate() const;
    std::string getVenue() const;
    std::string getPosterPath() const;

    // Setters
    void setDate(const std::string& date);
    void setVenue(const std::string& venue);
    void setPosterPath(const std::string& posterPath);
};

#endif