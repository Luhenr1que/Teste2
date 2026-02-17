<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ModelsNoticia\NoticiaModel;
use App\Models\ModelsUsuario\UsuarioModel;


class PDFcontroller extends Controller
{
    /*   public function gerarPDF()
    {
        $totalOngs = Ong::count();
        $ongsAtivas = Ong::where('statusOng', 'Ativa')->count();
        $ongsInativas = Ong::where('statusOng', 'Inativa')->count();
        $ongsPendentes = Ong::where('statusOng', 'Pendente')->count();

        $totalNoticias = Noticia::count();
        $noticiasAtivas = Noticia::where('statusNoticia', 'ativa')->count();
        $noticiasInativas = Noticia::where('statusNoticia', 'negado')->count();
        $noticiasPendentes = Noticia::where('statusNoticia', 'analise')->count();

        $totalUsuarios = Usuario::count();
        
        $pdf = PDF::loadView('pdf.relatorio', [
            'totalOngs' => $totalOngs,
            'ongsAtivas' => $ongsAtivas,
            'ongsInativas' => $ongsInativas,
            'ongsPendentes' => $ongsPendentes,
            'totalNoticias' => $totalNoticias,
            'noticiasAtivas' => $noticiasAtivas,
            'noticiasInativas' => $noticiasInativas,
            'noticiasPendentes' => $noticiasPendentes,
            'totalUsuarios' => $totalUsuarios,
        ])->setPaper('a4', 'portrait');

        return $pdf->download('relatorio.pdf');
    } */

    public function PDFrefugiados()
    {
        $totalUsuarios = UsuarioModel::count();

        $refugiados = UsuarioModel::where('condicaoUsers', 'refugiado')->count();
        $migrantes = UsuarioModel::where('condicaoUsers', 'migrante')->count();

        $pdf = PDF::loadView('pdf.relatorioCondicao', [
            'totalUsuarios' => $totalUsuarios,
            'refugiados' => $refugiados,
            'migrantes' => $migrantes
        ])->setPaper('a4', 'portrait');

        return $pdf->download('relatorioCondicao.pdf');
    }

    public function PDFpaises()
    {

        $rawData = UsuarioModel::select('paisOrigemUsers', DB::raw('count(*) as popularity'))
            ->groupBy('paisOrigemUsers')
            ->get();

        // Mapeamento de países para nomes em inglês para o GeoChart
        $countryMap = [
            'Brasil' => 'Brazil',
            'Estados Unidos' => 'United States',
            'Alemanha' => 'Germany',
            'Canadá' => 'Canada',
            'França' => 'France',
            'Rússia' => 'Russia',
        ];

        // Monta array com nomes corretos
        $countryData = $rawData->map(function ($item) use ($countryMap) {
            return [
                'country' => $countryMap[$item->paisOrigemUsers] ?? $item->paisOrigemUsers,
                'popularity' => $item->popularity
            ];
        });

        $pdf = PDF::loadView('pdf.relatorioPaises', [
            'countryData' => $countryData
        ])->setPaper('a4', 'portrait');

        return $pdf->download('relatorioPaises.pdf');
    }



    public function PDFdashboard()
    {

        // Pega os países e quantidade usando Eloquent + groupBy
        $rawData = UsuarioModel::select('paisOrigemUsers', DB::raw('count(*) as popularity'))
            ->groupBy('paisOrigemUsers')
            ->get();

        // Mapeamento de países para nomes em inglês para o GeoChart
        $countryMap = [
            'Estados Unidos' => 'United States',
            'Canadá' => 'Canada',
            'México' => 'Mexico',

            // América Central
            'Belize' => 'Belize',
            'Costa Rica' => 'Costa Rica',
            'El Salvador' => 'El Salvador',
            'Guatemala' => 'Guatemala',
            'Honduras' => 'Honduras',
            'Nicarágua' => 'Nicaragua',
            'Panamá' => 'Panama',

            // Caribe
            'Antígua e Barbuda' => 'Antigua and Barbuda',
            'Bahamas' => 'Bahamas',
            'Barbados' => 'Barbados',
            'Cuba' => 'Cuba',
            'Dominica' => 'Dominica',
            'República Dominicana' => 'Dominican Republic',
            'Granada' => 'Grenada',
            'Haiti' => 'Haiti',
            'Jamaica' => 'Jamaica',
            'Santa Lúcia' => 'Saint Lucia',
            'São Cristóvão e Névis' => 'Saint Kitts and Nevis',
            'São Vicente e Granadinas' => 'Saint Vincent and the Grenadines',
            'Trinidad e Tobago' => 'Trinidad and Tobago',

            // América do Sul
            'Argentina' => 'Argentina',
            'Bolívia' => 'Bolivia',
            'Brasil' => 'Brazil',
            'Chile' => 'Chile',
            'Colômbia' => 'Colombia',
            'Equador' => 'Ecuador',
            'Guiana' => 'Guyana',
            'Paraguai' => 'Paraguay',
            'Peru' => 'Peru',
            'Suriname' => 'Suriname',
            'Uruguai' => 'Uruguay',
            'Venezuela' => 'Venezuela',

            // Europa Ocidental
            'Alemanha' => 'Germany',
            'Áustria' => 'Austria',
            'Bélgica' => 'Belgium',
            'França' => 'France',
            'Liechtenstein' => 'Liechtenstein',
            'Luxemburgo' => 'Luxembourg',
            'Mônaco' => 'Monaco',
            'Países Baixos' => 'Netherlands',
            'Suíça' => 'Switzerland',

            // Europa Setentrional
            'Dinamarca' => 'Denmark',
            'Estônia' => 'Estonia',
            'Finlândia' => 'Finland',
            'Islândia' => 'Iceland',
            'Irlanda' => 'Ireland',
            'Letônia' => 'Latvia',
            'Lituânia' => 'Lithuania',
            'Noruega' => 'Norway',
            'Reino Unido' => 'United Kingdom',
            'Suécia' => 'Sweden',

            // Europa Oriental
            'Bielorrússia' => 'Belarus',
            'Bulgária' => 'Bulgaria',
            'Chéquia' => 'Czech Republic',
            'Eslováquia' => 'Slovakia',
            'Eslovênia' => 'Slovenia',
            'Hungria' => 'Hungary',
            'Moldávia' => 'Moldova',
            'Polônia' => 'Poland',
            'Romênia' => 'Romania',
            'Rússia' => 'Russia',
            'Ucrânia' => 'Ukraine',

            // Europa Meridional
            'Albânia' => 'Albania',
            'Andorra' => 'Andorra',
            'Bósnia e Herzegovina' => 'Bosnia and Herzegovina',
            'Croácia' => 'Croatia',
            'Espanha' => 'Spain',
            'Grécia' => 'Greece',
            'Itália' => 'Italy',
            'Kosovo' => 'Kosovo',
            'Macedônia do Norte' => 'North Macedonia',
            'Malta' => 'Malta',
            'Montenegro' => 'Montenegro',
            'Portugal' => 'Portugal',
            'San Marino' => 'San Marino',
            'Sérvia' => 'Serbia',
            'Turquia' => 'Turkey',
            'Vaticano' => 'Vatican City',

            // Ásia Oriental
            'China' => 'China',
            'Coreia do Norte' => 'North Korea',
            'Coreia do Sul' => 'South Korea',
            'Japão' => 'Japan',
            'Mongólia' => 'Mongolia',
            'Taiwan' => 'Taiwan',

            // Sudeste Asiático
            'Brunei' => 'Brunei',
            'Camboja' => 'Cambodia',
            'Filipinas' => 'Philippines',
            'Indonésia' => 'Indonesia',
            'Laos' => 'Laos',
            'Malásia' => 'Malaysia',
            'Mianmar' => 'Myanmar',
            'Singapura' => 'Singapore',
            'Tailândia' => 'Thailand',
            'Timor-Leste' => 'Timor-Leste',
            'Vietnã' => 'Vietnam',

            // Sul da Ásia
            'Afeganistão' => 'Afghanistan',
            'Bangladesh' => 'Bangladesh',
            'Butão' => 'Bhutan',
            'Índia' => 'India',
            'Irã' => 'Iran',
            'Maldivas' => 'Maldives',
            'Nepal' => 'Nepal',
            'Paquistão' => 'Pakistan',
            'Sri Lanka' => 'Sri Lanka',

            // Ásia Central
            'Cazaquistão' => 'Kazakhstan',
            'Quirguistão' => 'Kyrgyzstan',
            'Tadjiquistão' => 'Tajikistan',
            'Turcomenistão' => 'Turkmenistan',
            'Uzbequistão' => 'Uzbekistan',

            // Oriente Médio
            'Arábia Saudita' => 'Saudi Arabia',
            'Bahrein' => 'Bahrain',
            'Catar' => 'Qatar',
            'Emirados Árabes Unidos' => 'United Arab Emirates',
            'Iêmen' => 'Yemen',
            'Iraque' => 'Iraq',
            'Israel' => 'Israel',
            'Jordânia' => 'Jordan',
            'Kuwait' => 'Kuwait',
            'Líbano' => 'Lebanon',
            'Omã' => 'Oman',
            'Palestina' => 'Palestine',
            'Síria' => 'Syria',

            // África do Norte
            'Argélia' => 'Algeria',
            'Egito' => 'Egypt',
            'Líbia' => 'Libya',
            'Marrocos' => 'Morocco',
            'Sudão' => 'Sudan',
            'Tunísia' => 'Tunisia',

            // África Ocidental
            'Benin' => 'Benin',
            'Burkina Faso' => 'Burkina Faso',
            'Cabo Verde' => 'Cape Verde',
            'Costa do Marfim' => 'Ivory Coast',
            'Gâmbia' => 'Gambia',
            'Gana' => 'Ghana',
            'Guiné' => 'Guinea',
            'Guiné-Bissau' => 'Guinea-Bissau',
            'Libéria' => 'Liberia',
            'Mali' => 'Mali',
            'Mauritânia' => 'Mauritania',
            'Níger' => 'Niger',
            'Nigéria' => 'Nigeria',
            'Senegal' => 'Senegal',
            'Serra Leoa' => 'Sierra Leone',
            'Togo' => 'Togo',

            // África Central
            'Angola' => 'Angola',
            'Camarões' => 'Cameroon',
            'Chade' => 'Chad',
            'Congo' => 'Republic of the Congo',
            'Gabão' => 'Gabon',
            'Guiné Equatorial' => 'Equatorial Guinea',
            'República Centro-Africana' => 'Central African Republic',
            'República Democrática do Congo' => 'Democratic Republic of the Congo',
            'São Tomé e Príncipe' => 'Sao Tome and Principe',

            // África Oriental
            'Burundi' => 'Burundi',
            'Djibuti' => 'Djibouti',
            'Eritreia' => 'Eritrea',
            'Etiópia' => 'Ethiopia',
            'Quênia' => 'Kenya',
            'Ruanda' => 'Rwanda',
            'Somália' => 'Somalia',
            'Sudão do Sul' => 'South Sudan',
            'Tanzânia' => 'Tanzania',
            'Uganda' => 'Uganda',

            // África Austral
            'África do Sul' => 'South Africa',
            'Botsuana' => 'Botswana',
            'Essuatíni' => 'Eswatini',
            'Lesoto' => 'Lesotho',
            'Maláui' => 'Malawi',
            'Moçambique' => 'Mozambique',
            'Namíbia' => 'Namibia',
            'Zâmbia' => 'Zambia',
            'Zimbábue' => 'Zimbabwe',

            // Oceania
            'Austrália' => 'Australia',
            'Fiji' => 'Fiji',
            'Ilhas Marshall' => 'Marshall Islands',
            'Ilhas Salomão' => 'Solomon Islands',
            'Kiribati' => 'Kiribati',
            'Micronésia' => 'Micronesia',
            'Nauru' => 'Nauru',
            'Nova Zelândia' => 'New Zealand',
            'Palau' => 'Palau',
            'Papua-Nova Guiné' => 'Papua New Guinea',
            'Samoa' => 'Samoa',
            'Tonga' => 'Tonga',
            'Tuvalu' => 'Tuvalu',
            'Vanuatu' => 'Vanuatu',

        ];


        $countryData = $rawData->map(function ($item) use ($countryMap) {
            return [
                'country' => $countryMap[$item->paisOrigemUsers] ?? $item->paisOrigemUsers,
                'popularity' => $item->popularity
            ];
        });


        $anos = range(2020, 2025);
        $chartData = [
            ['Year', 'Refugiados', 'Migrantes']
        ];

        foreach ($anos as $ano) {
            $refugiados = UsuarioModel::whereYear('created_at', $ano)
                ->where('condicaoUsers', 'refugiado')
                ->count();

            $migrantes = UsuarioModel::whereYear('created_at', $ano)
                ->where('condicaoUsers', 'imigrante')
                ->count();

            $chartData[] = [
                (string)$ano,
                $refugiados,
                $migrantes
            ];
        }

        $totalUsuarios = UsuarioModel::count();

        // Documentos completos (todos os campos preenchidos)
        $usuariosComDocumentosCompletos = UsuarioModel::whereNotNull('cpfUsers')
            ->whereNotNull('passaporteUsers')
            ->whereNotNull('crmRneUsers')
            ->whereNotNull('mercosulUsers')
            ->count();

        $usuariosComDocumentosIncompletos = $totalUsuarios - $usuariosComDocumentosCompletos;

        // Porcentagens
        $porcentagemCompletos = $totalUsuarios > 0 ? round(($usuariosComDocumentosCompletos / $totalUsuarios) * 100, 2) : 0;
        $porcentagemIncompletos = $totalUsuarios > 0 ? round(($usuariosComDocumentosIncompletos / $totalUsuarios) * 100, 2) : 0;

        // Análise por tipo de documento (quais estão faltando)
        $semCPF = UsuarioModel::whereNull('cpfUsers')->count();
        $semPassaporte = UsuarioModel::whereNull('passaporteUsers')->count();
        $semCrmRne = UsuarioModel::whereNull('crmRneUsers')->count();
        $semMercosul = UsuarioModel::whereNull('mercosulUsers')->count();

        $documentosStatus = [
            'completos' => $usuariosComDocumentosCompletos,
            'incompletos' => $usuariosComDocumentosIncompletos,
            'porcentagem_completos' => $porcentagemCompletos,
            'porcentagem_incompletos' => $porcentagemIncompletos,
            'total' => $totalUsuarios,
            'faltantes' => [
                'cpf' => $semCPF,
                'passaporte' => $semPassaporte,
                'crm_rne' => $semCrmRne,
                'mercosul' => $semMercosul
            ]
        ];


        $usuariosAtivos = UsuarioModel::where('statusUsers', 'ativo')->count();
        $usuariosInativos = UsuarioModel::where('statusUsers', 'inativo')->count();


        $noticiasAtivas = NoticiaModel::where('StatusNoticia', 'ativa')->count();
        $noticiasAnalise = NoticiaModel::where('StatusNoticia', 'analise')->count();

        $usuarioQtaRefugiados = [];
        $usuarioQtaRefugiados = UsuarioModel::where('condicaoUsers', 'refugiado')->count();
        $usuarioQtaNaoRefugiados = UsuarioModel::where('condicaoUsers', 'imigrante')->count();

        $pdf = PDF::loadView('pdf.relatorio', [
            'totalUsuarios' => $totalUsuarios,
            'usuariosAtivos' => $usuariosAtivos,
            'usuariosInativos' => $usuariosInativos,
            'noticiasAtivas' => $noticiasAtivas,
            'noticiasAnalise' => $noticiasAnalise,
            'usuarioQtaRefugiados' => $usuarioQtaRefugiados,
            'usuarioQtaNaoRefugiados' => $usuarioQtaNaoRefugiados,
            'countryData' => $countryData,
            'chartData' => $chartData,
            'documentosStatus' => $documentosStatus,
            'rawData' => $rawData,
            'countryMap' => $countryMap,
            'anos' => $anos,
            'usuariosComDocumentosCompletos' => $usuariosComDocumentosCompletos,
            'usuariosComDocumentosIncompletos' => $usuariosComDocumentosIncompletos,
            'porcentagemCompletos' => $porcentagemCompletos,
            'porcentagemIncompletos' => $porcentagemIncompletos,
            'semCPF' => $semCPF,
            'semPassaporte' => $semPassaporte,
            'semCrmRne' => $semCrmRne,
            'semMercosul' => $semMercosul
        ])->setPaper('a4', 'portrait');

        return $pdf->download('relatorio-completo.pdf');

        // return view('pdf.relatorio', compact('usuariosAtivos', 'usuariosInativos', 'noticiasAtivas', 'noticiasAnalise', 'usuarioQtaRefugiados', 'usuarioQtaNaoRefugiados', 'countryData', 'chartData', 'documentosStatus'));
    }
}
