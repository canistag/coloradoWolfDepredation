# Wolf-Livestock Interaction Dashboard

A Flask web app that uses cleaned data from this [Colorado Parks and Wildlife document](https://docs.google.com/document/d/e/2PACX-1vTM3qrkYjvWR142mnWlKNmU_lnKMKo6WRtfrwzfJdXLOrYOXznlwf3mZQcXcGAPrEhrA5mjHK7zdRzp/pub). 

Hosted on [PythonAnywhere](https://canistag.pythonanywhere.com/)

<img width="1908" height="527" alt="image" src="https://github.com/user-attachments/assets/6630737b-1b41-4f4c-aa3b-fb6ab4cfb9de" />

## Objective
Built to visualize which counties have the most recorded wolf interactions according to Colorado Parks and Wildlife data from 2021 - 2025. The goal of this analysis is to find if there is a correlation between the number of livestock interactions and the wolf population.

## Methodology
Due to the fact that this document has inconsistent formatting, I sought out to create a dataset by hand in Excel. The relevant columns I found were Event Date, County, Amount, and Working Dog/Livestock Involved. Event Date data was standardized into a consistent format. Working Dog/Livestock Involved was separated into 2 columns: Animals Total and AnimalType. AnimalType would then be cleaned with some trimming and if statements to become AnimalTypeClean. FIPS_Code was added after the fact once the web portion was proven to work. As it stands, the data was sorted into six final columns: Event Date, County, FIPS_Code, Amount, AnimalsTotal, AnimalTypeClean.

## Tech Stack
Excel, then SQLite, for the database. Python and Flask to hook it up to the web framework of HTML/CSS (specifically Pico) and JavaScript.

## Documentation
Within the createDB.py, app.py and app.js files, you will find commented documentation for learning purposes. More information can be found [here](https://github.com/canistag/guides/blob/main/simpleFlaskDashboard.md#setting-up-a-simple-data-visualization-dashboard-with-flask).

## Limitations

Data is not live and is hand-cleaned from an inconsistently formatted documents.

## Requirements

Python 3 and Flask (listed in requirements.txt).

## How to Run Locally

```
git clone https://github.com/canistag/coloradoWolfDepredation.git
cd coloradoWolfDepredation
pip install -r requirements.txt
python app.py
```
Open http://127.0.0.1:5000

## Updating the Database
The entire project is dependent on the wolfCleaned.xlsx spreadsheet. If updates are made to wolfCleaned.xlsx, the createDB file must be ran again to update the database, wolfCleaned.db.

# Correlation

In order to answer the question of correlation, the population of wolves must exist in the study alongside the annual livestock interactions.

## Building the Wolf Population Data

| Year | Number of Minimum Known Wolves (All Ages) |
| -------- | ------ |
| 2019 | 7 |
| 2020 | 2 |
| 2021 | 8 |
| 2022 | 3 |
| 2023 | 12 |
| 2024 | 15 |
| 2025 | 32 |

## Sources

- [Colorado Parks and Wildlife Annual Report 2023-2024](https://cpw.widencollective.com/assets/share/asset/qw3gprtvo0)

- [Colorado Parks and Wildlife Annual Report 2024-2025](https://cpw.widen.net/s/zrwlvknhpr/2024-2025-gray-wolf-annual-report)  

- [Colorado Parks and Wildlife Annual Report 2025-2026](https://cpw.widencollective.com/assets/share/asset/emfd3izlbi)

- [International Wolf Center](https://wolf.org/wow/united-states/colorado/)


# Initial Findings

While the Pearson Correlation produced 0.747529084 (which is close to +1, indicating a correlation), the linear regression revealed a p-value of 0.274576629 which (because it is greater than 0.05) tells us that the relationship is not statistically significant. This concludes that wolf populations have no significant bearing on the amount of livestock incidents that occur.

## Limitations
This dataset is very small and could potentially struggle to detect trends.

# Further Findings

## Possible Factors to Consider

In Colorado Parks and Wildlife Annual Report 2023-2024, CPW lists elk and moose as factors to consider. With these in mind, we can create further questions. 

- Are elk/moose and wolf populations correlated?

- In the presence of elk/moose populations, how does the number of livestock interactions change?
  
- How is the wolf population predicted to grow?

# What's Next

Predictive analysis. User directed dynamic filtering on charts. 



