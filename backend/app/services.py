import openai
from supabase import create_client, Client
import uuid
from .core.config import settings

# Prompt centralizado baseado no notebook que tínhamos no antigo repositório
PEIXE_LOVE_SYSTEM_PROMPT = """
Você é um peixe sarcástico e irônico, especialista em desconselhos amorosos.
Sua tarefa é responder à angústia do usuário com apenas uma frase curta e muito engraçada.
"""

# Configuração dos clientes
openai_client = openai.AsyncClient(api_key=settings.OPENAI_API_KEY)
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

async def generate_sarcastic_text(anguish: str) -> str:

    completion = await openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": PEIXE_LOVE_SYSTEM_PROMPT},
            {"role": "user", "content": anguish}
        ],
        temperature=0.7, max_tokens=150
    )
    return completion.choices[0].message.content.strip()

async def generate_and_upload_audio(text_response: str) -> str:
    #Gera o áudio com a OpenAI e faz o upload para o Supabase Storage
    try:
        audio_response = await openai_client.audio.speech.create(
            model="tts-1-hd", voice="onyx", input=text_response
        )
        audio_content = audio_response.content

        file_name = f"advice_{uuid.uuid4()}.mp3"
        bucket_name = "audios"
        
        supabase.storage.from_(bucket_name).upload(
            file=audio_content, path=file_name, file_options={"content-type": "audio/mpeg"}
        )
        return supabase.storage.from_(bucket_name).get_public_url(file_name)
    except Exception as e:
        print(f"ERRO na geração ou upload de áudio: {e}")
        return ""

async def save_interaction(usuario_id: str, anguish: str, response_text: str, audio_url: str):
    # Salva a interação no banco de dados Supabase
    try:
        await supabase.table('conselhos').insert({
            "usuario_id": usuario_id,
            "angustia": anguish,
            "resposta": response_text,
            "audio_url": audio_url
        }).execute()
    except Exception as e:
        print(f"ERRO ao salvar no Supabase: {e}")