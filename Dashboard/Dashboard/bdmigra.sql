-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/09/2025 às 22:43
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bdmigra`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_08_21_164629_create_tb_adm_table', 1),
(6, '2025_08_21_165649_create_tb_ong_table', 1),
(7, '2025_08_21_165953_create_tb_campanha_table', 1),
(8, '2025_08_21_170616_create_tb_negado_ong_table', 1),
(9, '2025_08_21_170938_create_tb_aprovado_ong_table', 1),
(10, '2025_08_21_172123_create_tb_noticia_table', 1),
(11, '2025_08_21_172736_create_tb_lei_table', 1),
(12, '2025_08_21_174359_create_tb_direitos_table', 1),
(13, '2025_08_21_174623_create_tb_deveres_table', 1),
(14, '2025_08_21_174927_create_tb_cartilha_table', 1),
(15, '2025_08_21_175216_create_tb_pais_table', 1),
(16, '2025_09_02_022010_altertb_noticia', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_adm`
--

CREATE TABLE `tb_adm` (
  `idAdm` bigint(20) UNSIGNED NOT NULL,
  `nomeAdm` varchar(255) DEFAULT NULL,
  `nasciAdm` date DEFAULT NULL,
  `cpfAdm` varchar(14) DEFAULT NULL,
  `emailAdm` varchar(255) DEFAULT NULL,
  `telAdm` varchar(30) DEFAULT NULL,
  `senhaAdm` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `imgAdm` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_aprovado_ong`
--

CREATE TABLE `tb_aprovado_ong` (
  `idAprovadoOng` bigint(20) UNSIGNED NOT NULL,
  `idOng` bigint(20) UNSIGNED NOT NULL,
  `idAdm` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_campanha`
--

CREATE TABLE `tb_campanha` (
  `idCampanha` bigint(20) UNSIGNED NOT NULL,
  `tituloCampanha` varchar(255) DEFAULT NULL,
  `descriCampanha` varchar(255) DEFAULT NULL,
  `cartazCampanha` varchar(255) DEFAULT NULL,
  `linkCampanha` varchar(255) DEFAULT NULL,
  `idOng` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_cartilha`
--

CREATE TABLE `tb_cartilha` (
  `idCartilha` bigint(20) UNSIGNED NOT NULL,
  `tituloCartilha` varchar(255) DEFAULT NULL,
  `descriCartilha` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_deveres`
--

CREATE TABLE `tb_deveres` (
  `idDeveres` bigint(20) UNSIGNED NOT NULL,
  `tituloDeveres` varchar(255) DEFAULT NULL,
  `textoDeveres` text DEFAULT NULL,
  `idLei` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_direitos`
--

CREATE TABLE `tb_direitos` (
  `idDireito` bigint(20) UNSIGNED NOT NULL,
  `tituloDireito` varchar(255) DEFAULT NULL,
  `textoDireito` text DEFAULT NULL,
  `idLei` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_lei`
--

CREATE TABLE `tb_lei` (
  `idLei` bigint(20) UNSIGNED NOT NULL,
  `numeroLei` varchar(255) DEFAULT NULL,
  `anoLei` int(11) DEFAULT NULL,
  `tituloLei` varchar(255) DEFAULT NULL,
  `descriLei` text DEFAULT NULL,
  `dataPublicacaoLei` date DEFAULT NULL,
  `dataVinciaLei` date DEFAULT NULL,
  `statusLei` varchar(255) DEFAULT NULL,
  `orgaoResponsavelLei` varchar(255) DEFAULT NULL,
  `palavraChaveLei` varchar(255) DEFAULT NULL,
  `arquivoLei` varchar(255) DEFAULT NULL,
  `obsLei` varchar(255) DEFAULT NULL,
  `situacaoLei` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_negado_ong`
--

CREATE TABLE `tb_negado_ong` (
  `idNegadoOng` bigint(20) UNSIGNED NOT NULL,
  `descriNegadoOng` text DEFAULT NULL,
  `idOng` bigint(20) UNSIGNED NOT NULL,
  `idAdm` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_noticia`
--

CREATE TABLE `tb_noticia` (
  `idNoticia` bigint(20) UNSIGNED NOT NULL,
  `tituloNoticia` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tituloNoticia`)),
  `conteudoNoticia` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`conteudoNoticia`)),
  `imgNoticia` varchar(255) DEFAULT NULL,
  `linkNoticia` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`linkNoticia`)),
  `idOng` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `statusNoticia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `tb_noticia`
--

INSERT INTO `tb_noticia` (`idNoticia`, `tituloNoticia`, `conteudoNoticia`, `imgNoticia`, `linkNoticia`, `idOng`, `created_at`, `updated_at`, `statusNoticia`) VALUES
(1, '[\"Migrações: Rússia detém 300 suspeitos de migração ilegal\", \"Migration: Russia holds 300 suspects of illegal migration\", \"Migración: Rusia posee 300 sospechosos de migración ilegal\"]', '[\"\\\"Cerca de 300 pessoas foram detidas por suspeita de violar as leis de imigração e levadas para a esquadra\\\", disse uma fonte citada pela agência.\", \"\\\"About 300 people were arrested on suspicion of violating immigration laws and taken to the squad,\\\" a source cited by the agency said.\", \"\\\"Unas 300 personas fueron arrestadas bajo sospecha de violar las leyes de inmigración y llevadas al equipo\\\", dijo una fuente citada por la agencia.\"]', 'https://media-manager.noticiasaominuto.com/1280/naom_6891eda6eeaab.webp?crop_params=eyJsYW5kc2NhcGUiOnsiY3JvcFdpZHRoIjoyMDQ4LCJjcm9wSGVpZ2h0IjoxMTUyLCJjcm9wWCI6MCwiY3JvcFkiOjI4OX19', '[\"https://www.noticiasaominuto.com/mundo/2833140/migracoes-russia-detem-300-suspeitos-de-migracao-ilegal\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.noticiasaominuto.com%2Fmundo%2F2833140%2Fmigracoes-russia-detem-300-suspeitos-de-migracao-ilegal\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.noticiasaominuto.com%2Fmundo%2F2833140%2Fmigracoes-russia-detem-300-suspeitos-de-migracao-ilegal\"]', 1, '2025-09-02 20:00:13', '2025-09-02 20:00:13', 'analise'),
(2, '[\"UE defende Mercosul com concessão para França\", \"EU defends Mercosur with concession to France\", \"UE defiende a Mercosur con concesión a Francia\"]', '[\"Acordo deve permitir que a União Europeia exporte mais carros, máquinas e bebidas alcoólicas para Argentina, Brasil, Uruguai e Paraguai\", \"Agreement should allow the European Union to export more cars, machines and alcoholic beverages for Argentina, Brazil, Uruguay and Paraguay\", \"El acuerdo debería permitir que la Unión Europea exporte más automóviles, máquinas y bebidas alcohólicas para Argentina, Brasil, Uruguay y Paraguay\"]', 'https://odia.ig.com.br/_midias/jpg/2024/11/18/1200x750/1_000_36mp9fm-34625234.jpg', '[\"https://odia.ig.com.br/economia/2025/09/7121779-ue-defende-mercosul-com-concessao-para-franca.html\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fodia.ig.com.br%2Feconomia%2F2025%2F09%2F7121779-ue-defende-mercosul-com-concessao-para-franca.html\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fodia.ig.com.br%2Feconomia%2F2025%2F09%2F7121779-ue-defende-mercosul-com-concessao-para-franca.html\"]', 1, '2025-09-02 20:10:15', '2025-09-02 20:10:15', 'analise'),
(3, '[\"Governo Trump suspende emissão de vistos para caminhoneiros e decisão pode afetar trabalhadores brasileiros\", \"Trump administration suspends issuance of visas for truckers and decision may affect Brazilian workers\", \"La administración Trump suspende la emisión de visas para camioneros y la decisión puede afectar a los trabajadores brasileños\"]', '[\"Estimativa é de que quase a metade dos caminhoneiros nos EUA seja formada por imigrantes\", \"It is estimated that almost half of truckers in the US are formed by immigrants\", \"Se estima que casi la mitad de los camioneros en los Estados Unidos están formados por inmigrantes\"]', 'https://cdn.brasil247.com/pb-b247gcp/swp/jtjeq9/media/20250205200240_81f3a64334df5c954bb70431ea079d0e5f64259cf17b1e469897047b1f639b0d.jpg', '[\"https://www.brasil247.com/mundo/governo-trump-suspende-emissao-de-vistos-para-caminhoneiros-e-decisao-pode-afetar-trabalhadores-brasileiros\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.brasil247.com%2Fmundo%2Fgoverno-trump-suspende-emissao-de-vistos-para-caminhoneiros-e-decisao-pode-afetar-trabalhadores-brasileiros\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.brasil247.com%2Fmundo%2Fgoverno-trump-suspende-emissao-de-vistos-para-caminhoneiros-e-decisao-pode-afetar-trabalhadores-brasileiros\"]', 1, '2025-09-02 20:20:14', '2025-09-02 20:20:14', 'analise'),
(4, '[\"Feijóo diz que Ceuta merece uma política fiscal, de saúde e migratória \\\"no auge\\\"\", \"Feijóo says that Ceuta deserves a fiscal, health and migratory policy \\\"at the height\\\"\", \"Feijóo dice que Ceuta merece una política fiscal, sanitaria y migratoria \\\"a la altura\\\"\"]', '[\"O presidente do PP, Alberto Núñez Feijóo, comemorou na terça -feira o dia do CEUTA, garantindo que o ...\", \"The president of the PP, Alberto Núñez Feijóo, celebrated on Tuesday Ceuta\'s day ensuring that the ...\", \"El presidente del PP, Alberto Núñez Feijóo, ha celebrado este martes el día de Ceuta asegurando que la...\"]', 'https://img.europapress.es/fotoweb/fotonoticia_20250902093340_1200.jpg', '[\"https://translate.google.com/translate?hl=pt&sl=auto&tl=pt&u=https%3A%2F%2Fwww.europapress.es%2Fnacional%2Fnoticia-feijoo-dice-ceuta-merece-politica-fiscal-sanitaria-migratoria-altura-20250902093340.html\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.europapress.es%2Fnacional%2Fnoticia-feijoo-dice-ceuta-merece-politica-fiscal-sanitaria-migratoria-altura-20250902093340.html\", \"https://www.europapress.es/nacional/noticia-feijoo-dice-ceuta-merece-politica-fiscal-sanitaria-migratoria-altura-20250902093340.html\"]', 1, '2025-09-02 20:40:14', '2025-09-02 20:40:14', 'analise'),
(5, '[\"Cantor morre em acidente registrado em Venda Nova do Imigrante\", \"Singer dies in an accident registered in Venda Nova do Imigrante\", \"El cantante muere en un accidente registrado en Venda Nova do Imigrante\"]', '[\"A colisão entre um caminhão e um carro resultou na morte do cantor Solymar, da banda Solymar Country. Saiba detalhes.\", \"The collision between a truck and a car resulted in the death of Solymar Country singer Solrymar. Learn details.\", \"La colisión entre un camión y un automóvil resultó en la muerte del cantante de country Solymar Solymar. Aprender detalles.\"]', 'https://uploads.folhavitoria.com.br/2025/09/acidente-com-cantor-solymar-.jpg', '[\"https://www.folhavitoria.com.br/transito/cantor-morre-em-acidente-na-br-262-em-venda-nova-do-imigrante/\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.folhavitoria.com.br%2Ftransito%2Fcantor-morre-em-acidente-na-br-262-em-venda-nova-do-imigrante%2F\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.folhavitoria.com.br%2Ftransito%2Fcantor-morre-em-acidente-na-br-262-em-venda-nova-do-imigrante%2F\"]', 1, '2025-09-03 00:43:52', '2025-09-03 00:43:52', 'analise'),
(6, '[\"Cantor morre em acidente registrado em Venda Nova do Imigrante\", \"Singer dies in an accident registered in Venda Nova do Imigrante\", \"El cantante muere en un accidente registrado en Venda Nova do Imigrante\"]', '[\"Segundo informações do Corpo de Bombeiros, testemunhas narraram para a equipe que o condutor do carro foi cruzar a rodovia quando o caminhão de cor branca, que estava com a carroceria vazia, colidiu com a lateral do veículo.\\nUm cantor , identificado ... [1006 chars]\", \"According to information from the Fire Department, witnesses narrated to the team that the driver of the car went to cross the highway when the white truck, which had the empty body, collided with the side of the vehicle. A singer, identified ... [1006 Chars]\", \"Según la información del departamento de bomberos, los testigos narraron al equipo que el conductor del automóvil fue a cruzar la carretera cuando el camión blanco, que tenía el cuerpo vacío, chocó con el costado del vehículo.\\nUn cantante, identificado ... [1006 caracteres]\"]', 'https://uploads.folhavitoria.com.br/2025/09/acidente-com-cantor-solymar-.jpg', '[\"https://www.folhavitoria.com.br/transito/cantor-morre-em-acidente-na-br-262-em-venda-nova-do-imigrante/\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.folhavitoria.com.br%2Ftransito%2Fcantor-morre-em-acidente-na-br-262-em-venda-nova-do-imigrante%2F\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.folhavitoria.com.br%2Ftransito%2Fcantor-morre-em-acidente-na-br-262-em-venda-nova-do-imigrante%2F\"]', 1, '2025-09-03 00:47:23', '2025-09-03 00:47:23', 'analise'),
(7, '[\"Imigração dos EUA terá acesso a software israelense que hackeia celulares\", \"US immigration will have access to Israeli software that hacke cell phones\", \"La inmigración de los Estados Unidos tendrá acceso al software israelí que Haceke celular\"]', '[\"O departamento de imigração dos EUA terá acesso a um programa de origem israelense que rastreia celulares e hackeia aplicativos criptografados.\\nO que aconteceu\\nContrato de US$ 2 milhões com a Paragon Solutions foi assinado no ano passado, mas esbarro... [433 chars]\", \"The US Immigration Department will have access to an Israeli program that tracks cell phones and hacked encrypted applications. What happened A $ 2 million contract with Paragon Solutions was signed last year, but I bump into ... [433 chars]\", \"El Departamento de Inmigración de los Estados Unidos tendrá acceso a un programa israelí que rastrea los teléfonos celulares y pirateó aplicaciones cifradas.\\nQué pasó\\nEl año pasado se firmó un contrato de $ 2 millones con Paragon Solutions, pero me encuentro con ... [433 chars]\"]', 'https://conteudo.imguol.com.br/c/noticias/30/2023/05/03/homem-fazia-publicacoes-pornograficas-da-ex-namorada-e-da-ex-cunhada-desde-2021-segundo-a-policia-1683125053034_v2_615x300.jpg', '[\"https://www.uol.com.br/tilt/noticias/redacao/2025/09/02/eua-programa-espiao.htm\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.uol.com.br%2Ftilt%2Fnoticias%2Fredacao%2F2025%2F09%2F02%2Feua-programa-espiao.htm\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.uol.com.br%2Ftilt%2Fnoticias%2Fredacao%2F2025%2F09%2F02%2Feua-programa-espiao.htm\"]', 1, '2025-09-03 00:50:14', '2025-09-03 00:50:14', 'analise'),
(8, '[\"Migrações: Rússia detém 300 suspeitos de migração ilegal\", \"Migration: Russia holds 300 suspects of illegal migration\", \"Migración: Rusia posee 300 sospechosos de migración ilegal\"]', '[\"© Andrey Rudakov/Bloomberg via Getty Images\\nAs forças de segurança russas detiveram 300 pessoas suspeitas de imigração ilegal num abrigo no centro de Moscovo, noticiou hoje a agência estatal russa TASS.\\n\\\"Cerca de 300 pessoas foram detidas por suspeit... [1591 chars]\", \"© Andrey Rudakov/Bloomberg via Getty Images Russian security forces have detained 300 people suspected of illegal immigration in a shelter in the center of Moscow, today reported Russian state agency Tass. \\\"About 300 people were arrested on susit ... [1591 chars]\", \"© Andrey Rudakov/Bloomberg a través de Getty Images\\nLas fuerzas de seguridad rusas han detenido a 300 personas sospechosas de inmigración ilegal en un refugio en el centro de Moscú, informó hoy la agencia estatal rusa Tass.\\n\\\"Unas 300 personas fueron arrestadas en Susit ... [1591 chars]\"]', 'https://media-manager.noticiasaominuto.com/1280/naom_6891eda6eeaab.webp?crop_params=eyJsYW5kc2NhcGUiOnsiY3JvcFdpZHRoIjoyMDQ4LCJjcm9wSGVpZ2h0IjoxMTUyLCJjcm9wWCI6MCwiY3JvcFkiOjI4OX19', '[\"https://www.noticiasaominuto.com/mundo/2833140/migracoes-russia-detem-300-suspeitos-de-migracao-ilegal\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.noticiasaominuto.com%2Fmundo%2F2833140%2Fmigracoes-russia-detem-300-suspeitos-de-migracao-ilegal\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.noticiasaominuto.com%2Fmundo%2F2833140%2Fmigracoes-russia-detem-300-suspeitos-de-migracao-ilegal\"]', 1, '2025-09-03 01:00:11', '2025-09-03 01:00:11', 'analise'),
(9, '[\"Acordo Mercosul-UE deve ser enviado aos 27 países-membros nesta quarta\", \"Mercosur-UE Agreement should be sent to the 27 member countries this Wednesday\", \"El acuerdo de Mercosur-Oe debe enviarse a los 27 países miembros este miércoles\"]', '[\"Essa etapa inclui a finalização da revisão jurídica e a tradução do documento para as 24 línguas oficiais da UE - (crédito: ALEXANDRE LALLEMAND Unsplash )\\nOs 27 países-membros da União Europeia (UE) devem receber nesta quarta-feira (3/9) o texto do a... [1972 chars]\", \"This step includes the completion of the legal review and the translation of the document to the 24 official EU languages ​​- (Credit: Alexandre Lallemand Unsplash) The 27 European Union Member Countries (EU) should receive this Wednesday (3/9) the text of A ... [1972 Chars]\", \"Este paso incluye la finalización de la revisión legal y la traducción del documento a los 24 idiomas oficiales de la UE- (Crédito: Alexandre Lallemand Unsplash)\\nLos 27 países miembros de la Unión Europea (UE) deberían recibir este miércoles (3/9) el texto de A ... [1972 Chars]\"]', 'https://midias.correiobraziliense.com.br/_midias/jpg/2025/06/13/675x450/1_alexandre_lallemand_pcs3mol14sk_unsplash_e1712067196971-53977399.jpg?20250613073549?20250613073549', '[\"https://www.correiobraziliense.com.br/economia/2025/09/7239908-acordo-mercosul-ue-deve-ser-enviado-aos-27-paises-membros-nesta-quarta.html\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.correiobraziliense.com.br%2Feconomia%2F2025%2F09%2F7239908-acordo-mercosul-ue-deve-ser-enviado-aos-27-paises-membros-nesta-quarta.html\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.correiobraziliense.com.br%2Feconomia%2F2025%2F09%2F7239908-acordo-mercosul-ue-deve-ser-enviado-aos-27-paises-membros-nesta-quarta.html\"]', 1, '2025-09-03 01:10:11', '2025-09-03 01:10:11', 'analise'),
(10, '[\"Governo Trump suspende emissão de vistos para caminhoneiros e decisão pode afetar trabalhadores brasileiros\", \"Trump administration suspends issuance of visas for truckers and decision may affect Brazilian workers\", \"La administración Trump suspende la emisión de visas para camioneros y la decisión puede afectar a los trabajadores brasileños\"]', '[\"247 - O governo dos Estados Unidos anunciou nesta quinta-feira (22) a suspensão imediata da emissão de vistos de trabalho para motoristas de caminhão estrangeiros. A decisão, segundo a AFP, foi comunicada pelo secretário de Estado, Marco Rubio, em pu... [2773 chars]\", \"247 - The US government announced on Thursday (22) the immediate suspension of issuing work visas for foreign truck drivers. The decision, according to AFP, was communicated by the Secretary of State, Marco Rubio, in PU ... [2773 Chars]\", \"247 - El gobierno de los Estados Unidos anunció el jueves (22) la suspensión inmediata de emitir visas de trabajo para conductores de camiones extranjeros. La decisión, según AFP, fue comunicada por el Secretario de Estado, Marco Rubio, en PU ... [2773 Chars]\"]', 'https://cdn.brasil247.com/pb-b247gcp/swp/jtjeq9/media/20250205200240_81f3a64334df5c954bb70431ea079d0e5f64259cf17b1e469897047b1f639b0d.jpg', '[\"https://www.brasil247.com/mundo/governo-trump-suspende-emissao-de-vistos-para-caminhoneiros-e-decisao-pode-afetar-trabalhadores-brasileiros\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.brasil247.com%2Fmundo%2Fgoverno-trump-suspende-emissao-de-vistos-para-caminhoneiros-e-decisao-pode-afetar-trabalhadores-brasileiros\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.brasil247.com%2Fmundo%2Fgoverno-trump-suspende-emissao-de-vistos-para-caminhoneiros-e-decisao-pode-afetar-trabalhadores-brasileiros\"]', 1, '2025-09-03 01:20:12', '2025-09-03 01:20:12', 'analise'),
(11, '[\"Juíza norte-americana trava deportação de 10 menores não acompanhados para a Guatemala\", \"North American judge crashes deportation of 10 minors not accompanied to Guatemala\", \"El juez de América del Norte se estrella por deportación de 10 menores que no están acompañados a Guatemala\"]', '[\"Uma juíza federal dos Estados Unidos travou, na madrugada deste domingo, a deportação de menores não acompanhados para a Guatemala. A decisão apanhou alguns dos migrantes já dentro de um avião pronto a descolar do Texas.\\nA ordem de restrição temporár... [970 chars]\", \"A federal judge from the United States waged, at dawn on Sunday, the deportation of minors not accompanied to Guatemala. The decision picked up some of the migrants already inside a plane ready to take off from Texas. The temporary restriction order ... [970 Chars]\", \"Un juez federal de los Estados Unidos libró, al amanecer el domingo, la deportación de menores que no acompañan a Guatemala. La decisión recogió a algunos de los migrantes que ya están dentro de un avión listo para despegar de Texas.\\nLa orden de restricción temporal ... [970 caracteres]\"]', 'https://images.impresa.pt/sicnot/2025-09-01-aviao-forca-aerea-eua-9afa6bcb/1.91x1?wm=true&outputFormat=jpeg', '[\"https://sicnoticias.pt/mundo/2025-09-01-video-juiza-norte-americana-trava-deportacao-de-10-menores-nao-acompanhados-para-a-guatemala-90d09a15\", \"https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fsicnoticias.pt%2Fmundo%2F2025-09-01-video-juiza-norte-americana-trava-deportacao-de-10-menores-nao-acompanhados-para-a-guatemala-90d09a15\", \"https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fsicnoticias.pt%2Fmundo%2F2025-09-01-video-juiza-norte-americana-trava-deportacao-de-10-menores-nao-acompanhados-para-a-guatemala-90d09a15\"]', 1, '2025-09-03 01:40:14', '2025-09-03 01:40:14', 'analise');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_ong`
--

CREATE TABLE `tb_ong` (
  `idOng` bigint(20) UNSIGNED NOT NULL,
  `nomeOng` varchar(255) DEFAULT NULL,
  `servicoOng` varchar(255) DEFAULT NULL,
  `descricaoOng` text DEFAULT NULL,
  `situacaoOng` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `tb_ong`
--

INSERT INTO `tb_ong` (`idOng`, `nomeOng`, `servicoOng`, `descricaoOng`, `situacaoOng`, `created_at`, `updated_at`) VALUES
(1, 'Teste', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_pais`
--

CREATE TABLE `tb_pais` (
  `idPais` bigint(20) UNSIGNED NOT NULL,
  `nomePais` varchar(255) DEFAULT NULL,
  `idiomaPais` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `idUsers` bigint(20) UNSIGNED NOT NULL,
  `nomeUsers` varchar(255) DEFAULT NULL,
  `dataNasciUsers` date DEFAULT NULL,
  `paisOrigemUsers` varchar(255) DEFAULT NULL,
  `statusUsers` varchar(255) DEFAULT NULL,
  `condicaoUsers` varchar(255) DEFAULT NULL,
  `emailUsers` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `telefoneUsers` char(30) DEFAULT NULL,
  `crmRneUsers` varchar(255) DEFAULT NULL,
  `cpfUsers` varchar(255) DEFAULT NULL,
  `mercosulUsers` varchar(255) DEFAULT NULL,
  `passaporteUsers` varchar(255) DEFAULT NULL,
  `lograUsers` varchar(255) DEFAULT NULL,
  `numeroUsers` int(11) DEFAULT NULL,
  `cepUsers` char(20) DEFAULT NULL,
  `bairroUsers` varchar(255) DEFAULT NULL,
  `cidadeUsers` varchar(255) DEFAULT NULL,
  `estadoUsers` varchar(255) DEFAULT NULL,
  `senhaUsers` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`idUsers`, `nomeUsers`, `dataNasciUsers`, `paisOrigemUsers`, `statusUsers`, `condicaoUsers`, `emailUsers`, `email_verified_at`, `telefoneUsers`, `crmRneUsers`, `cpfUsers`, `mercosulUsers`, `passaporteUsers`, `lograUsers`, `numeroUsers`, `cepUsers`, `bairroUsers`, `cidadeUsers`, `estadoUsers`, `senhaUsers`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Teste', '2000-01-01', 'Brasil', 'deletado', NULL, 'teste@email.com', NULL, '11999999999', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$8JmzrsNgfHATHf2tE.r7bO9r/SGs5nZswLV1MEQqj7LvxotUA.l1e', NULL, NULL, NULL),
(2, 'Luis Henrique', '1111-11-11', 'gl', 'deletado', NULL, 'luisluis@gmail.com', NULL, '+11 (11) 11111-1111', '222222222', '444.444.444-44', NULL, 'VV555555', 'Rua Planície dos Goitacases', 3, '08451-110', 'Vila Iolanda(Lajeado)', 'São Paulo', 'SP', '$2y$10$PCY1x5kL4xBJjuCiUZ27TeTF4INkJJ8p1Bib4OiPp0dgCQN9.M0cK', NULL, NULL, NULL),
(3, 'Luis', '2009-06-27', 'ao', NULL, NULL, 'luifersa.hh.araujo@gmail.com', NULL, '+55 (11) 39685-6289', NULL, NULL, NULL, NULL, 'Rua Planície dos Goitacases', 58, '08451-110', 'Vila Iolanda(Lajeado)', 'São Paulo', 'SP', '$2y$10$hRyNtJu0WW//E7IzfbvbpOJNZUgEc.v.HByzuCUWI2lVCNxDmDnmm', NULL, NULL, NULL),
(4, 'Teste', '2000-01-01', 'Brasil', NULL, NULL, 'teste222@email.com', NULL, '11889999999', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$1zqXDNsZ8Yb0fMlYf9cfFO.Jct7rgjEoBr3kfirciSiFWD1LBUD2m', NULL, NULL, NULL),
(7, 'luis', '1111-11-11', 'Antártida', 'deletado', NULL, 'luisluiluis@gmail.com', NULL, '+11 (11) 11111-3333', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$xTbS/mNufvJXJmUAQcFP4ebi78JqJo26Gr9TO78de8D55Q8szjyrK', NULL, NULL, NULL),
(9, 'Fernanda', '1958-08-25', 'Alemanha', NULL, NULL, 'fernanda@gmail.com', NULL, '+58 (48) 36695-5695', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$bv5CSVgP6DPtjmX.cH7DvOziuNUJ6I6TvmmZjrwUbSRu0XZAR97tW', NULL, NULL, NULL),
(11, 'Pamela', '1111-11-11', 'Antártida', NULL, NULL, 'pamela@gmail.com', NULL, '+11 (11) 11111-2346', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$IDyOX6wZCDz2.24gjWmTI.bgj1.vHrTgWszXgB743csOEqJDgVrRe', NULL, NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Índices de tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Índices de tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Índices de tabela `tb_adm`
--
ALTER TABLE `tb_adm`
  ADD PRIMARY KEY (`idAdm`),
  ADD UNIQUE KEY `tb_adm_emailadm_unique` (`emailAdm`),
  ADD UNIQUE KEY `tb_adm_telefoneadm_unique` (`telAdm`);

--
-- Índices de tabela `tb_aprovado_ong`
--
ALTER TABLE `tb_aprovado_ong`
  ADD PRIMARY KEY (`idAprovadoOng`),
  ADD KEY `tb_aprovado_ong_idong_foreign` (`idOng`),
  ADD KEY `tb_aprovado_ong_idadm_foreign` (`idAdm`);

--
-- Índices de tabela `tb_campanha`
--
ALTER TABLE `tb_campanha`
  ADD PRIMARY KEY (`idCampanha`),
  ADD KEY `tb_campanha_idong_foreign` (`idOng`);

--
-- Índices de tabela `tb_cartilha`
--
ALTER TABLE `tb_cartilha`
  ADD PRIMARY KEY (`idCartilha`);

--
-- Índices de tabela `tb_deveres`
--
ALTER TABLE `tb_deveres`
  ADD PRIMARY KEY (`idDeveres`),
  ADD KEY `tb_deveres_idlei_foreign` (`idLei`);

--
-- Índices de tabela `tb_direitos`
--
ALTER TABLE `tb_direitos`
  ADD PRIMARY KEY (`idDireito`),
  ADD KEY `tb_direitos_idlei_foreign` (`idLei`);

--
-- Índices de tabela `tb_lei`
--
ALTER TABLE `tb_lei`
  ADD PRIMARY KEY (`idLei`);

--
-- Índices de tabela `tb_negado_ong`
--
ALTER TABLE `tb_negado_ong`
  ADD PRIMARY KEY (`idNegadoOng`),
  ADD KEY `tb_negado_ong_idong_foreign` (`idOng`),
  ADD KEY `tb_negado_ong_idadm_foreign` (`idAdm`);

--
-- Índices de tabela `tb_noticia`
--
ALTER TABLE `tb_noticia`
  ADD PRIMARY KEY (`idNoticia`),
  ADD KEY `tb_noticia_idong_foreign` (`idOng`);

--
-- Índices de tabela `tb_ong`
--
ALTER TABLE `tb_ong`
  ADD PRIMARY KEY (`idOng`);

--
-- Índices de tabela `tb_pais`
--
ALTER TABLE `tb_pais`
  ADD PRIMARY KEY (`idPais`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUsers`),
  ADD UNIQUE KEY `users_emailusers_unique` (`emailUsers`),
  ADD UNIQUE KEY `users_telefoneusers_unique` (`telefoneUsers`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_adm`
--
ALTER TABLE `tb_adm`
  MODIFY `idAdm` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_aprovado_ong`
--
ALTER TABLE `tb_aprovado_ong`
  MODIFY `idAprovadoOng` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_campanha`
--
ALTER TABLE `tb_campanha`
  MODIFY `idCampanha` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_cartilha`
--
ALTER TABLE `tb_cartilha`
  MODIFY `idCartilha` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_deveres`
--
ALTER TABLE `tb_deveres`
  MODIFY `idDeveres` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_direitos`
--
ALTER TABLE `tb_direitos`
  MODIFY `idDireito` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_lei`
--
ALTER TABLE `tb_lei`
  MODIFY `idLei` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_negado_ong`
--
ALTER TABLE `tb_negado_ong`
  MODIFY `idNegadoOng` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_noticia`
--
ALTER TABLE `tb_noticia`
  MODIFY `idNoticia` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `tb_ong`
--
ALTER TABLE `tb_ong`
  MODIFY `idOng` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_pais`
--
ALTER TABLE `tb_pais`
  MODIFY `idPais` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `idUsers` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tb_aprovado_ong`
--
ALTER TABLE `tb_aprovado_ong`
  ADD CONSTRAINT `tb_aprovado_ong_idadm_foreign` FOREIGN KEY (`idAdm`) REFERENCES `tb_adm` (`idAdm`) ON DELETE CASCADE,
  ADD CONSTRAINT `tb_aprovado_ong_idong_foreign` FOREIGN KEY (`idOng`) REFERENCES `tb_ong` (`idOng`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tb_campanha`
--
ALTER TABLE `tb_campanha`
  ADD CONSTRAINT `tb_campanha_idong_foreign` FOREIGN KEY (`idOng`) REFERENCES `tb_ong` (`idOng`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tb_deveres`
--
ALTER TABLE `tb_deveres`
  ADD CONSTRAINT `tb_deveres_idlei_foreign` FOREIGN KEY (`idLei`) REFERENCES `tb_lei` (`idLei`);

--
-- Restrições para tabelas `tb_direitos`
--
ALTER TABLE `tb_direitos`
  ADD CONSTRAINT `tb_direitos_idlei_foreign` FOREIGN KEY (`idLei`) REFERENCES `tb_lei` (`idLei`);

--
-- Restrições para tabelas `tb_negado_ong`
--
ALTER TABLE `tb_negado_ong`
  ADD CONSTRAINT `tb_negado_ong_idadm_foreign` FOREIGN KEY (`idAdm`) REFERENCES `tb_adm` (`idAdm`) ON DELETE CASCADE,
  ADD CONSTRAINT `tb_negado_ong_idong_foreign` FOREIGN KEY (`idOng`) REFERENCES `tb_ong` (`idOng`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tb_noticia`
--
ALTER TABLE `tb_noticia`
  ADD CONSTRAINT `tb_noticia_idong_foreign` FOREIGN KEY (`idOng`) REFERENCES `tb_ong` (`idOng`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
