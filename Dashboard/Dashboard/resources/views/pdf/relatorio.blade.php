<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Relatório do Sistema</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
        }
        
        body {
            margin: 0;
            padding: 15px;
            background: #f8fafc;
            color: #2d3748;
            line-height: 1.4;
            font-size: 12px;
        }
        
        .container {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 1.4rem;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .header p {
            font-size: 0.8rem;
            opacity: 0.9;
        }
        
        .content {
            padding: 20px;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: #2d3748;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #3498db;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            text-align: center;
            margin-bottom: 10px;
        }
        
        .stat-card.positive { border-left-color: #27ae60; }
        .stat-card.negative { border-left-color: #e74c3c; }
        .stat-card.warning { border-left-color: #f39c12; }
        
        .stat-card h3 {
            font-size: 0.7rem;
            color: #ffffffff;
            margin-bottom: 8px;
            text-transform: uppercase;
            font-weight: 600;
        }
        
        .stat-card p {
            font-size: 1.4rem;
            font-weight: 700;
            color: #ffffffff;
            margin: 0;
        }
        
        .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 0.6rem;
            font-weight: 600;
            margin-left: 5px;
        }
        
        .badge-success { background: #27ae60; color: white; }
        .badge-danger { background: #e74c3c; color: white; }
        
        .section {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        
        .section-title {
            font-size: 0.9rem;
            color: #2d3748;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            font-weight: 600;
        }
        
        .two-columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .table-container {
            overflow-x: auto;
            margin: 10px 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.75rem;
        }
        
        th {
            background: #4a5568;
            color: white;
            padding: 8px 6px;
            text-align: left;
            font-weight: 600;
            font-size: 0.7rem;
        }
        
        td {
            padding: 6px;
            border-bottom: 1px solid #edf2f7;
        }
        
        tr:nth-child(even) {
            background-color: #f8fafc;
        }
        
        .progress-container {
            margin: 8px 0;
        }
        
        .progress-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            font-size: 0.7rem;
            font-weight: 500;
        }
        
        .progress-bar {
            height: 6px;
            background: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: #3498db;
            border-radius: 3px;
        }
        
        .footer {
            text-align: center;
            padding: 15px;
            background: #2d3748;
            color: #e2e8f0;
            font-size: 0.7rem;
        }
        
        .compact-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 10px 0;
        }
        
        @media (max-width: 768px) {
            .dashboard-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .two-columns {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Relatório do Sistema</h1>
            <p>Resumo executivo - {{ date('d/m/Y H:i') }}</p>
        </div>
        
        <div class="content">
            <!-- Dashboard Principal -->
            <div class="dashboard-grid">
                <div class="stat-card">
                    <h3>Total Usuários</h3>
                    <p>{{ $totalUsuarios }}</p>
                </div>
                <div class="stat-card positive">
                    <h3>Ativos</h3>
                    <p>{{ $usuariosAtivos }}</p>
                </div>
                <div class="stat-card">
                    <h3>Refugiados</h3>
                    <p>{{ $usuarioQtaRefugiados }}</p>
                </div>
                <div class="stat-card">
                    <h3>Imigrantes</h3>
                    <p>{{ $usuarioQtaNaoRefugiados }}</p>
                </div>
            </div>

            <div class="two-columns">
                <!-- Coluna 1: Documentos -->
                <div class="section">
                    <div class="section-title">Situação Documental</div>
                    
                    <div class="compact-grid">
                        <div class="stat-card positive">
                            <h3>Completos</h3>
                            <p>{{ $usuariosComDocumentosCompletos }} <span class="badge badge-success">{{ $porcentagemCompletos }}%</span></p>
                        </div>
                        <div class="stat-card negative">
                            <h3>Incompletos</h3>
                            <p>{{ $usuariosComDocumentosIncompletos }} <span class="badge badge-danger">{{ $porcentagemIncompletos }}%</span></p>
                        </div>
                    </div>

                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Documentos Completos</span>
                            <span>{{ $porcentagemCompletos }}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: {{ $porcentagemCompletos }}%"></div>
                        </div>
                    </div>

                    <div class="table-container">
                        <table>
                            <tr>
                                <th>Documento</th>
                                <th>Faltantes</th>
                                <th>%</th>
                            </tr>
                            <tr>
                                <td>CPF</td>
                                <td>{{ $semCPF }}</td>
                                <td>{{ $totalUsuarios > 0 ? number_format(($semCPF / $totalUsuarios) * 100, 1) : 0 }}%</td>
                            </tr>
                            <tr>
                                <td>Passaporte</td>
                                <td>{{ $semPassaporte }}</td>
                                <td>{{ $totalUsuarios > 0 ? number_format(($semPassaporte / $totalUsuarios) * 100, 1) : 0 }}%</td>
                            </tr>
                            <tr>
                                <td>CRM/RNE</td>
                                <td>{{ $semCrmRne }}</td>
                                <td>{{ $totalUsuarios > 0 ? number_format(($semCrmRne / $totalUsuarios) * 100, 1) : 0 }}%</td>
                            </tr>
                            <tr>
                                <td>Mercosul</td>
                                <td>{{ $semMercosul }}</td>
                                <td>{{ $totalUsuarios > 0 ? number_format(($semMercosul / $totalUsuarios) * 100, 1) : 0 }}%</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!-- Coluna 2: Notícias e Países -->
                <div class="section">
                    <div class="section-title">Conteúdo do Sistema</div>
                    
                    <div class="compact-grid">
                        <div class="stat-card positive">
                            <h3>Notícias Ativas</h3>
                            <p>{{ $noticiasAtivas }}</p>
                        </div>
                        <div class="stat-card warning">
                            <h3>Em Análise</h3>
                            <p>{{ $noticiasAnalise }}</p>
                        </div>
                    </div>

                    <div class="section-title" style="margin-top: 15px;">Top Países</div>
                    <div class="table-container">
                        <table>
                            <tr>
                                <th>País</th>
                                <th>Usuários</th>
                                <th>%</th>
                            </tr>
                            @php
                                // Corrigindo o erro da Collection - usando take() em vez de array_slice()
                                $topCountries = $countryData->take(5);
                            @endphp
                            @foreach($topCountries as $data)
                            <tr>
                                <td>{{ is_array($data) ? $data['country'] : ($data->country ?? $data->paisOrigemUsers ?? 'N/A') }}</td>
                                <td>{{ is_array($data) ? $data['popularity'] : ($data->popularity ?? 0) }}</td>
                                <td>{{ $totalUsuarios > 0 ? number_format(((is_array($data) ? $data['popularity'] : ($data->popularity ?? 0)) / $totalUsuarios) * 100, 1) : 0 }}%</td>
                            </tr>
                            @endforeach
                        </table>
                    </div>
                </div>
            </div>

            <!-- Evolução Anual Compacta -->
            <div class="section">
                <div class="section-title">Evolução Anual</div>
                <div class="table-container">
                    <table>
                        <tr>
                            <th>Ano</th>
                            <th>Refugiados</th>
                            <th>Migrantes</th>
                            <th>Total</th>
                            <th style="width: 60px;">Tendência</th>
                        </tr>
                        @php
                            // Garantir que chartData seja iterável
                            $chartData = $chartData ?? [];
                            $chartDataCount = is_countable($chartData) ? count($chartData) : 0;
                        @endphp
                        @for($i = 1; $i < $chartDataCount; $i++)
                            @php
                                $data = $chartData[$i];
                                // Garantir que os valores sejam numéricos
                                $refugiados = intval($data[1] ?? 0);
                                $migrantes = intval($data[2] ?? 0);
                                $total = $refugiados + $migrantes;
                                
                                // Calcular tendência
                                $tendencia = '→'; // padrão
                                if($i > 1) {
                                    $prevData = $chartData[$i-1];
                                    $prevRefugiados = intval($prevData[1] ?? 0);
                                    $prevMigrantes = intval($prevData[2] ?? 0);
                                    $prevTotal = $prevRefugiados + $prevMigrantes;
                                    
                                    if($total > $prevTotal) $tendencia = '↗';
                                    elseif($total < $prevTotal) $tendencia = '↘';
                                }
                            @endphp
                            <tr>
                                <td><strong>{{ $data[0] ?? 'N/A' }}</strong></td>
                                <td>{{ $refugiados }}</td>
                                <td>{{ $migrantes }}</td>
                                <td><strong>{{ $total }}</strong></td>
                                <td>{{ $tendencia }}</td>
                            </tr>
                        @endfor
                    </table>
                </div>
            </div>

            <!-- Distribuição Refugiados vs Imigrantes -->
            <div class="section">
                <div class="section-title">Distribuição por Condição</div>
                <div class="two-columns">
                    <div>
                        <div class="progress-container">
                            <div class="progress-label">
                                <span>Refugiados</span>
                                <span>{{ $totalUsuarios > 0 ? number_format(($usuarioQtaRefugiados / $totalUsuarios) * 100, 1) : 0 }}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: {{ $totalUsuarios > 0 ? ($usuarioQtaRefugiados / $totalUsuarios) * 100 : 0 }}%"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="progress-container">
                            <div class="progress-label">
                                <span>Imigrantes</span>
                                <span>{{ $totalUsuarios > 0 ? number_format(($usuarioQtaNaoRefugiados / $totalUsuarios) * 100, 1) : 0 }}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: {{ $totalUsuarios > 0 ? ($usuarioQtaNaoRefugiados / $totalUsuarios) * 100 : 0 }}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Relatório gerado em {{ date('d/m/Y H:i:s') }} | Total de registros: {{ $totalUsuarios }}</p>
        </div>
    </div>
</body>
</html>