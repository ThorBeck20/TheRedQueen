from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    FRED_API_KEY: str

    class Config:
        env_file = ".env"


# instantiate settings for import
settings = Settings()
