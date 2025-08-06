"use client";

import { Client } from "@gradio/client";

// Função auxiliar para salvar o arquivo (funciona no navegador)
async function saveVideo(videoUrl, fileName) {
    try {
        console.log("Baixando o vídeo gerado...");
        const videoResponse = await fetch(videoUrl);
        const videoBlob = await videoResponse.blob();

        // Cria um link temporário para o download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(videoBlob);
        link.download = fileName;

        // Adiciona, clica e remove o link para iniciar o download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`Download de '${fileName}' iniciado.`);
    } catch (error) {
        console.error("Erro ao salvar o vídeo:", error);
    }
}


async function generateAvatar(image, audio) {
    try {
        console.log("Conectando à API do OmniAvatar...");
        const client = await Client.connect("jbilcke-hf/OmniAvatar");

        // 1. Carregue seus arquivos de imagem e áudio.
        // Substitua as URLs pelos links dos seus arquivos.
        // Em um app real, isso viria de um <input type="file">.
        const imageUrl = image; // URL da sua imagem do peixe
        const audioUrl = audio; // URL do seu áudio

        console.log("Buscando arquivos de mídia...");
        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();

        const audioResponse = await fetch(audioUrl);
        const audioBlob = await audioResponse.blob();

        const seedDoNavegador = 74287230;

        console.log("Enviando requisição com parâmetros de alta qualidade...");
        const result = await client.predict("/generate_avatar_video", {
            // Arquivos de entrada como Blobs
            reference_image: imageBlob,
            audio_file: audioBlob,

            // --- PARÂMETROS EXATOS DA SUA VERSÃO PYTHON ---
            seed: seedDoNavegador,
            use_random_seed: false,
            guidance_scale: 4.5,
            num_steps: 15,
            overlap_frames: 13,
            audio_scale: 3,
            fps: 25,
            silence_duration: 0.3,
            resolution: "480p",
        });

        console.log("Resultado bruto da API:", result.data);

        // 2. Extrair a URL do vídeo do resultado
        // A estrutura em JS é `result.data[0]`, que contém o objeto de saída.
        const videoOutput = result.data[0];
        const videoUrl = videoOutput.video.url; // A URL do vídeo está aninhada aqui

        console.log(`Vídeo gerado com sucesso! URL: ${videoUrl}`);

        // 3. Salvar o vídeo
        const nomeDoArquivoFinal = `video_replicado_seed_${seedDoNavegador}.mp4`;
        await saveVideo(videoUrl, nomeDoArquivoFinal);

    } catch (error) {
        console.error("Ocorreu um erro no processo:", error);
    }
}

export default generateAvatar;