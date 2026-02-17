   @if ($noticias->count() > 0)
   @foreach ($noticias as $noticia)
   <div class="card-noticia">
       <div class="card-noticia-header">
           <input class="filtro-checkbx card-noticia-radio" type="checkbox" name="noticiaSelecionadas[]" value="{{ $noticia->idNoticia }}">
           <div class="card-noticia-status">
               @if ($noticia->StatusNoticia == 'ativa')
               <label class="filtro-label verde-noticia" style="text-transform: capitalize;">{{ $noticia->StatusNoticia }}</label>
               @elseif($noticia->StatusNoticia == 'negado')
               <label class="filtro-label red2-noticia" style="text-transform: capitalize;">{{ $noticia->StatusNoticia }}</label>
               @else
               <label class="filtro-label cinza-noticia" style="text-transform: capitalize;">{{ $noticia->StatusNoticia }}</label>
               @endif
           </div>
       </div>

       <div class="card-noticia-imagem">
           <div class="wrapper card-noticia-wrapper">
                   @if ($noticia->imgNoticia)
                   @if (Str::startsWith($noticia->imgNoticia, ['http://', 'https://']))
                       {{-- Se for uma URL externa --}}
                       <img class="imagemNoticia card-noticia-img" src="{{ $noticia->imgNoticia }}" alt="{{ $noticia->tituloNoticia[0] }}">
                   @else
                       {{-- Se for uma imagem do storage --}}
                       <img class="imagemNoticia card-noticia-img" src="{{ asset($noticia->imgNoticia) }}" alt="{{ $noticia->tituloNoticia[0] }}">
                   @endif
                   @endif
               <span class="texto-noticia">clique para ver</span>
           </div>
       </div>

       <div class="card-noticia-content">
           <div class="card-noticia-titulo">
               <label class="filtro-label card-noticia-label-titulo">{{ $noticia->tituloNoticia[0] }}</label>
           </div>

           <div class="card-noticia-conteudo">
               <label class="filtro-label">{{ $noticia->conteudoNoticia[0] }}</label>
           </div>

           <div class="card-noticia-link">
               <label class="filtro-label">
                   <a href="{{ $noticia->linkNoticia[0] }}" target="_blank">Link do Site</a>
               </label>
           </div>
       </div>
   </div>
   @endforeach
   @else
   <div style="height: 60vh;" class="card-noticia-vazio">
       <label>Nenhuma noticia cadastrada</label>
   </div>
   @endif