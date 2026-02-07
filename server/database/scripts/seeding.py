import sqlite3
from pathlib import Path

import numpy as np
import pandas as pd

SCRIPT_DIR = Path(__file__).resolve().parent
DATABASE_DIR = SCRIPT_DIR.parent

DB_PATH = DATABASE_DIR / "database.db"
RAWDATA_DIR = SCRIPT_DIR / "rawdata"

def load_csv(path: Path) -> pd.DataFrame:
    # Load a CSV file into a pandas DataFrame
    return pd.read_csv(path)


def fill_blank_json(
    df: pd.DataFrame,
    col: str = "metadata",
    default: str = "{}",
) -> pd.DataFrame:
    # Ensure required JSON columns never contain NULL
    if col in df.columns:
        df[col] = df[col].where(df[col].notna(), default)
        df[col] = df[col].replace("", default)
    return df


def prepare_df(
    df: pd.DataFrame,
    rename: dict[str, str] | None = None,
    drop: list[str] | None = None,
) -> pd.DataFrame:
    # Apply column renames so CSV headers match table columns
    if rename:
        df = df.rename(columns=rename)

    # Drop columns that should not be inserted (like the primary IDs for tables)
    if drop:
        df = df.drop(columns=[c for c in drop if c in df.columns])

    # Fix required JSON fields before inserting
    df = fill_blank_json(df, col="metadata", default="{}")

    # Convert NaN to None so SQLite stores NULLs correctly
    return df.replace({np.nan: None})


def import_csv_to_sqlite(
    table: str,
    csv_path: Path,
    rename: dict[str, str] | None = None,
    drop: list[str] | None = None,
) -> int:
    # Load and normalize the CSV data
    df = load_csv(csv_path)
    df = prepare_df(df, rename=rename, drop=drop)

    if df.empty:
        print(f"{table}: {csv_path} -> 0 rows")
        return 0

    conn = sqlite3.connect(DB_PATH)
    try:
        # Enforce foreign key constraints for this connection
        conn.execute("PRAGMA foreign_keys = ON;")

        before = conn.total_changes

        # Append rows to the existing table
        df.to_sql(
            name=table,
            con=conn,
            if_exists="replace",
            index=False,
            method="multi",
            chunksize=1000,
        )

        after = conn.total_changes
        inserted = after - before
        print(f"{table}: inserted {inserted} rows")
        return inserted

    except Exception as e:
        # Error comment for when I'm an idiot
        print(f"ERROR importing {table} from {csv_path}: {e}")
        return -1

    finally:
        conn.close()


def main() -> None:
    import_csv_to_sqlite("Material", RAWDATA_DIR / "Rollercoaster CSV - Material.csv")
    import_csv_to_sqlite("Park", RAWDATA_DIR / "Rollercoaster CSV - Park.csv")
    import_csv_to_sqlite("Manufacturer", RAWDATA_DIR / "Rollercoaster CSV - Manufacturer.csv")
    import_csv_to_sqlite("Color", RAWDATA_DIR / "Rollercoaster CSV - Color.csv")
    import_csv_to_sqlite("TraitType", RAWDATA_DIR / "Rollercoaster CSV - Trait_Type.csv")

    import_csv_to_sqlite("Coaster", RAWDATA_DIR / "Rollercoaster CSV - Coaster.csv")

    import_csv_to_sqlite(
        "CoasterTrait",
        RAWDATA_DIR / "Rollercoaster CSV - Coaster_Trait.csv",
        rename={"JSON": "metadata"},
        drop=["id", "traid_id"],
    )

    import_csv_to_sqlite("CoasterTrackColor", RAWDATA_DIR / "Rollercoaster CSV - Coaster_TrackColor.csv")
    import_csv_to_sqlite("CoasterSupportColor", RAWDATA_DIR / "Rollercoaster CSV - Coaster_SupportColor.csv")


if __name__ == "__main__":
    main()

