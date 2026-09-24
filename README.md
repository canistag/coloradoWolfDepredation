# Wolf-Livestock Interaction Dashboard

A Flask web app that uses cleaned data from this [Colorado Parks and Wildlife document](https://docs.google.com/document/d/e/2PACX-1vTM3qrkYjvWR142mnWlKNmU_lnKMKo6WRtfrwzfJdXLOrYOXznlwf3mZQcXcGAPrEhrA5mjHK7zdRzp/pub). 

Hosted on [PythonAnywhere](https://canistag.pythonanywhere.com/)

<img width="1908" height="527" alt="image" src="https://github.com/user-attachments/assets/6630737b-1b41-4f4c-aa3b-fb6ab4cfb9de" />

# Objective
Built to visualize which counties have the most recorded wolf interactions according to Colorado Parks and Wildlife data from 2021 - 2025.

# Methodology
Due to the fact that this document has inconsistent formatting, I sought out to create a dataset by hand in Excel. The relevant columns I found were Event Date, County, Amount, and Working Dog/Livestock Involved. Event Date data was standardized into a consistent format. Working Dog/Livestock Involved was separated into 2 columns: Animals Total and AnimalType. AnimalType would then be cleaned with some trimming and if statements to become AnimalTypeClean. FIPS_Code was added after the fact once the web portion was proven to work. 

As it stands, the data was sorted into six final columns: Event Date, County, FIPS_Code, Amount, AnimalsTotal, AnimalTypeClean.

# Tech Stack
Excel, then SQLite, for the database. Python and Flask to hook it up to the web framework of HTML/CSS (specifically Pico) and JavaScript.

# Documentation
Within the createDB.py, app.py and app.js files, you will find commented documentation for learning purposes.

# Requirements

Python 3 and Flask (listed in requirements.txt).

# How to Run Locally

```
git clone https://github.com/canistag/coloradoWolfDepredation.git
cd coloradoWolfDepredation
pip install -r requirements.txt
python app.py
```
Open http://127.0.0.1:5000

# Updating the Database
The entire project is dependent on the wolfCleaned.xlsx spreadsheet. If updates are made to wolfCleaned.xlsx, the createDB file must be ran again to update the database, wolfCleaned.db.

