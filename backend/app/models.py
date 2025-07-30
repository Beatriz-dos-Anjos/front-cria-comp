from pydantic import BaseModel, HttpUrl

class AdviceRequest(BaseModel):
    usuario_id: str
    angustia: str

class AdviceResponse(BaseModel):
    resposta: id
    audio_URL: HttpUrl