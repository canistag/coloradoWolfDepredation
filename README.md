# Wolf-Livestock Interaction Dashboard

A Flask web app that uses cleaned data from this [Colorado Parks and Wildlife document](https://docs.google.com/document/d/e/2PACX-1vTM3qrkYjvWR142mnWlKNmU_lnKMKo6WRtfrwzfJdXLOrYOXznlwf3mZQcXcGAPrEhrA5mjHK7zdRzp/pub). 

# Objective

Built to visualize which counties have the most recorded wolf interactions according to Colorado Parks and Wildlife data from 2021 - 2025.

# Methodology

Due to the fact that this document has inconsistent formatting, I sought out to create a dataset by hand in Excel. The relevant columns I found were Event Date, County, Amount, and Working Dog/Livestock Involved. Event Data data was standardized into a MM/DD/YYYY format. Working Dog/Livestock Involved was separated into 2 columns: Animals Total and AnimalType. AnimalType would then be cleaned with some trimming and if statements to become AnimalTypeClean. FIPS_Code was added after the fact once the web portion was proven to work. 

As it stands, the data was sorted into six final columns: Event Date, County, FIPS_Code, Amount, AnimalsTotal, AnimalTypeClean.

# Tech Stack

Excel, then SQLite, for the database. Python and Flask to hook it up to the web framework of HTML/CSS (specifically Pico) and JavaScript.
