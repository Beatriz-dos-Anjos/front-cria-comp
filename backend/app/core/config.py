from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="../.env", env_file_encoding="utf-8")
    GEMINI_API_KEY: str
    OPENAI_API_KEY: str
    SUPABASE_URL: str
    SUPABASE_KEY: str
    AI_MODE: Literal["openai_only, openai_gemini"]

settings = Settings()