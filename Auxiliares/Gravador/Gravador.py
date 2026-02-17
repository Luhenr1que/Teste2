import whisper
import os
import uuid
import requests
from fastapi import FastAPI, HTTPException, BackgroundTasks, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl, AnyUrl
from typing import Optional, Union, Dict, Any
import tempfile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import subprocess
import json

# Configuração da aplicação
app = FastAPI(
    title="API de Transcrição de Áudio",
    description="API para transcrever áudio de arquivos de áudio",
    version="1.0.0"
)

# ✅ CONFIGURAÇÃO CORS CORRETA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Modelos de dados
class TranscriptionRequest(BaseModel):
    video_url: Union[AnyUrl, str]
    language: Optional[str] = "pt"


class TranscriptionResponse(BaseModel):
    id: str
    status: str
    video_url: str
    transcription: Optional[str] = None
    transcription_json: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


# Armazenamento em memória
transcriptions = {}


# Função para verificar se o FFmpeg está instalado e acessível
def check_ffmpeg():
    try:
        result = subprocess.run(['ffmpeg', '-version'], capture_output=True, text=True)
        return result.returncode == 0
    except:
        return False


# Função para extrair áudio de arquivos de áudio
def extract_audio(input_path, audio_path):
    try:
        print(f"🎵 Processando áudio: {os.path.basename(input_path)}...")

        # Verificar a extensão do arquivo
        file_ext = os.path.splitext(input_path)[1].lower()

        # Se já for um formato de áudio suportado pelo Whisper, use diretamente
        supported_audio_formats = ['.wav', '.mp3', '.m4a', '.flac', '.aac']

        if file_ext in supported_audio_formats:
            print(f"✅ Arquivo já está em formato compatível: {file_ext}")
            # Simplesmente copiar o arquivo se já for um formato suportado
            shutil.copy2(input_path, audio_path)
            return True
        else:
            # Converter para WAV usando ffmpeg via subprocess
            print(f"🔄 Convertendo {file_ext} para WAV...")

            cmd = [
                'ffmpeg', '-i', input_path,
                '-ac', '1',  # Canal mono
                '-ar', '16000',  # Sample rate 16kHz
                '-acodec', 'pcm_s16le',  # Codec PCM
                '-y',  # Sobrescrever arquivo existente
                audio_path
            ]

            print(f"🔧 Executando: {' '.join(cmd)}")

            result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

            if result.returncode == 0:
                if os.path.exists(audio_path) and os.path.getsize(audio_path) > 0:
                    print(f"✅ Conversão concluída: {audio_path}")
                    return True
                else:
                    print("❌ Arquivo de saída vazio ou não criado")
                    return False
            else:
                print(f"❌ Erro no ffmpeg: {result.stderr}")
                return False

    except FileNotFoundError:
        print("❌ FFmpeg não está instalado. Instale: https://ffmpeg.org/download.html")
        return False
    except Exception as e:
        print(f"❌ Erro no processamento de áudio: {str(e)}")
        return False


# ✅ FUNÇÃO TRANSCRIBE_AUDIO CORRIGIDA
def transcribe_audio(audio_path, language="none"):
    try:
        # Verificar se o arquivo de áudio existe
        if not os.path.exists(audio_path):
            print(f"❌ Arquivo não existe: {audio_path}")
            return None, None

        file_size = os.path.getsize(audio_path)
        if file_size == 0:
            print("❌ Arquivo de áudio vazio")
            return None, None

        print(f"✅ Arquivo válido: {audio_path} ({file_size} bytes)")

        # Verificar se o FFmpeg está disponível para o Whisper
        if not check_ffmpeg():
            print("❌ AVISO: FFmpeg não está disponível. O Whisper pode ter problemas para carregar áudio.")

        # Carregar o modelo Whisper
        print("🔧 Carregando modelo Whisper...")
        model = whisper.load_model("base")  # Use base para ser mais rápido
        print("✅ Modelo Whisper carregado")

        # Verificar novamente se o arquivo existe antes de transcrever
        if not os.path.exists(audio_path):
            print("❌ Arquivo foi deletado durante o processamento!")
            return None, None

        # Fazer a transcrição com tratamento de erro específico
        print("🎤 Transcrevendo áudio...")
        try:
            result = model.transcribe(
                audio_path,
                language=language,
                fp16=False,
                verbose=True
            )
        except Exception as transcribe_error:
            print(f"❌ Erro específico na transcrição: {transcribe_error}")
            # Tentar método alternativo se o FFmpeg falhar
            return transcribe_without_ffmpeg(audio_path, language)

        # Texto simples para exibição
        transcription_text = result["text"]

        print(f"✅ Transcrição concluída: {len(transcription_text)} caracteres")
        return transcription_text, result

    except Exception as e:
        print(f"❌ Erro na transcrição: {str(e)}")
        import traceback
        traceback.print_exc()
        return None, None


# Método alternativo de transcrição sem depender do FFmpeg interno do Whisper
def transcribe_without_ffmpeg(audio_path, language="pt"):
    try:
        print("🔄 Tentando transcrição alternativa (sem FFmpeg interno)...")

        # Primeiro converter para WAV usando ffmpeg externo
        temp_dir = tempfile.gettempdir()
        converted_audio_path = os.path.join(temp_dir, f"converted_{uuid.uuid4()}.wav")

        # Converter para formato que o Whisper possa ler diretamente
        cmd = [
            'ffmpeg', '-i', audio_path,
            '-ac', '1',
            '-ar', '16000',
            '-acodec', 'pcm_s16le',
            '-y',
            converted_audio_path
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

        if result.returncode != 0 or not os.path.exists(converted_audio_path):
            print("❌ Falha na conversão alternativa")
            return None, None

        # Agora tentar transcrever o arquivo convertido
        model = whisper.load_model("base")
        result = model.transcribe(
            converted_audio_path,
            language=language,
            fp16=False,
            verbose=True
        )

        # Limpar arquivo temporário
        try:
            os.remove(converted_audio_path)
        except:
            pass

        return result["text"], result

    except Exception as e:
        print(f"❌ Erro na transcrição alternativa: {e}")
        return None, None


# Função para processar arquivo enviado
def process_transcription_from_file(task_id: str, video_path: str, language: str):
    try:
        transcriptions[task_id]["status"] = "processing"
        print(f"📥 Iniciando processamento de arquivo para task {task_id}")

        # Não use TemporaryDirectory para evitar deleção prematura
        temp_dir = tempfile.gettempdir()
        audio_path = os.path.join(temp_dir, f"audio_{task_id}.wav")

        # Verificar se o arquivo existe
        if not os.path.exists(video_path) or os.path.getsize(video_path) == 0:
            raise Exception("Arquivo está vazio ou corrompido")

        # Extrair áudio
        transcriptions[task_id]["status"] = "extracting_audio"
        if not extract_audio(video_path, audio_path):
            raise Exception("Falha ao processar o arquivo de áudio")

        if not os.path.exists(audio_path) or os.path.getsize(audio_path) == 0:
            raise Exception("Áudio processado está vazio ou corrompido")

        # Transcrever áudio
        transcriptions[task_id]["status"] = "transcribing"
        transcription_text, transcription_json = transcribe_audio(audio_path, language)

        if transcription_text and transcription_json:
            transcriptions[task_id]["status"] = "completed"
            transcriptions[task_id]["transcription"] = transcription_text
            transcriptions[task_id]["transcription_json"] = transcription_json

            # ✅ MOSTRAR TRANSCRIÇÃO NO CMD
            print("\n" + "=" * 80)
            print("🎉 TRANSCRIÇÃO CONCLUÍDA!")
            print("=" * 80)
            print(f"📋 ID: {task_id}")
            print(f"🔗 Arquivo: {os.path.basename(video_path)}")
            print(f"📝 Texto transcrito ({len(transcription_text)} caracteres):")
            print("-" * 80)
            print(transcription_text)
            print("=" * 80 + "\n")

        else:
            raise Exception("Falha na transcrição do áudio")

        # Limpar arquivos temporários após conclusão
        try:
            if os.path.exists(audio_path):
                os.remove(audio_path)
                print(f"🧹 Arquivo temporário removido: {audio_path}")
        except:
            pass

    except Exception as e:
        error_msg = str(e)
        transcriptions[task_id]["status"] = "error"
        transcriptions[task_id]["error"] = error_msg
        print(f"❌ Erro no processamento de arquivo: {error_msg}")
        import traceback
        traceback.print_exc()


# Rotas da API
@app.post("/transcribe/file", response_model=TranscriptionResponse, status_code=202)
async def create_transcription_from_file(
        file: UploadFile = File(...),
        language: Optional[str] = "pt",
        background_tasks: BackgroundTasks = BackgroundTasks()
):
    task_id = str(uuid.uuid4())

    # Salvar arquivo temporariamente
    temp_dir = tempfile.gettempdir()
    original_filename = file.filename or "audio_file"
    video_path = os.path.join(temp_dir, f"file_{task_id}_{original_filename}")

    try:
        content = await file.read()
        with open(video_path, "wb") as buffer:
            buffer.write(content)

        print(f"✅ Arquivo salvo temporariamente: {video_path}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao salvar arquivo: {str(e)}")

    transcriptions[task_id] = {
        "status": "processing",
        "video_url": f"file://{video_path}",
        "transcription": None,
        "transcription_json": None,
        "error": None
    }

    background_tasks.add_task(
        process_transcription_from_file,
        task_id,
        video_path,
        language
    )

    return JSONResponse(
        status_code=202,
        content={
            "id": task_id,
            "status": "processing",
            "video_url": f"file://{video_path}",
            "message": "Transcrição em processamento. Use o endpoint /transcription/{id} para verificar o status."
        }
    )


@app.get("/transcription/{task_id}", response_model=TranscriptionResponse)
async def get_transcription(task_id: str):
    if task_id not in transcriptions:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    response_data = transcriptions[task_id].copy()
    response_data['id'] = task_id

    return response_data


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "video-transcription-api"}


@app.get("/transcriptions")
async def list_transcriptions():
    result = {}
    for task_id, data in transcriptions.items():
        result[task_id] = data.copy()
        result[task_id]['id'] = task_id
    return result


@app.delete("/transcriptions")
async def clear_transcriptions():
    global transcriptions
    old_count = len(transcriptions)
    transcriptions = {}
    return {"message": f"Limpo {old_count} transcrições"}


if __name__ == "__main__":
    import uvicorn

    # Verificar se o FFmpeg está instalado
    if not check_ffmpeg():
        print("⚠️  AVISO: FFmpeg não está instalado ou não está no PATH")
        print("📥 Instale em: https://ffmpeg.org/download.html")
        print("💡 Adicione ao PATH do sistema para melhor funcionamento")

    print("🚀 Iniciando servidor de transcrição de áudio...")
    print("📡 API disponível em: http://0.0.0.0:8001")
    print("🎵 Suporta: WAV, MP3, M4A, FLAC, AAC")
    print("⏳ As transcrições serão exibidas automaticamente aqui quando prontas!\n")
    uvicorn.run(app, host="0.0.0.0", port=8001)