// servicos.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function textosServicos() {
    const escolha = await AsyncStorage.getItem('idioma');

    let titulo = [];

    switch (escolha) {
        case 'Portugues':
            titulo = ['Alimentação', 'Consulados', 'Educação', 'Assistência Social', 'Segurança', 'Saúde'];
            break;
        case 'Espanhol':
            titulo = ['Alimentación', 'Consulados', 'Educación', 'Asistencia Social', 'Seguridad', 'Salud'];
            break;
        case 'Inglês':
            titulo = ['Food', 'Consulates', 'Education', 'Social Assistance', 'Security', 'Health'];
            break;
        default:
            titulo = ['Alimentação', 'Consulados', 'Educação', 'Assistência Social', 'Segurança', 'Saúde'];
    }

    return titulo;
}

export async function cards() {
    const escolha = await AsyncStorage.getItem('idioma');

    const getText = (port, esp, eng) => {
        switch (escolha) {
            case 'Portugues': return port;
            case 'Espanhol': return esp;
            case 'Inglês': return eng;
            default: return port;
        }
    };

    let alimentação = [];
    let consulados = [];
    let educação = [];
    let assistência = [];
    let segurança = [];
    let saúde = [];

    // --- ALIMENTAÇÃO ---
    alimentação = [
        {
            nome: 'Bom Prato',
            descricao: getText(
                'Refeições completas (café, almoço e jantar) a preços simbólicos, priorizando pessoas em situação de vulnerabilidade social.',
                'Comidas completas (desayuno, almuerzo y cena) a precios simbólicos, priorizando personas en situación de vulnerabilidad social.',
                'Complete meals (breakfast, lunch and dinner) at symbolic prices, prioritizing people in socially vulnerable situations.'
            ),
            contato: getText(
                'Secretarias Estaduais de Desenvolvimento Social ou telefone/site específico do estado.',
                'Secretarías Estaduales de Desarrollo Social o teléfono/sitio específico del estado.',
                'State Secretariats of Social Development or state-specific phone/website.'
            ),
            imagem_url: require('./img/bomPrato.png'),
            tipo: getText('Governamental Estadual/Municipal', 'Gubernamental Estatal/Municipal', 'State/Municipal Government'),
            tipoFiltro: 'bomPrato'
        },
        {
            nome: 'Programa de Aquisição de Alimentos (PAA)',
            descricao: getText(
                'Compra de produtos da agricultura familiar para distribuição a pessoas em situação de insegurança alimentar e nutricional.',
                'Compra de productos de la agricultura familiar para distribución a personas en situación de inseguridad alimentaria y nutricional.',
                'Purchase of family farming products for distribution to people in food and nutritional insecurity.'
            ),
            contato: getText(
                'Ministério do Desenvolvimento e Assistência Social (MDS) e CONAB, ou Secretarias Estaduais/Municipais.',
                'Ministerio de Desarrollo y Asistencia Social (MDS) y CONAB, o Secretarías Estatales/Municipales.',
                'Ministry of Development and Social Assistance (MDS) and CONAB, or State/Municipal Secretariats.'
            ),
            imagem_url: require('./img/paa.png'),
            tipo: getText('Governamental Federal', 'Gubernamental Federal', 'Federal Government')
        },
        {
            nome: 'Cozinha Solidária',
            descricao: getText(
                'Apoio a cozinhas comunitárias e solidárias para a produção e oferta de refeições gratuitas ou a preço acessível.',
                'Apoyo a cocinas comunitarias y solidarias para la producción y oferta de comidas gratuitas o a precio accesible.',
                'Support for community and solidarity kitchens for the production and offer of free or affordable meals.'
            ),
            contato: getText(
                'Ministério do Desenvolvimento e Assistência Social (MDS) - Portaria nº 978/2024.',
                'Ministerio de Desarrollo y Asistencia Social (MDS) - Ordenanza nº 978/2024.',
                'Ministry of Development and Social Assistance (MDS) - Ordinance No. 978/2024.'
            ),
            imagem_url: require('./img/coz.png'),
            tipo: getText('Governamental Federal/ONGs', 'Gubernamental Federal/ONG', 'Federal Government/NGOs')
        }
    ];

    // --- CONSULADOS ---
    consulados = [
        {
            nome: 'Consulado Geral da Bolívia',
            descricao: getText(
                'Serviços consulares para cidadãos bolivianos e emissão de vistos para brasileiros que viajam à Bolívia.',
                'Servicios consulares para ciudadanos bolivianos y emisión de visas para brasileños que viajan a Bolivia.',
                'Consular services for Bolivian citizens and visa issuance for Brazilians traveling to Bolivia.'
            ),
            contato: getText(
                'São Paulo: (11) 5573-7114 | Site: www.consuladoboliviasp.org.br',
                'São Paulo: (11) 5573-7114 | Sitio: www.consuladoboliviasp.org.br',
                'São Paulo: (11) 5573-7114 | Website: www.consuladoboliviasp.org.br'
            ),
            imagem_url: require('./img/boliva.png'),
            tipo: getText('Consulado Estrangeiro', 'Consulado Extranjero', 'Foreign Consulate'),
            tipoFiltro: 'bolivia'
        },
        {
            nome: 'Consulado Geral da Venezuela',
            descricao: getText(
                'Atendimento a cidadãos venezuelanos no Brasil e serviços consulares para documentação.',
                'Atención a ciudadanos venezolanos en Brasil y servicios consulares para documentación.',
                'Assistance to Venezuelan citizens in Brazil and consular services for documentation.'
            ),
            contato: getText(
                'São Paulo: (11) 5549-1299 | Brasília: (61) 3322-1899',
                'São Paulo: (11) 5549-1299 | Brasilia: (61) 3322-1899',
                'São Paulo: (11) 5549-1299 | Brasília: (61) 3322-1899'
            ),
            imagem_url: require('./img/venezuela.png'),
            tipo: getText('Consulado Estrangeiro', 'Consulado Extranjero', 'Foreign Consulate'),
            tipoFiltro: 'venezuela'
        },
        {
            nome: 'Consulado Geral da Nigéria',
            descricao: getText(
                'Serviços consulares para cidadãos nigerianos no Brasil e informações sobre vistos para a Nigéria.',
                'Servicios consulares para ciudadanos nigerianos en Brasil e informaciones sobre visas para Nigeria.',
                'Consular services for Nigerian citizens in Brazil and visa information for Nigeria.'
            ),
            contato: getText(
                'São Paulo: (11) 3051-2133 | Site: www.nigeriaembassybr.org',
                'São Paulo: (11) 3051-2133 | Sitio: www.nigeriaembassybr.org',
                'São Paulo: (11) 3051-2133 | Website: www.nigeriaembassybr.org'
            ),
            imagem_url: require('./img/nigeria.png'),
            tipo: getText('Consulado Estrangeiro', 'Consulado Extranjero', 'Foreign Consulate'),
            tipoFiltro: 'nigeria'
        },
        {
            nome: 'Consulado Geral do Haiti',
            descricao: getText(
                'Atendimento à comunidade haitiana no Brasil e serviços consulares para documentação.',
                'Atención a la comunidad haitiana en Brasil y servicios consulares para documentación.',
                'Assistance to the Haitian community in Brazil and consular services for documentation.'
            ),
            contato: getText(
                'São Paulo: (11) 3331-1477 | Brasília: (61) 3248-0690',
                'São Paulo: (11) 3331-1477 | Brasilia: (61) 3248-0690',
                'São Paulo: (11) 3331-1477 | Brasília: (61) 3248-0690'
            ),
            imagem_url: require('./img/haiti.png'),
            tipo: getText('Consulado Estrangeiro', 'Consulado Extranjero', 'Foreign Consulate'),
            tipoFiltro: 'haiti'
        },
        {
            nome: 'Consulado Geral de Angola',
            descricao: getText(
                'Serviços consulares para cidadãos angolanos e informações sobre vistos para Angola.',
                'Servicios consulares para ciudadanos angoleños e informaciones sobre visas para Angola.',
                'Consular services for Angolan citizens and visa information for Angola.'
            ),
            contato: getText(
                'São Paulo: (11) 3262-2636 | Rio de Janeiro: (21) 2553-9595',
                'São Paulo: (11) 3262-2636 | Río de Janeiro: (21) 2553-9595',
                'São Paulo: (11) 3262-2636 | Rio de Janeiro: (21) 2553-9595'
            ),
            imagem_url: require('./img/angola.png'),
            tipo: getText('Consulado Estrangeiro', 'Consulado Extranjero', 'Foreign Consulate'),
            tipoFiltro: 'angola'
        }
    ];

    // --- EDUCAÇÃO ---
    educação = [
        {
            nome: 'Programa Universidade Para Todos (ProUni)',
            descricao: getText(
                'Oferece bolsas de estudo integrais e parciais em instituições privadas de ensino superior para estudantes brasileiros de baixa renda.',
                'Ofrece becas integrales y parciales en instituciones privadas de educación superior para estudiantes brasileños de bajos ingresos.',
                'Offers full and partial scholarships in private higher education institutions for low-income Brazilian students.'
            ),
            contato: getText('Site oficial do ProUni (MEC).', 'Sitio oficial de ProUni (MEC).', 'Official ProUni website (MEC).'),
            imagem_url: require('./img/prouni.png'),
            tipo: getText('Governamental Federal', 'Gubernamental Federal', 'Federal Government')
        },
        {
            nome: 'Fundo de Financiamento Estudantil (FIES)',
            descricao: getText(
                'Financiamento de cursos de ensino superior em instituições privadas com taxas de juros reduzidas ou zero, para estudantes de baixa renda.',
                'Financiamiento de cursos de educación superior en instituciones privadas con tasas de interés reducidas o cero, para estudiantes de bajos ingresos.',
                'Financing of higher education courses in private institutions with reduced or zero interest rates for low-income students.'
            ),
            contato: getText('Site oficial do FIES (Caixa Econômica Federal/MEC).', 'Sitio oficial de FIES (Caixa Econômica Federal/MEC).', 'Official FIES website (Caixa Econômica Federal/MEC).'),
            imagem_url: require('./img/fies.png'),
            tipo: getText('Governamental Federal', 'Gubernamental Federal', 'Federal Government')
        },
        {
            nome: 'Programa Pé-de-Meia',
            descricao: getText(
                'Incentivo financeiro para a permanência e conclusão escolar de estudantes de baixa renda matriculados no Ensino Médio público.',
                'Incentivo financiero para la permanencia y conclusión escolar de estudiantes de bajos ingresos matriculados en la Escuela Secundaria pública.',
                'Financial incentive for the retention and school completion of low-income students enrolled in public High School.'
            ),
            contato: getText('Site oficial da CAIXA ou do MEC.', 'Sitio oficial de CAIXA o del MEC.', 'Official CAIXA or MEC website.'),
            imagem_url: require('./img/pe.png'),
            tipo: getText('Governamental Federal', 'Gubernamental Federal', 'Federal Government')
        }
    ];

    // --- ASSISTÊNCIA SOCIAL ---
    assistência = [
        {
            nome: 'Bolsa Família',
            descricao: getText(
                'Programa de transferência de renda para famílias em situação de pobreza e extrema pobreza, com condicionalidades nas áreas de saúde e educação.',
                'Programa de transferencia de ingresos para familias en situación de pobreza y pobreza extrema, con condicionalidades en las áreas de salud y educación.',
                'Income transfer program for families in poverty and extreme poverty, with conditionalities in the areas of health and education.'
            ),
            contato: getText(
                'Centros de Referência de Assistência Social (CRAS) do seu município.',
                'Centros de Referencia de Asistencia Social (CRAS) de su municipio.',
                'Social Assistance Reference Centers (CRAS) in your municipality.'
            ),
            imagem_url: require('./img/bolsa.png'),
            tipo: getText('Governamental Federal', 'Gubernamental Federal', 'Federal Government')
        },
        {
            nome: 'Benefício de Prestação Continuada (BPC)',
            descricao: getText(
                'Garante um salário mínimo mensal à pessoa idosa ou à pessoa com deficiência que comprovem não possuir meios de prover a própria manutenção.',
                'Garantiza un salario mínimo mensual a la persona mayor o con discapacidad que demuestre no tener medios para proveer su propia manutención.',
                'Guarantees a monthly minimum wage for elderly or disabled people who prove they have no means to support themselves.'
            ),
            contato: getText(
                'Instituto Nacional do Seguro Social (INSS) ou CRAS.',
                'Instituto Nacional del Seguro Social (INSS) o CRAS.',
                'National Social Security Institute (INSS) or CRAS.'
            ),
            imagem_url: require('./img/bpc.png'),
            tipo: getText('Governamental Federal (INSS/SUAS)', 'Gubernamental Federal (INSS/SUAS)', 'Federal Government (INSS/SUAS)')
        },
        {
            nome: 'Cadastro Único (CadÚnico)',
            descricao: getText(
                'Instrumento para identificar e caracterizar as famílias de baixa renda, essencial para acessar diversos programas sociais do governo federal.',
                'Instrumento para identificar y caracterizar a las familias de bajos ingresos, esencial para acceder a diversos programas sociales del gobierno federal.',
                'Instrument to identify and characterize low-income families, essential for accessing various federal government social programs.'
            ),
            contato: getText(
                'Centros de Referência de Assistência Social (CRAS) do seu município.',
                'Centros de Referencia de Asistencia Social (CRAS) de su municipio.',
                'Social Assistance Reference Centers (CRAS) in your municipality.'
            ),
            imagem_url: require('./img/cad.png'),
            tipo: getText('Governamental Federal/Municipal', 'Gubernamental Federal/Municipal', 'Federal/Municipal Government')
        }
    ];

    // --- SEGURANÇA ---
    segurança = [
        {
            nome: 'Secretaria de Segurança Pública',
            descricao: getText(
                'Órgão responsável pela política de segurança pública do estado, coordenação das polícias civil e militar.',
                'Órgano responsable de la política de seguridad pública del estado, coordinación de las policías civil y militar.',
                'Body responsible for the state public security policy, coordination of civil and military police.'
            ),
            contato: getText(
                'Delegacias e unidades da Polícia Civil e Militar em todo o estado.',
                'Comisarías y unidades de la Policía Civil y Militar en todo el estado.',
                'Police stations and units of Civil and Military Police throughout the state.'
            ),
            imagem_url: require('./img/seguranca.png'),
            tipo: getText('Governamental Estadual', 'Gubernamental Estatal', 'State Government'),
            tipoFiltro: 'secretariaSeguranca'
        },
        {
            nome: 'Polícia Federal',
            descricao: getText(
                'Atua na investigação de crimes federais, controle de fronteiras, emissão de passaportes e imigração.',
                'Actúa en la investigación de crímenes federales, control de fronteras, emisión de pasaportes e inmigración.',
                'Acts in the investigation of federal crimes, border control, passport issuance and immigration.'
            ),
            contato: getText(
                'Superintendências regionais e postos da Polícia Federal.',
                'Superintendencias regionales y puestos de la Policía Federal.',
                'Regional superintendencies and Federal Police posts.'
            ),
            imagem_url: require('./img/pf.png'),
            tipo: getText('Governamental Federal', 'Gubernamental Federal', 'Federal Government'),
            tipoFiltro: 'policiaFederal'
        },
        {
            nome: 'Detran',
            descricao: getText(
                'Departamento responsável pelo registro de veículos, emissão de CNH e fiscalização do trânsito.',
                'Departamento responsable del registro de vehículos, emisión de licencia de conducir y fiscalización del tránsito.',
                'Department responsible for vehicle registration, driver license issuance and traffic enforcement.'
            ),
            contato: getText(
                'Unidades de atendimento do Detran em todas as regiões.',
                'Unidades de atención del Detran en todas las regiones.',
                'Detran service units in all regions.'
            ),
            imagem_url: require('./img/detran.png'),
            tipo: getText('Governamental Estadual', 'Gubernamental Estatal', 'State Government'),
            tipoFiltro: 'detran'
        }
    ];

    // --- SAÚDE ---
    saúde = [
        {
            nome: 'Unidades Básicas de Saúde (UBS)',
            descricao: getText(
                'Atendimento básico de saúde, consultas, vacinação, pré-natal e acompanhamento de doenças crônicas.',
                'Atención básica de salud, consultas, vacunación, prenatal y seguimiento de enfermedades crónicas.',
                'Basic health care, consultations, vaccination, prenatal care and chronic disease monitoring.'
            ),
            contato: getText(
                'Unidades de Saúde da rede pública municipal e estadual.',
                'Unidades de Salud de la red pública municipal y estatal.',
                'Health units of the municipal and state public network.'
            ),
            imagem_url: require('./img/ubs.png'),
            tipo: getText('Governamental Municipal/Estadual', 'Gubernamental Municipal/Estatal', 'Municipal/State Government'),
            tipoFiltro: 'unidadeSaude'
        },
        {
            nome: 'Hospitais Públicos',
            descricao: getText(
                'Atendimento de média e alta complexidade, emergências, cirurgias e internações pelo SUS.',
                'Atención de mediana y alta complejidad, emergencias, cirugías e internaciones por el SUS.',
                'Medium and high complexity care, emergencies, surgeries and hospitalizations through SUS.'
            ),
            contato: getText(
                'Hospitais da rede pública estadual e municipal.',
                'Hospitales de la red pública estatal y municipal.',
                'Hospitals in the state and municipal public network.'
            ),
            imagem_url: require('./img/hospital.png'),
            tipo: getText('Governamental Estadual/Municipal', 'Gubernamental Estatal/Municipal', 'State/Municipal Government'),
            tipoFiltro: 'unidadeSaude'
        }
    ];

    return [alimentação, consulados, educação, assistência, segurança, saúde];
}