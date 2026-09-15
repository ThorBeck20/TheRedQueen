from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    FRED_API_KEY: str
    POLYMARKET_API_KEY: str
    POLYMARKET_KEY_ID: str

    class Config:
        env_file = ".env"


# instantiate settings for import
settings = Settings()
