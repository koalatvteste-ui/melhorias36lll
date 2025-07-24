# Estrutura de Arquivos - Nossos 36 Capítulos

## Organização das Pastas

Esta pasta contém todas as imagens e vídeos do projeto, organizados por capítulos para facilitar a manutenção e adição de novos conteúdos.

### Estrutura:
```
public/
├── capitulo1/
│   ├── principal/          # Imagens principais dos cards
│   └── galeria/           # Imagens e vídeos adicionais para o modal
├── capitulo2/
│   ├── principal/
│   └── galeria/
├── capitulo3/
│   ├── principal/
│   └── galeria/
└── capitulo4/
    ├── principal/
    └── galeria/
```

## Convenção de Nomenclatura

### Imagens Principais (pasta principal/):
- `memoria01.jpg` - Primeira memória do capítulo
- `memoria02.jpg` - Segunda memória do capítulo
- `memoria03.jpg` - Terceira memória do capítulo
- etc.

### Galeria (pasta galeria/):
- `memoria01_01.jpg` - Primeira imagem adicional da primeira memória
- `memoria01_02.jpg` - Segunda imagem adicional da primeira memória
- `memoria01_video.mp4` - Vídeo da primeira memória
- `memoria02_01.jpg` - Primeira imagem adicional da segunda memória
- etc.

## Formatos Suportados

### Imagens:
- JPG/JPEG
- PNG
- WebP

### Vídeos:
- MP4 (recomendado)
- WebM
- MOV

## Como Adicionar Novo Conteúdo

1. Faça upload da imagem principal na pasta `capitulo[X]/principal/`
2. Adicione imagens e vídeos extras na pasta `capitulo[X]/galeria/`
3. Siga a convenção de nomenclatura
4. O sistema detectará automaticamente os novos arquivos

## Exemplo Prático

Para adicionar conteúdo à terceira memória do primeiro capítulo:

1. Upload `memoria03.jpg` em `public/capitulo1/principal/`
2. Upload `memoria03_01.jpg`, `memoria03_02.jpg` em `public/capitulo1/galeria/`
3. Upload `memoria03_video.mp4` em `public/capitulo1/galeria/`

O sistema automaticamente:
- Usará `memoria03.jpg` como imagem do card
- Criará galeria com as imagens e vídeo adicionais no modal