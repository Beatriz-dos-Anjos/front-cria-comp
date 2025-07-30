from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import services, models

app = FastAPI(title="Peixe-Love API")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True,
    allow_methods=["POST"], allow_headers=["*"],
)

@app.post("/advice", response_model=models.AdviceResponse, tags=["Advice"])
async def get_sarcastic_advice(request: models.AdviceRequest):
    # Orquestra o fluxo: texto -> áudio -> banco de dados -> resposta
    if not request.angustia.strip():
        raise HTTPException(status_code=400, detail="A angústia não pode ser vazia.")
    try:
        response_text = await services.generate_sarcastic_text(request.angustia)
        audio_url = await services.generate_and_upload_audio(response_text)
        
        if not audio_url:
            raise HTTPException(status_code=500, detail="Falha ao processar o áudio.")
        
        await services.save_interaction(
            usuario_id=request.usuario_id, anguish=request.angustia,
            response_text=response_text, audio_url=audio_url
        )
        return models.AdviceResponse(resposta=response_text, audio_url=audio_url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"O Peixe-Love entrou em pane: {e}")