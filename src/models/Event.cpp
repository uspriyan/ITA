#include "../../include/models/Event.h"

// Default constructor
Event::Event()
    : PortalItem(),
      date(""),
      venue(""),
      posterPath("")
{
}

// Parameterized constructor
Event::Event(const std::string& title,
             const std::string& description,
             const std::string& date,
             const std::string& venue,
             const std::string& posterPath)
    : PortalItem(title, description),
      date(date),
      venue(venue),
      posterPath(posterPath)
{
}

// Destructor
Event::~Event()
{
}

// Return object type
std::string Event::getType() const
{
    return "Event";
}

// Convert Event to JSON
crow::json::wvalue Event::toJson() const
{
    crow::json::wvalue json;

    json["title"] = title;
    json["description"] = description;
    json["date"] = date;
    json["venue"] = venue;
    json["posterPath"] = posterPath;
    json["type"] = getType();

    return json;
}

// Getters
std::string Event::getDate() const
{
    return date;
}

std::string Event::getVenue() const
{
    return venue;
}

std::string Event::getPosterPath() const
{
    return posterPath;
}

// Setters
void Event::setDate(const std::string& date)
{
    this->date = date;
}

void Event::setVenue(const std::string& venue)
{
    this->venue = venue;
}

void Event::setPosterPath(const std::string& posterPath)
{
    this->posterPath = posterPath;
}