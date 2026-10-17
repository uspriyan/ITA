#include "include/crow_all.h"

#include "include/models/Resource.h"
#include "include/models/Event.h"
#include "include/models/PlacementResource.h"
#include "include/models/PlacementReport.h"
#include "include/models/PlacementReportManager.h"

#include <filesystem>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>
#include <stdexcept>

namespace fs = std::filesystem;
// command to execute the program
// g++ main.cpp src/models/PortalItem.cpp src/models/Resource.cpp src/models/Event.cpp src/models/PlacementResource.cpp src/models/PlacementReport.cpp src/models/PlacementReportManager.cpp src/models/Student.cpp src/models/StudentManager.cpp -std=c++17 -Iinclude -lws2_32 -lmswsock -o portal.exe

/* ============================================================
   TEMPLATE DECLARATION
   ============================================================ */
// I used templates here
template <typename Container>
void validate_file_extension(const std::string& extension, const Container& valid_extensions) {
    auto it = std::find(valid_extensions.begin(), valid_extensions.end(), extension);
    if (it == valid_extensions.end()) {
        throw std::runtime_error("The file belongs to unreadable format!!");
    }
}

/* ============================================================
   MIME TYPE
   ============================================================ */
// A perfect inline function: short, fast, and heavily repeated
inline std::string to_lowercase(std::string str) {
    std::transform(str.begin(), str.end(), str.begin(), [](unsigned char c) { 
        return std::tolower(c); 
    });
    return str;
}

std::string get_mime_type(const std::string& extension)
{
    if (extension == ".html")
        return "text/html";

    if (extension == ".css")
        return "text/css";

    if (extension == ".js")
        return "application/javascript";

    if (extension == ".pdf")
        return "application/pdf";

    if (extension == ".jpg" ||
        extension == ".jpeg")
        return "image/jpeg";

    if (extension == ".png")
        return "image/png";

    if (extension == ".svg")
        return "image/svg+xml";

    return "application/octet-stream";
}


/* ============================================================
   SERVE PUBLIC FILE
   ============================================================ */

crow::response serve_public_file(
    const std::string& relative_path)
{
    std::string full_path =
        "public/" + relative_path;
// i can use try and catch block here
    if (!fs::exists(full_path) ||
        !fs::is_regular_file(full_path))
    {
        return crow::response(404);
    }

    std::ifstream file(
        full_path,
        std::ios::binary
    );
//i could use try& catch block
    if (!file)
    {
        return crow::response(500);
    }

    std::string content(
        (std::istreambuf_iterator<char>(file)),
        std::istreambuf_iterator<char>()
    );

    crow::response response;

    response.code = 200;

    response.set_header(
        "Content-Type",
        get_mime_type(
            fs::path(full_path)
                .extension()
                .string()
        )
    );

    response.body = content;

    return response;
}


/* ============================================================
   RESOURCE DIRECTORY SCANNER
   ============================================================ */

crow::json::wvalue scan_resources_directory()
{
    crow::json::wvalue result;

    std::vector<crow::json::wvalue> categories;

    std::string resources_directory =
        "public/resources";
//I'm gonna use try and catch block here
//To check the existence of resources
    try{
        if (!fs::exists(resources_directory))
        {
            throw std::runtime_error("The resources directory is not available!!!");
        }
    }
    catch(std::runtime_error e){
        std::cout<<"Error :"<<e.what()<<std::endl;
        return categories;
    }
    for (const auto& category_entry :
         fs::directory_iterator(resources_directory))
    {
        // I used try here
        try{
        if (!category_entry.is_directory())
        {
            throw std::runtime_error("Subfolder is not present");
        }
    }
        catch(std::runtime_error e){
            std::cout<<"Error :"<<e.what()<<std::endl;
            continue;
        }

        crow::json::wvalue category;

        std::string category_name =
            category_entry.path().filename().string();

        category["category_name"] =
            category_name;

        std::vector<crow::json::wvalue> files;

        for (const auto& file_entry :
             fs::directory_iterator(
                 category_entry.path()
             ))
        {
            //I used try block here
        try{
            if (!file_entry.is_regular_file())
                {
                    throw std::runtime_error("File has irregular format ");
                }
        }
        catch(std::runtime_error e){

            std::cout<<"Error :"<<e.what()<<std::endl;
            continue;

        }
            std::string extension =
                file_entry.path()
                    .extension()
                    .string();
        extension = to_lowercase(extension);
            
            try{
                // I used templates here
                std::vector<std::string> allowed_extensions = { ".pdf", ".jpg", ".jpeg", ".png" };
                validate_file_extension(extension, allowed_extensions);
        }
        catch(std::runtime_error e){
            std::cout<<"Error :"<<e.what()<<std::endl;
            continue;
        }

            crow::json::wvalue file;

            file["filename"] =
                file_entry.path()
                    .filename()
                    .string();

            file["path"] =
                "resources/" +
                category_name +
                "/" +
                file_entry.path()
                    .filename()
                    .string();

            files.push_back(
                std::move(file)
            );
        }

        category["files"] =
            std::move(files);

        categories.push_back(
            std::move(category)
        );
    }

    return categories;
}


/* ============================================================
   PLACEMENT RESOURCES SCANNER
   ============================================================ */

crow::json::wvalue
scan_placement_resources_directory()
{
    std::vector<crow::json::wvalue> resources;

    std::string directory =
        "public/placement-resources";

    
    try{
        if (!fs::exists(directory))
        {
            throw std::runtime_error("The resources directory is not available!!!");
        }
    }
    catch(std::runtime_error e){
        std::cout<<"Error :"<<e.what()<<std::endl;
        return resources;
    }
    for (const auto& file_entry :
         fs::directory_iterator(directory))
    {
        //I have used the try and catch block here.
        try{
            if (!file_entry.is_regular_file())
                {
                    throw std::runtime_error("File has irregular format ");
                }
        }
        catch(std::runtime_error e){

            std::cout<<"Error :"<<e.what()<<std::endl;
            continue;

        }

        std::string extension =
            file_entry.path()
                .extension()
                .string();

        extension = to_lowercase(extension);
        //I have used the try and catch block here
        try{
                // I used templates here
                std::vector<std::string> allowed_extensions = { ".pdf" };
                validate_file_extension(extension, allowed_extensions);
        }
        catch(std::runtime_error e){
            std::cout<<"\nError : "<<e.what()<<std::endl;
            continue;
        }
        

        std::string filename =
            file_entry.path()
                .filename()
                .string();

        std::string title =
            file_entry.path()
                .stem()
                .string();

        PlacementResource resource(
            title,
            "Placement preparation resource",
            "Placement",
            filename,
            ""
        );

        crow::json::wvalue json =
            resource.toJson();

        json["filename"] =
            filename;

        json["path"] =
            "placement-resources/" +
            filename;

        resources.push_back(
            std::move(json)
        );
    }

    return resources;
}


/* ============================================================
   EVENTS SCANNER
   ============================================================ */

crow::json::wvalue
scan_events_directory()
{
    std::vector<crow::json::wvalue> events;

    std::string directory =
        "public/events";

    try{
        if (!fs::exists(directory))
        {
            throw std::runtime_error("The resources directory is not available!!!");
        }
    }
    catch(std::runtime_error e){
        std::cout<<"Error :"<<e.what()<<std::endl;
        return events;
    }

    for (const auto& file_entry :
         fs::directory_iterator(directory))
    {
        
        try{
            if (!file_entry.is_regular_file())
                {
                    throw std::runtime_error("File has irregular format ");
                }
        }
        catch(std::runtime_error e){

            std::cout<<"Error :"<<e.what()<<std::endl;
            continue;

        }

        std::string extension =
            file_entry.path()
                .extension()
                .string();


        extension = to_lowercase(extension);


        /*
         * Currently we are focusing on JPEG
         * event posters.
         */

        try {
            // I used templates here
            std::vector<std::string> allowed_extensions = { ".jpeg", ".jpg" };
            validate_file_extension(extension, allowed_extensions);
    }
    catch(std::runtime_error e){
        std::cout<<"\nError : "<<e.what()<<std::endl;
        continue;
    }


        std::string filename =
            file_entry.path()
                .filename()
                .string();


        /*
         * The filename becomes the event title.
         *
         * Example:
         *
         * tech-fest.jpeg
         *
         * becomes:
         *
         * Tech Fest
         */

        std::string title =
            file_entry.path()
                .stem()
                .string();


        for (char& character : title)
        {
            if (
                character == '-' ||
                character == '_'
            )
            {
                character = ' ';
            }
        }


        /*
         * Capitalize first letter of each word.
         */

        bool new_word = true;

        for (char& character : title)
        {
            if (std::isspace(
                    static_cast<unsigned char>(
                        character
                    )
                ))
            {
                new_word = true;
            }
            else if (new_word)
            {
                character =
                    static_cast<char>(
                        std::toupper(
                            static_cast<unsigned char>(
                                character
                            )
                        )
                    );

                new_word = false;
            }
        }


        /*
         * Create Event object.
         *
         * Date and venue can later be replaced
         * with real event information.
         */

        Event event(
            title,
            "Campus event organized by the Information Technology Association.",
            "Date to be announced",
            "Campus",
            "events/" + filename
        );


        crow::json::wvalue json =
            event.toJson();


        /*
         * Extra fields are useful for
         * frontend rendering.
         */

        json["filename"] =
            filename;

        json["poster"] =
            "events/" + filename;

        json["path"] =
            "events/" + filename;


        events.push_back(
            std::move(json)
        );
    }


    /*
     * Keep event order predictable.
     */

    return events;
}


/* ============================================================
   PLACEMENT REPORT SAMPLE DATA
   ============================================================ */

PlacementReportManager
createPlacementManager()
{
    PlacementReportManager manager;


    /* ========================================================
       ROBOTICS
       ======================================================== */

    manager.addReport(
        PlacementReport(
            "TCS",
            "Robotics placement report",
            "Robotics",
            "TCS",
            "Robotics Engineer",
            "2024-25",
            24
        )
    );

    manager.addReport(
        PlacementReport(
            "Infosys",
            "Robotics placement report",
            "Robotics",
            "Infosys",
            "Robotics Engineer",
            "2024-25",
            18
        )
    );

    manager.addReport(
        PlacementReport(
            "ABB",
            "Robotics placement report",
            "Robotics",
            "ABB",
            "Automation Engineer",
            "2024-25",
            12
        )
    );

    manager.addReport(
        PlacementReport(
            "Amazon",
            "Robotics placement report",
            "Robotics",
            "Amazon",
            "Robotics Engineer",
            "2024-25",
            15
        )
    );

    manager.addReport(
        PlacementReport(
            "Siemens",
            "Robotics placement report",
            "Robotics",
            "Siemens",
            "Automation Engineer",
            "2024-25",
            20
        )
    );

    manager.addReport(
        PlacementReport(
            "Bosch",
            "Robotics placement report",
            "Robotics",
            "Bosch",
            "Robotics Engineer",
            "2024-25",
            10
        )
    );


    /* ========================================================
       SOFTWARE DEVELOPMENT
       ======================================================== */

    manager.addReport(
        PlacementReport(
            "TCS",
            "Software development placement report",
            "Software Development",
            "TCS",
            "Software Engineer",
            "2024-25",
            35
        )
    );

    manager.addReport(
        PlacementReport(
            "Infosys",
            "Software development placement report",
            "Software Development",
            "Infosys",
            "Software Engineer",
            "2024-25",
            28
        )
    );

    manager.addReport(
        PlacementReport(
            "Wipro",
            "Software development placement report",
            "Software Development",
            "Wipro",
            "Full Stack Developer",
            "2024-25",
            20
        )
    );


    /* ========================================================
       WEB DEVELOPMENT
       ======================================================== */

    manager.addReport(
        PlacementReport(
            "Zoho",
            "Web development placement report",
            "Web Development",
            "Zoho",
            "Web Developer",
            "2024-25",
            18
        )
    );

    manager.addReport(
        PlacementReport(
            "Freshworks",
            "Web development placement report",
            "Web Development",
            "Freshworks",
            "Frontend Developer",
            "2024-25",
            14
        )
    );


    /* ========================================================
       DATA SCIENCE
       ======================================================== */

    manager.addReport(
        PlacementReport(
            "Amazon",
            "Data science placement report",
            "Data Science",
            "Amazon",
            "Data Scientist",
            "2024-25",
            16
        )
    );

    manager.addReport(
        PlacementReport(
            "Microsoft",
            "Data science placement report",
            "Data Science",
            "Microsoft",
            "Data Analyst",
            "2024-25",
            12
        )
    );


    /* ========================================================
       CYBER SECURITY
       ======================================================== */

    manager.addReport(
        PlacementReport(
            "Cisco",
            "Cyber security placement report",
            "Cyber Security",
            "Cisco",
            "Security Engineer",
            "2024-25",
            15
        )
    );

    manager.addReport(
        PlacementReport(
            "Deloitte",
            "Cyber security placement report",
            "Cyber Security",
            "Deloitte",
            "Cyber Security Analyst",
            "2024-25",
            11
        )
    );


    return manager;
}


/* ============================================================
   MAIN
   ============================================================ */

int main()
{
    crow::SimpleApp app;


    /* ========================================================
       RESOURCES API
       ======================================================== */

    CROW_ROUTE(
        app,
        "/api/resources"
    )
    ([]()
    {
        return scan_resources_directory();
    });


    /* ========================================================
       PLACEMENT RESOURCES API
       ======================================================== */

    CROW_ROUTE(
        app,
        "/api/placement-resources"
    )
    ([]()
    {
        return scan_placement_resources_directory();
    });


    /* ========================================================
       EVENTS API
       ======================================================== */

    CROW_ROUTE(
        app,
        "/api/events"
    )
    ([]()
    {
        return scan_events_directory();
    });


    /* ========================================================
       PLACEMENT REPORT API
       ======================================================== */

    PlacementReportManager
        placementManager =
            createPlacementManager();


    CROW_ROUTE(
        app,
        "/api/placement-reports"
    )
    ([&placementManager]()
    {
        crow::json::wvalue response;

        std::vector<std::string> domains =
            placementManager.getDomains();

        response["domains"] =
            domains;

        if (!domains.empty())
        {
            response["selectedDomain"] =
                domains[0];
        }

        return response;
    });


    /* ========================================================
       PLACEMENT REPORT DOMAIN API
       ======================================================== */

    CROW_ROUTE(
        app,
        "/api/placement-reports/<string>"
    )
    ([&placementManager](
        std::string domain
    )
    {
        crow::json::wvalue response;

        response["domain"] =
            domain;

        response["totalStudents"] =
            placementManager
                .getTotalStudentsPlaced(
                    domain
                );

        response["companyCount"] =
            placementManager
                .getCompanyCount(
                    domain
                );


        std::map<std::string, int>
            companyStatistics =
                placementManager
                    .getCompanyStatistics(
                        domain
                    );


        std::map<std::string, int>
            roleStatistics =
                placementManager
                    .getRoleStatistics(
                        domain
                    );


        std::vector<crow::json::wvalue>
            companies;


        for (
            const auto& pair :
            companyStatistics
        )
        {
            crow::json::wvalue company;

            company["company"] =
                pair.first;

            company["students"] =
                pair.second;

            companies.push_back(
                std::move(company)
            );
        }


        std::vector<crow::json::wvalue>
            roles;


        for (
            const auto& pair :
            roleStatistics
        )
        {
            crow::json::wvalue role;

            role["role"] =
                pair.first;

            role["students"] =
                pair.second;

            roles.push_back(
                std::move(role)
            );
        }


        response["companies"] =
            std::move(companies);

        response["roles"] =
            std::move(roles);


        return response;
    });


    /* ========================================================
       STATIC FILE ROUTES
       ======================================================== */

    CROW_ROUTE(
        app,
        "/"
    )
    ([]()
    {
        return serve_public_file(
            "index.html"
        );
    });


    CROW_ROUTE(
        app,
        "/<string>"
    )
    ([](
        std::string path
    )
    {
        return serve_public_file(
            path
        );
    });


    CROW_ROUTE(
        app,
        "/<string>/<string>"
    )
    ([](
        std::string folder,
        std::string file
    )
    {
        return serve_public_file(
            folder + "/" + file
        );
    });


    CROW_ROUTE(
        app,
        "/<string>/<string>/<string>"
    )
    ([](
        std::string folder1,
        std::string folder2,
        std::string file
    )
    {
        return serve_public_file(
            folder1 + "/" +
            folder2 + "/" +
            file
        );
    });


    /* ========================================================
       START SERVER
       ======================================================== */

    app
        .port(18080)
        .multithreaded()
        .run();
}
