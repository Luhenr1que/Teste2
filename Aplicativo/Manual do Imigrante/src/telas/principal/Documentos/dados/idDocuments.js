let dados = {
  identificacao: {
    Mercosul: {
      nome: ["Documento de Identidade Mercosul", "Mercosur Identity Document", "Documento de Identidad Mercosur"],
      descricao: [
        "Documento de identidade padronizado entre países do Mercosul, permitindo identificação e circulação facilitada.",
        "Standardized identity document across Mercosur countries, allowing easier identification and circulation.",
        "Documento de identidad estandarizado entre los países del Mercosur, permitiendo identificación y circulación facilitada."
      ],
      camposPrincipais: [
        ["Nome completo", "Full name", "Nombre completo"],
        ["Data de nascimento", "Date of birth", "Fecha de nacimiento"],
        ["Nacionalidade", "Nationality", "Nacionalidad"],
        ["Número do documento", "Document number", "Número del documento"],
        ["Órgão emissor", "Issuing authority", "Autoridad emisora"],
        ["Data de emissão", "Issue date", "Fecha de emisión"],
        ["Data de validade", "Expiration date", "Fecha de vencimiento"],
        ["Assinatura", "Signature", "Firma"],
        ["Foto", "Photo", "Foto"]
      ],
      validade: [
        "Varia conforme o país emissor, geralmente entre 5 e 10 anos.",
        "Varies depending on issuing country, usually between 5 and 10 years.",
        "Varía según el país emisor, generalmente entre 5 y 10 años."
      ],
      usoComum: [
        ["Identificação civil", "Civil identification", "Identificación civil"],
        ["Viagens entre países do Mercosul", "Travel within Mercosur countries", "Viajes dentro del Mercosur"],
        ["Acesso a serviços públicos", "Access to public services", "Acceso a servicios públicos"]
      ],
      requisitos: [
        ["Certidão de nascimento ou casamento", "Birth or marriage certificate", "Certificado de nacimiento o matrimonio"],
        ["Comprovante de residência", "Proof of residence", "Comprobante de domicilio"],
        ["Documento de identidade atual", "Current ID document", "Documento de identidad actual"],
        ["Foto 3x4 recente", "Recent 3x4 photo", "Foto 3x4 reciente"]
      ],
      imagem: require('./img/dim.png'),
      local: ["poupaTempo", "secretariaSeguranca"]
    },
    CRNM: {
      nome: [
        "Carteira de Registro Nacional Migratório",
        "National Migratory Registry Card",
        "Tarjeta de Registro Nacional Migratorio"
      ],

      descricao: [
        "Documento emitido pela Polícia Federal que identifica imigrantes residentes no Brasil.",
        "Document issued by the Federal Police that identifies immigrants residing in Brazil.",
        "Documento emitido por la Policía Federal que identifica a los inmigrantes residentes en Brasil."
      ],

      camposPrincipais: [
        ["Nome completo", "Full name", "Nombre completo"],
        ["Nacionalidade", "Nationality", "Nacionalidad"],
        ["Data de nascimento", "Date of birth", "Fecha de nacimiento"],
        ["Número da CRNM", "CRNM number", "Número de la CRNM"],
        ["Categoria da residência", "Residence category", "Categoría de residencia"],
        ["Data de emissão", "Issue date", "Fecha de emisión"],
        ["Data de validade", "Expiration date", "Fecha de vencimiento"],
        ["Foto", "Photo", "Foto"]
      ],

      validade: [
        "Variável conforme o tipo de residência (geralmente 1 a 10 anos)",
        "Varies depending on residence type (usually 1 to 10 years)",
        "Varía según el tipo de residencia (generalmente de 1 a 10 años)"
      ],

      usoComum: [
        ["Identificação oficial de imigrantes", "Official ID for immigrants", "Identificación oficial de inmigrantes"],
        ["Acesso a serviços públicos", "Access to public services", "Acceso a servicios públicos"],
        ["Regularização migratória no Brasil", "Migration regularization in Brazil", "Regularización migratoria en Brasil"],
        ["Cadastro em instituições públicas e privadas", "Registration in public and private institutions", "Registro en instituciones públicas y privadas"]
      ],

      requisitos: [
        ["Protocolo de solicitação ou visto válido", "Application protocol or valid visa", "Protocolo de solicitud o visa válida"],
        ["Passaporte válido", "Valid passport", "Pasaporte válido"],
        ["Comprovante de residência", "Proof of residence", "Comprobante de domicilio"],
        ["Fotos recentes 3x4", "Recent 3x4 photos", "Fotos 3x4 recientes"],
        ["Documentos específicos conforme o tipo de residência", "Specific documents depending on residence type", "Documentos específicos según el tipo de residencia"]
      ],

      imagem: require('./img/crnm.png'),

      local: ["policiaFederal"]
    },
    RG: {
      nome: ["Registro Geral", "General Registry", "Registro General"],
      descricao: [
        "Documento de identidade emitido pelos órgãos de segurança pública estaduais.",
        "Identity document issued by state public security agencies.",
        "Documento de identidad emitido por los organismos de seguridad pública estatales."
      ],
      camposPrincipais: [
        ["Nome completo", "Full name", "Nombre completo"],
        ["Data de nascimento", "Date of birth", "Fecha de nacimiento"],
        ["Número do RG", "RG number", "Número de RG"],
        ["Órgão emissor", "Issuing agency", "Órgano emisor"],
        ["Data de emissão", "Issue date", "Fecha de emisión"],
        ["Filiação", "Parentage", "Filiación"],
        ["Foto", "Photo", "Foto"]
      ],
      validade: ["Indeterminada", "Indeterminate", "Indeterminada"],
      usoComum: [
        ["Identificação pessoal", "Personal identification", "Identificación personal"],
        ["Abertura de conta", "Bank account opening", "Apertura de cuenta"],
        ["Concursos públicos", "Public tenders", "Concursos públicos"],
        ["Comprovação de identidade em órgãos públicos", "Identity verification at public agencies", "Comprobación de identidad en organismos públicos"]
      ],
      requisitos: [
        ["Certidão de nascimento ou casamento", "Birth or marriage certificate", "Certificado de nacimiento o matrimonio"],
        ["Comprovante de residência", "Proof of residence", "Comprobante de domicilio"],
        ["1 foto 3x4 recente", "1 recent 3x4 photo", "1 foto 3x4 reciente"]
      ],
      imagem: { uri: "https://classic.exame.com/wp-content/uploads/2024/06/Carteira-de-Identidade-Nacional.jpeg" },
      local: ['poupaTempo', 'cartorioCivil']
    },

    CPF: {
      nome: ["Cadastro de Pessoas Físicas", "Individual Taxpayer Registry", "Registro de Personas Físicas"],
      descricao: [
        "Número de identificação fiscal emitido pela Receita Federal do Brasil.",
        "Tax identification number issued by the Brazilian Federal Revenue.",
        "Número de identificación fiscal emitido por la Receita Federal de Brasil."
      ],
      camposPrincipais: [
        ["Nome completo", "Full name", "Nombre completo"],
        ["Data de nascimento", "Date of birth", "Fecha de nacimiento"],
        ["Número do CPF", "CPF number", "Número de CPF"],
        ["Nome da mãe", "Mother's name", "Nombre de la madre"]
      ],
      validade: ["Indeterminada", "Indeterminate", "Indeterminada"],
      usoComum: [
        ["Declaração de Imposto de Renda", "Income tax declaration", "Declaración de impuestos"],
        ["Abertura de conta bancária", "Opening bank accounts", "Apertura de cuentas bancarias"],
        ["Contratos e compras", "Contracts and purchases", "Contratos y compras"]
      ],
      requisitos: [
        ["Documento de identidade oficial com foto", "Official photo ID", "Documento de identidad oficial con foto"],
        ["Título de eleitor (se aplicável)", "Voter ID (if applicable)", "Título de elector (si aplica)"],
        ["Comprovante de residência", "Proof of residence", "Comprobante de domicilio"]
      ],
      imagem: { uri: "https://clubes.obmep.org.br/blog/wp-content/uploads/2023/04/b019.png" },
      local: ['receitaFederal']
    },

    TituloEleitor: {
      nome: ["Título de Eleitor", "Voter Registration Card", "Título de Elector"],
      descricao: [
        "Documento que comprova o alistamento eleitoral e a regularidade com a Justiça Eleitoral.",
        "Document proving electoral registration and compliance with the Electoral Court.",
        "Documento que acredita la inscripción electoral y la regularidad con la Justicia Electoral."
      ],
      camposPrincipais: [
        ["Nome completo", "Full name", "Nombre completo"],
        ["Data de nascimento", "Date of birth", "Fecha de nacimiento"],
        ["Número do título", "Card number", "Número de título"],
        ["Zona eleitoral", "Electoral zone", "Zona electoral"],
        ["Seção eleitoral", "Electoral section", "Sección electoral"]
      ],
      validade: [
        "Indeterminada, mas deve ser atualizada a cada mudança de endereço ou situação eleitoral",
        "Indeterminate, but must be updated whenever there’s a change of address or electoral situation",
        "Indeterminada, pero debe actualizarse con cada cambio de dirección o situación electoral"
      ],
      usoComum: [
        ["Votação em eleições", "Voting in elections", "Votación en elecciones"],
        ["Comprovação de quitação eleitoral", "Proof of electoral compliance", "Comprobante de cumplimiento electoral"]
      ],
      requisitos: [
        ["Documento de identidade com foto", "Photo ID", "Documento de identidad con foto"],
        ["Comprovante de residência recente", "Recent proof of residence", "Comprobante de domicilio reciente"],
        ["Idade mínima de 16 anos", "Minimum age of 16", "Edad mínima de 16 años"]
      ],
      imagem: { uri: "https://www.tre-rs.jus.br/institucional/memorial-da-justica-eleitoral-gaucha/acervo-titulos-eleitorais-na-historia/acervo-titulos-eleitorais-na-historia/titulo-de-eleitor-1986/@@display-file/image/T%C3%ADtulo%20Eleitoral%20-%20atual.jpg" },
      local: ['zonaEleitoral']
    }
  },

  veiculos: {
    CNH: {
      nome: ["Carteira Nacional de Habilitação", "Driver’s License", "Licencia de Conducir"],
      descricao: [
        "Documento que autoriza a condução de veículos automotores.",
        "Document that authorizes driving motor vehicles.",
        "Documento que autoriza la conducción de vehículos automotores."
      ],
      camposPrincipais: [
        ["Nome completo", "Full name", "Nombre completo"],
        ["Data de nascimento", "Date of birth", "Fecha de nacimiento"],
        ["Número da CNH", "License number", "Número de licencia"],
        ["Categoria", "Category", "Categoría"],
        ["Data de emissão", "Issue date", "Fecha de emisión"],
        ["Data de validade", "Expiration date", "Fecha de vencimiento"],
        ["Foto", "Photo", "Foto"]
      ],
      validade: [
        "Varia conforme a idade do condutor (geralmente 5 anos)",
        "Varies according to driver's age (usually 5 years)",
        "Varía según la edad del conductor (generalmente 5 años)"
      ],
      usoComum: [
        ["Condução de veículos automotores", "Driving motor vehicles", "Conducción de vehículos automotores"],
        ["Identificação pessoal em situações relacionadas ao trânsito", "Personal ID in traffic situations", "Identificación personal en situaciones de tránsito"]
      ],
      requisitos: [
        ["Ter no mínimo 18 anos de idade", "Be at least 18 years old", "Tener al menos 18 años"],
        ["Documento de identidade com foto", "Photo ID", "Documento de identidad con foto"],
        ["Comprovante de residência", "Proof of residence", "Comprobante de domicilio"],
        ["Cadastro de CPF", "CPF registration", "Registro de CPF"],
        ["Aprovação em exames médico, psicotécnico e teórico/prático", "Pass medical, psychological and theory/practical exams", "Aprobar exámenes médicos, psicológicos y teóricos/prácticos"]
      ],
      imagem: { uri: "https://conteudo.imguol.com.br/c/entretenimento/ae/2022/06/03/nova-cnh-2022-1654284075548_v2_900x506.jpg" },
      local: ['detran', 'cfc']
    }
  },

  transporteP: {
    BilheteUnico: {
      nome: ["Bilhete Único", "Bilhete Único (Transport Card)", "Bilhete Único (Tarjeta de transporte)"],
      descricao: [
        "Cartão utilizado para o pagamento de tarifas de transporte público em várias cidades brasileiras.",
        "Card used to pay for public transport fares in several Brazilian cities.",
        "Tarjeta utilizada para pagar tarifas de transporte público en varias ciudades brasileñas."
      ],
      camposPrincipais: [
        ["Nome completo", "Full name", "Nombre completo"],
        ["Número do cartão", "Card number", "Número de tarjeta"],
        ["Foto (opcional)", "Photo (optional)", "Foto (opcional)"]
      ],
      validade: [
        "Indeterminada, mas o cartão pode ser recarregado conforme necessário",
        "Indeterminate, but the card can be recharged as needed",
        "Indeterminada, pero la tarjeta se puede recargar según sea necesario"
      ],
      usoComum: [
        ["Pagamento de tarifas em ônibus, metrôs e trens", "Paying fares on buses, subways and trains", "Pago de tarifas en autobuses, metros y trenes"],
        ["Acesso a benefícios tarifários", "Access to fare benefits", "Acceso a beneficios tarifarios"]
      ],
      requisitos: [
        ["Documento de identidade com foto", "Photo ID", "Documento de identidad con foto"],
        ["Comprovante de residência", "Proof of residence", "Comprobante de domicilio"],
        ["Preenchimento de formulário de cadastro", "Completion of registration form", "Completar formulario de registro"]
      ],
      imagem: require('./img/bilhete.png'),
      local: ['spTrans', 'poupaTempo'],
      tipos: [
        {
          tipo: ["Comum", "Regular", "Común"],
          descricao: [
            "Para uso geral, sem benefícios tarifários.",
            "For general use, without fare benefits.",
            "Para uso general, sin beneficios tarifarios."
          ],
          imagem: require('./img/bilhete.png'),
        },
        {
          tipo: ["Estudante", "Student", "Estudiante"],
          descricao: [
            "Desconto para estudantes regularmente matriculados.",
            "Discount for regularly enrolled students.",
            "Descuento para estudiantes matriculados regularmente."
          ],
          imagem: require('./img/bilheteEst.png'),
        },
        {
          tipo: ["Idoso", "Senior", "Anciano"],
          descricao: [
            "Desconto para pessoas com 60 anos ou mais.",
            "Discount for people aged 60 or older.",
            "Descuento para personas de 60 años o más."
          ],
          imagem: require('./img/bilheteIdo.png'),
        },
        {
          tipo: ["Pessoa com Deficiência", "Person with Disability", "Persona con Discapacidad"],
          descricao: [
            "Desconto para pessoas com deficiência.",
            "Discount for people with disabilities.",
            "Descuento para personas con discapacidad."
          ],
          imagem: require('./img/bilhetePCD.png'),
        }
      ]
    }
  },
  saude: {
    SUSCard: {
      nome: ["Cartão do SUS", "SUS Card", "Tarjeta del SUS"],
      descricao: [
        "Documento que comprova o cadastro no Sistema Único de Saúde (SUS) e permite o acesso aos serviços de saúde pública no Brasil.",
        "Document that proves registration in the Unified Health System (SUS) and allows access to public health services in Brazil.",
        "Documento que acredita la inscripción en el Sistema Único de Salud (SUS) y permite el acceso a los servicios de salud pública en Brasil."
      ],
      camposPrincipais: [
        ["Nome completo", "Full name", "Nombre completo"],
        ["Data de nascimento", "Date of birth", "Fecha de nacimiento"],
        ["Número do Cartão do SUS", "SUS Card number", "Número de la Tarjeta del SUS"],
        ["Nome da mãe", "Mother's name", "Nombre de la madre"]
      ],
      validade: ["Indeterminada", "Indeterminate", "Indeterminada"],
      usoComum: [
        ["Acesso a serviços de saúde pública", "Access to public health services", "Acceso a servicios de salud pública"],
        ["Registro de atendimentos médicos", "Record of medical care", "Registro de atenciones médicas"]
      ],
      requisitos: [
        ["Documento de identidade com foto", "Photo ID", "Documento de identidad con foto"],
        ["Comprovante de residência", "Proof of residence", "Comprobante de domicilio"],
        ["Certidão de nascimento ou casamento", "Birth or marriage certificate", "Certificado de nacimiento o matrimonio"]
      ],
      imagem: require('./img/sus.png'),
      local: ['unidadeSaude', 'poupaTempo']
    },

    carteiraPlanoSaude: {
      nome: ["Prontuário Mais", "Prontuário Mais", "Prontuário Mais"],
      descricao: [
        "Documento que identifica o beneficiário de um plano de saúde e permite o acesso a serviços particulares de atendimento médico.",
        "Document that identifies the beneficiary of a health plan and allows access to private medical services.",
        "Documento que identifica al beneficiario de un plan de salud y permite el acceso a servicios médicos privados."
      ],
      camposPrincipais: [
        ["Nome do titular", "Holder’s name", "Nombre del titular"],
        ["Número do plano", "Plan number", "Número del plan"],
        ["Validade", "Validity", "Validez"],
        ["Nome da operadora", "Operator name", "Nombre de la operadora"]
      ],
      validade: ["Indeterminada", "Indeterminate", "Indeterminada"],
      usoComum: [
        ["Atendimento médico em clínicas e hospitais conveniados", "Medical care at affiliated clinics and hospitals", "Atención médica en clínicas y hospitales afiliados"],
        ["Compra de medicamentos com desconto", "Purchase of discounted medicines", "Compra de medicamentos con descuento"]
      ],
      imagem: require('./img/pront.png'),

    },
  }

};

export default dados;
