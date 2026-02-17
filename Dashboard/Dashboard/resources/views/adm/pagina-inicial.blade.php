 @extends('templetes.templateAdm')
@section('head')
@php
$admin = Auth::guard('admin')->user();
@endphp
<meta name="csrf-token" content="{{ csrf_token() }}">

<title>Dashboard</title>
<link rel="stylesheet" href="{{asset('assetsAdm/css/dashboard.css')}}">

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>


@endsection

@section('titulo')
Dashboard
@endsection

@section('conteudo')
<div class="container">

    <div class="containerHome">
        <div class="passaport">
            <img class="iconPassaport" src="{{url('img/icon.png')}}" alt="">
        </div>
        <div class="textoBemVindo">
            <label class="label-Mensagem" for="">Bem-vindo, <b>{{ Str::limit($admin->nomeAdm, 40) }}</b> </label>
            <label class="label-Mensagem2" for="">esperamos que tenha uma otima experiencia</label>
        </div>
        <div class="imigrante">
            <img class="fotoImigrante" src="{{url('img/foto1.png')}}" alt="">
            <img class="fotoImigrante2" src="{{url('img/foto2.png')}}" alt="">
        </div>

    </div>

    <!-- KPIs -->
    <div class="status">

        <div class="caixa-info" id="caixa-u">
            <img class="imgIcones" src="{{url('img/conjutoPessoasB.png')}}" alt="">
            <p class="text-caixa">Usuários ativos</p>
            <h1 class="valor-caixa" id="user-valor">{{$usuariosAtivos}}</h1>
        </div>

        <div class="caixa-info" id="caixa-u">
            <img class="segundo" src="{{url('img/inativo.png')}}" alt="">
            <p class="text-caixa">Usuários inativos</p>

            <h1 class="valor-caixa" id="user-valor">{{$usuariosInativos}}</h1>
        </div>

        <!-- <div class="separador">
            <div class="caixa-info" id="caixa-u">
                <p class="text-caixa">Notícias ativas</p>
                <img class="imgIcones" src="{{url('img/icones/news.png')}}" alt="">

                <h1 class="valor-caixa" id="noticia-valor">{{$noticiasAtivas}}</h1>
                <div class="trend up">
                    <span id="percentual-noticia"></span>
                </div>
            </div>

            <div class="caixa-info" id="caixa-u">
                <p class="text-caixa">Notícias em analise</p>
                <img class="imgIcones" src="{{url('img/icones/analise.png')}}" alt="">
                <h1 class="valor-caixa" id="noticia-valor">{{$noticiasAnalise}}</h1>
                <div class="trend up">
                    <span id="percentual-noticia"></span>
                </div>
            </div>
        </div> -->
    </div>

    <!-- Gráfico -->
    <div class="containerGrafico">
        <div class="textGrafico">
            <div class="iconesLegais">
                <img class="iconGrafico B" src="{{url('img/graficoTexto.png')}}" alt="">
                <label class="label-graficoTex" for="">Graficos para análise</label>
            </div>
            <div class="pdf">
                <a class="fundoRuim" href="{{route('PDFdashboard')}}"><img class="B" src="{{ asset('img/download.png') }}" alt=""></a>
            </div>
        </div>

        <div class="graficos-lado-a-lado">

            <div class="chart-container">
                <div id="chart_div" class="grafico"></div>
            </div>


            <div class="chart-container">
                <div id="piechart_card" class="grafico"></div>
            </div>

        </div>


        <div class="chart-container2">
            <div id="columnchart_values" class="grafico"></div>
        </div>

        <div class="container-grafico-mapa">
            <div class="chart-containerMapa">
                <h3 style=" color:black; font-size: 15px; margin:2%;">
                    Mapa Geográfico
                </h3>
                <div id="regions_div" class="grafico2"></div>
            </div>
        </div>
    </div>


</div>

<script type="text/javascript">
    google.charts.load('current', {
        'packages': ['corechart', 'geochart']
    });
    google.charts.setOnLoadCallback(drawAllCharts);

    function drawAllCharts() {
        drawAreaChart();
        drawGeoChart();
        drawPieChart();
        drawColumnChart();
    }

    function getChartOptions() {
        
        const isDarkMode = document.body.classList.contains('tema-escuro');

        if (isDarkMode) {
            return {
                backgroundColor: '#2C3440',
                titleTextStyle: {
                    color: '#E5E7EB'
                },
                legendTextStyle: {
                    color: '#E5E7EB'
                },
                hAxis: {
                    textStyle: {
                        color: '#E5E7EB'
                    },
                    titleTextStyle: {
                        color: '#E5E7EB'
                    },
                    gridlines: {
                        color: '#4B5563'
                    },
                    baselineColor: '#4B5563'
                },
                vAxis: {
                    textStyle: {
                        color: '#E5E7EB'
                    },
                    titleTextStyle: {
                        color: '#E5E7EB'
                    },
                    gridlines: {
                        color: '#4B5563'
                    },
                    baselineColor: '#4B5563'
                },
                chartArea: {
                    backgroundColor: '#2C3440'
                }
            };
        } else {
            return {
                backgroundColor: '#ffffff',
                titleTextStyle: {
                    color: '#333'
                },
                legendTextStyle: {
                    color: '#333'
                },
                hAxis: {
                    textStyle: {
                        color: '#555'
                    },
                    titleTextStyle: {
                        color: '#333'
                    },
                    gridlines: {
                        color: '#e0e0e0'
                    },
                    baselineColor: '#ccc'
                },
                vAxis: {
                    textStyle: {
                        color: '#555'
                    },
                    titleTextStyle: {
                        color: '#333'
                    },
                    gridlines: {
                        color: '#e0e0e0'
                    },
                    baselineColor: '#ccc'
                },
                chartArea: {
                    backgroundColor: 'transparent'
                }
            };
        }
    }

    function drawAreaChart() {
        var data = google.visualization.arrayToDataTable(@json($chartData));

        const chartOptions = getChartOptions();

        var options = {
            fontSize: 16,
            title: "Número de refugiados",
            legend: 'none',
            backgroundColor: chartOptions.backgroundColor,
            titleTextStyle: chartOptions.titleTextStyle,
            chartArea: {
                backgroundColor: chartOptions.chartArea.backgroundColor,
                width: '100%',
                height: '70%',
                top: 60,
                left: 50
            },
            hAxis: chartOptions.hAxis,
            colors: ['#195BB3'],
            vAxis: {
                minValue: 0,
                textStyle: chartOptions.vAxis.textStyle,
                gridlines: chartOptions.vAxis.gridlines,
                baselineColor: chartOptions.vAxis.baselineColor
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    function drawGeoChart() {
        var countryData = @json($countryData);
        var chartData = [
            ['Country', 'Popularity']
        ];

        countryData.forEach(function(item) {
            chartData.push([item.country, item.popularity]);
        });

        var data = google.visualization.arrayToDataTable(chartData);

        const isDarkMode = document.body.classList.contains('tema-escuro');

        var options = {
        
            height: 600,
        
            legend: 'none',
            colorAxis: {
                colors: ['#015994']
            },
            datalessRegionColor: isDarkMode ? '#374151' : '#E0E0E0',
            backgroundColor: isDarkMode ? '#2C3440' : 'transparent',
            defaultColor: isDarkMode ? '#4B5563' : '#f5f5f5'
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);
    }

    function drawPieChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Status');
        data.addColumn('number', 'Porcentagem');
        data.addRows([
            ['Documentação Completa', {{$documentosStatus['porcentagem_completos']}}],
            ['Documentação Incompleta', {{$documentosStatus['porcentagem_incompletos']}}]
        ]);

        const chartOptions = getChartOptions();

        var options = {
            fontSize: 14,
            width: '100%',
            height: '100%',
            title: 'Status da Documentação',
            colors: ['#00B6D9', '#055063'],
            titlePosition: 'top',
            backgroundColor: chartOptions.backgroundColor,
            titleTextStyle: chartOptions.titleTextStyle,
            legend: {
                position: 'top',
                alignment: 'center',
                textStyle: chartOptions.legendTextStyle
            },
            chartArea: {
                top: 60,
                backgroundColor: chartOptions.chartArea.backgroundColor
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_card'));
        chart.draw(data, options);
    }

    function drawColumnChart() {
        var data = google.visualization.arrayToDataTable([
            ["Element", "Density", {role: "style"}],
            ["sem cpf", {{$documentosStatus['faltantes']['cpf']}}, "#8FC8FA"],
            ["sem crm", {{$documentosStatus['faltantes']['crm_rne']}}, "#0B87F4"],
            ["sem mersosul", {{$documentosStatus['faltantes']['mercosul']}}, "#07579C"],
            ["sem passaporte", {{$documentosStatus['faltantes']['passaporte']}}, "#053E70"]]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation",
                textStyle: {
                    color: document.body.classList.contains('tema-escuro') ? '#E5E7EB' : '#333'
                }
            },
            2
        ]);

        const chartOptions = getChartOptions();

        var options = {
            fontSize: 14,

            title: "Documentos Faltantes",
            bar: {
                groupWidth: "70%"
            },
            legend: {
                position: "none"
            },
            backgroundColor: chartOptions.backgroundColor,
            titleTextStyle: chartOptions.titleTextStyle,
            chartArea: {
                width: '100%',
                height: '70%',
                top: 60,
                left: 50,
                backgroundColor: chartOptions.chartArea.backgroundColor
            },
            hAxis: {
                textStyle: chartOptions.hAxis.textStyle
            },
            vAxis: {
                textStyle: chartOptions.vAxis.textStyle
            },
            annotations: {
                textStyle: {
                    color: document.body.classList.contains('tema-escuro') ? '#E5E7EB' : '#333'
                }
            }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(view, options);
    }

    // Redesenhar gráficos quando o tema mudar
    function redrawChartsOnThemeChange() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    // Pequeno delay para garantir que a classe foi aplicada
                    setTimeout(() => {
                        drawAllCharts();
                    }, 100);
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // Inicializar observador quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        redrawChartsOnThemeChange();
    });

    // Também redesenhar quando a janela for redimensionada
    window.addEventListener('resize', function() {
        drawAllCharts();
    });
</script>

@endsection