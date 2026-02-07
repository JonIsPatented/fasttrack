import dataclasses
import sqlite3
from dataclassesfield,  impotr dataclasses, field
from typing import Callable, Dict, List, Optional

import pandas as pd

TransformFunction = Callable[[pd.DataFrame], pd.DataFrame]

class TableImportSpec:
    table: str 
    csv_path: str
    autoinc_pk: Optional[str] = None # Drop the column if the table has an auto incrementing primary key 
    rename: [str, str] = field(default_factory=dict) # rename the csv_col to match the table_col if needed
    required_cols: [str] = field(default_factory=list) 
    transform: [TransformFunction] = field(default_factory=list)

def normalize_df_nulls(df: pd.DataFrame) -> pd.DataFrame:
    return df.where(pd.notna(df), None)

def df_to_records(df: pd.DataFrame) -> pd.DataFrame:
    records: List[Dict[str, Any]] = []
    for _, row in
