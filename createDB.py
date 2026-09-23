from pathlib import Path
import pandas as pd
from sqlalchemy import create_engine

# 1. Dynamically target user's documents folder path
folder = Path.home() / "Documents" / "wolfPredation"
db_file_path = folder / "wolfCleaned.db"

# 2. Format the path for SQLite connection string
# SQLite requires 3 slashes total after 'sqlite:' for an absolute path
db_url = f"sqlite:///{db_file_path.as_posix()}"

# 3. Read the Excel data, data type preserved for fips code with leading zero
excel_file = "wolfCleaned.xlsx"
df = pd.read_excel(excel_file, sheet_name="Sheet 1", dtype={"FIPS_Code": str})

# 4. Clean column names
df.columns = [str(col).strip().replace(' ', '_').lower() for col in df.columns]

# 5. Pad it to 5 for full state+county FIPS
df['fips_code'] = df['fips_code'].str.zfill(5)

# 6. Create engine and push dataframe to SQL
engine = create_engine(db_url)

# 7.  if_exists options: 'fail', 'replace' (drops old table & recreates), or 'append'
df.to_sql(name="my_table", con=engine, if_exists="replace", index=False)

# 8. Confirmation
print(f"Data successfully saved to SQLite database file at: {db_file_path}")