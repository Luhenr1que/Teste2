@php
    $status = request()->query('status');
@endphp

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AquaDev</title>
    <link rel="stylesheet" href="{{ asset('css/home.css')}}">
    <link rel="stylesheet" href="{{ asset('css/fontes.css')}}">
    <link href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Cabin:ital,wght@0,400..700;1,400..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="icon" href="{{ asset('img/AquaDev_Axolote.png') }}">
    <script src="https://unpkg.com/scrollreveal"></script>
</head>
<body>
        <div class="containerModal">
            <div class="blockModal">
                <span></span>
            </div>
        </div>

    <div class="bgAnimation" id="bgAnimation">
        <div class="backgrounAmim">

        </div>
    </div>
    <div id="container" class="light">
        <header id="navBar" class="light">

            <img src="{{ asset('img/AquaDev_Menor.png') }}" id="logoImg">

            <div id="textA">
                <a class="navText light"  href="#back">Inicio</a>
                <a class="navText light" href="#sobreNos">Sobre nós</a>
                <a class="navText light" href="#projetos">Projetos</a>
                <a class="navText light" href="#contatos">Contato</a>
                <a class="navText light" href="#equipe">Equipe</a>
            </div>

            <div class="trilho" id="trilho">
                <div class="indicador" id="indicador">
                    <img src="{{ asset('img/sun.png') }}" id="temaImg">
                </div>
            </div>
        </header>
        <section id="back" >    
            <div class="txt" id="frase">
                <span class="text"></span><span class="cursor"></span>
            </div>
                <div class="onda" id="onda1"></div>
                <div class="onda" id="onda2"></div>
                <div class="onda" id="onda3"></div>
                <div class="onda" id="onda4"></div>
        </section>
<div id="sobreNos"></div>
        <div class="linguagem">
            <div class="linguagemTxt">
                SOBRE <p>NÓS</p>                
            </div>  
        </div>
    
        <div class="sobreNos">
            <div class="wrapper">
                <div id="scrollable" class="slider">
                    <div class="list">
                        <div class="item" style="--position: 1">
                        <div class="cardNos one">
                            <p>Fundada em fevereiro de 2025, a AquaDev nasceu com o propósito de inovar na área de tecnologia.</p>
                            <div class="linhaNos"></div>
                            <img src="{{ asset('img/AquaDev_Menor2.png') }}">
                        </div>
                        </div>
                        <div class="item" style="--position: 2">
                        <div class="cardNos one">
                            <img src="{{ asset('img/nos.png') }}">
                            <div class="linhaNos"></div>
                            <p>Nossa equipe é formada por profissionais dedicados e apaixonados pelo desenvolvimento de sistemas.</p>
                        </div>
                        </div>
                        <div class="item" style="--position: 3">
                        <div class="cardNos">
                            Desenvolvemos soluções para empresas de pequeno e médio porte, focando em qualidade e eficiência.
                        </div>
                        </div>
                        <div class="item" style="--position: 4">
                        <div class="cardNos">
                            Utilizamos tecnologias modernas e inovadoras para garantir o melhor resultado para nossos clientes.
                        </div>
                        </div>
                        <div class="item" style="--position: 5">
                        <div class="cardNos">
                            <p>Nosso símbolo, o Axolote, representa nossa capacidade de adaptação e evolução constante.</p>
                            <div class="linhaNos"></div>
                            <img src="{{ asset('img/AquaDev_Axolote.png') }}">
                        </div>
                        </div>
                        <div class="item" style="--position: 6">
                        <div class="cardNos">
                            <h1>Fluindo para o Futuro</h1>
                            <div class="linhaNos"></div>
                            <p>Com o slogan “Fluindo para o Futuro”, buscamos sempre crescer e avançar no mercado tecnológico.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <section class="linguagem">
            <div class="linguagemTxt">
                NOSSAS <p>ESPECIALIDADES</p>                
            </div>
            <div class="linguagemContainer">
                <div class="linguagemImg">
                    <img src="{{ asset('img/logos/html.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/css-logo.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/javaScript.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/php.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/laravel.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/node.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/react.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/java.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/sql.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/mysql.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/git.png') }}" alt="" class="ling">
                    <img src="{{ asset('img/logos/github.png') }}" alt="" class="ling">              
                </div>
            </div>
        </section>

        <div id="projetos"></div>

        <div class="linguagem">
            <div class="linguagemTxt">
                NOSSOS <p>PROJETOS</p>                
            </div>  
        </div>

        <section class="slider">

                <input type="radio" name="radioBtn" id="btn1" class="radioBotton">
                <input type="radio" name="radioBtn" id="btn2" class="radioBotton">
                <input type="radio" name="radioBtn" id="btn3" class="radioBotton">
                <input type="radio" name="radioBtn" id="btn4" class="radioBotton">
            <div class="slides">



                
                <div class="projetos first imiManu">
                    <img src="{{ asset('img/mao.png') }}" alt="" class="mao imiManu">
                    <div class="logoTxt imiManu">
                        <img src="{{ asset('img/O_Manual_do_Imigrante.png') }}" class="icon imiManu" alt="">
                        <h1 class="textoLo">
                            Manual do Imigrante é um app que oferece informações rápidas e diretas para ajudar imigrantes recém-chegados ao Brasil, com dicas sobre documentos, saúde, trabalho e direitos.
                        </h1>      
                    </div>
                </div>
                <div class="projetos bankProject">
                    <div class="logoTxt bank">
                        <img src="./img/BankApp.png" class="icon bank" alt="">
                        <h1 class="textoLo">
                            FinanCheck é um app para controle de dívidas, onde você registra ganhos e perdas para acompanhar suas finanças de forma simples e clara.
                        </h1>      
                    </div>
                    <img src="{{ asset('img/mao1.png') }}" alt="" class="mao bank">
                </div>
                <div class="projetos stageProject">
                    <div class="logoTxt stage">
                        <img src="{{ asset('img/EventosLogo.png') }}" class="icon stage" alt="">
                        <h1 class="textoLo">
                            StagesOne é um site que ajuda a encontrar eventos em todo o Brasil, reunindo shows, festivais e atrações culturais em um só lugar.
                        </h1>
                    </div>
                    <img src="{{ asset('img/stage.png') }}" alt="" class="mao stage">
                </div>
                <div class="projetos zooProject">
                    <img src="{{ asset('img/zoo.png') }}" alt="" class="mao zoo">
                    <div class="logoTxt zoo">
                        <img src="{{ asset('img/icon.png') }}" class="icon zoo" alt="">
                        <h1 class="textoLo">
                            ZooKids é um app educativo que apresenta animais para crianças de forma divertida, com sons, imagens e curiosidades.
                        </h1>      
                    </div>
                </div>

                <div class="autoNavigation">
                    <div class="autoBtn1"></div>
                    <div class="autoBtn2"></div>
                    <div class="autoBtn3"></div>
                    <div class="autoBtn4"></div>
                </div>

            </div>

            <div for="btn" class="manualNavigation">
                <label for="btn1" class="btnManual"></label>
                <label for="btn2" class="btnManual"></label>
                <label for="btn3"class="btnManual"></label>
                <label for="btn4" class="btnManual"></label>
            </div>
        </section>

        <div class="linguagem">
            <div class="linguagemTxt">
                ENTRE EM<p>CONTATO</p>             
            </div>
            <div id="contatos"></div>     
        </div>
        <section class="contato">
        
            <div class="form">
                <div class="form-container">
                    <form class="formulario" action="{{ url('/enviar') }}" method="post">
                        @csrf

                        <h1>Envie sua mensagem</h1>

                        <div class="input-single">
                            <input type="text" name="nome" id="nome" class="input" required>
                            <label for="nome">Seu nome completo</label>
                        </div>

                        <div class="input-single">
                            <input type="email" name="email" id="email" class="input" required>
                            <label for="email">E-mail para contato</label>
                        </div>
                        <div class="input-select">
                            <label>Motivo do seu contato:</label>
                            <select id="opcoes" name="opcoes">
                                <option value="proposta">Proposta</option>
                                <option value="duvida">Duvida</option>
                                <option value="sugestao">Sugestão</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>


                        <div class="input-single AreaT">
                            <textarea name="desc" id="desc" class="input textArea" rows="2"  required></textarea>
                            <label for="desc">Escreva sua mensagem</label>
                        </div>

                        <div class="btn-cont">
                            <input type="submit" value="Enviar">
                        </div>
                    </form>                 
                </div>
                <div class="imgCont">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1307.7146691802257!2d-42.72024681188816!3d-10.832977352157684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x76593007843c721%3A0xb8349ecda37f882a!2sXique%20xique%20bahia!5e0!3m2!1spt-BR!2sbr!4v1754969088185!5m2!1spt-BR!2sbr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
<div id="equipe"></div>
        <div class="linguagem">
            <div class="linguagemTxt">
            
                NOSSA<p>EQUIPE </p>E<p>PARCEIROS</p>              
            </div>  
        </div>
        
        
        <section class="carousel-container">
            <button class="prev">&#10094;</button>

            <div class="carousel-track">
                <div class="carousel-item">
                    <div class="card">
                        <img src="{{ asset('img/Fotos/Luis.jpg') }}" alt="">
                        <span class="nome">Luis Henrique</span>
                        <div class="iconRedes">
                            <a href="https://github.com/Luhenr1que" target="blank">
                                <img src="{{ asset('img/github.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/instagram.png') }}" alt="">
                            </a>
                            <a href="https://linkedin.com/in/luis-henrique-araujo-714a9631b" target="blank">
                                <img src="{{ asset('img/linkedin.png') }}" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img src="{{ asset('img/Fotos/Jhonny.jpg') }}" alt="">  
                        <span class="nome">Jhonny Souza</span>  
                        <div class="iconRedes">
                            <a href="" target="blank">
                                <img src="{{ asset('img/github.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/instagram.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/linkedin.png') }}" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img src="{{ asset('img/Fotos/Eduardo.jpg') }}" alt="">    
                        <span class="nome">Eduardo Tadashi</span>  
                        <div class="iconRedes">
                            <a href="" target="blank">
                                <img src="{{ asset('img/github.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/instagram.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/linkedin.png') }}" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img src="{{ asset('img/Fotos/Fabiano.jpg') }}" alt="">   
                        <span class="nome">Fabiano Ferreira</span>   
                        <div class="iconRedes">
                            <a href="" target="blank">
                                <img src="{{ asset('img/github.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/instagram.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/linkedin.png') }}" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img src="{{ asset('img/Fotos/geovana.jpg') }}" alt="">   
                        <span class="nome">Geovanna Gregório</span>   
                        <div class="iconRedes">
                            <a href="" target="blank">
                                <img src="{{ asset('img/github.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/instagram.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/linkedin.png') }}" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img src="{{ asset('img/Fotos/Ricardo.jpg') }}" alt="">   
                        <span class="nome">Ricardo Faustino</span> 
                        <div class="iconRedes">
                            <a href="" target="blank">
                                <img src="{{ asset('img/github.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/instagram.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/linkedin.png') }}" alt="">
                            </a>
                        </div>                      
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img src="{{ asset('img/Fotos/Henrique.jpg') }}" alt=""> 
                        <span class="nome">Henrique Salles</span>  
                        <div class="iconRedes">
                            <a href="" target="blank">
                                <img src="{{ asset('img/github.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/instagram.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/linkedin.png') }}" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="card">
                        <img src="{{ asset('img/Fotos/Alexsander.jpg') }}" alt="">    
                        <span class="nome">Alexander Gabriel</span>   
                        <div class="iconRedes">
                            <a href="" target="blank">
                                <img src="{{ asset('img/github.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/instagram.png') }}" alt="">
                            </a>
                            <a href="" target="blank">
                                <img src="{{ asset('img/linkedin.png') }}" alt="">
                            </a>
                        </div>               
                    </div>
                </div>
            </div>

            <button class="next">&#10095;</button>
        </section>


        <section class="parceiros">
            <img src="{{ asset('img/norvenP.png') }}" alt="" class="logos">
            <img src="{{ asset('img/wisys.png') }}" alt="" class="logos">
        </section>

        <footer class="footer">

            <div class="logoFooter">
                <h1>AquaDev</h1>
                <p>Transformando ideias em soluções digitais com inovação e qualidade.</p>
            </div>
            <div class="linkFooter">
                <h1>Home</h1>
                <a class="fotText light" href="#back">Inicio</a>
                <a class="fotText light" href="#sobreNos">Sobre nós</a>
                <a class="fotText light" href="#projetos">Projetos</a>
                <a class="fotText light" href="#contatos">Contato</a>
            </div>
                <h2>Nossas midias</h2>
            <div class="redes">
                
                <a href=""><img src="{{ asset('img/github.png') }}" alt=""></a>
                <a href=""><img src="{{ asset('img/instagram.png') }}" alt=""></a>
                <a href=""><img src="{{ asset('img/linkedin.png') }}" alt=""></a>
            </div>
            <div id="footImg"><img src="{{ asset('img/AquaDev_Menor.png') }}" alt=""></div>
            <p>© 2025 AquaDev. Todos os direitos reservados.</p>
        </footer>
    </div>

    <script src="https://unpkg.com/scrollreveal"></script>
    <script defer src="{{asset('js/home.js')}}"></script>
    <script defer src="{{asset('js/css.js')}}"></script>
    <script defer src="{{asset('js/revelar.js')}}"></script>
    <script defer src="{{asset('js/back.js')}}"></script>
    <script>
        window.connBack1 = "{{ asset('img/connBack1.png') }}";
        window.contimg2 = "{{ asset('img/contimg2.jpg') }}";
    </script>
</body>
</html>