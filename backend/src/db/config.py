import oracledb
import os
from pathlib import Path
from dotenv import load_dotenv

current_dir = Path(__file__).parent.parent
wallet_dir = current_dir / "Wallet_SistemasdePruebas"

os.environ["TNS_ADMIN"] = str(wallet_dir)

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DSN = os.getenv("DB_DSN")

pool = oracledb.create_pool(
    user=DB_USER,
    password=DB_PASSWORD,
    dsn=DB_DSN,
    min=1,
    max=5,
    increment=1,
    ssl_server_dn_match=True,
    wallet_location=str(wallet_dir),
    wallet_password="PruebasSistemas20",
    config_dir=str(wallet_dir)
)

def get_connection():
    return pool.acquire()
