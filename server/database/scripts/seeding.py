import pandas as pd
from prisma import Prisma
import asyncio

CSV_PATH = 'yeah_man.csv'
BATCH_SIZE = 500

def normalize_value(value):
    
    # For you goobers, pandas generates a NaN for missing values and Prisma wants None
    if pd.isna(value):
        return None
    
    # Convert any numby scalars to python standard types
    if hasattr(value, "item"):
        return value.item()
    
    return value\

def row_to_dict(row):


df = pd.read_csv(CSV_PATH)
data_to_insert = df.to_dict(orient='records')

print("Hello, World!") 
