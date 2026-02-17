<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_noticia', function (Blueprint $table) {
            $table->id('idNoticia');
            $table->json('tituloNoticia')->nullable();
            $table->json('conteudoNoticia')->nullable();
            $table->string('imgNoticia')->nullable();
            $table->json('linkNoticia')->nullable();
            $table->string('StatusNoticia')->nullable();
            $table->boolean('vistoNoticia')->default(0);
            $table->timestamps();
        });

        // Insert das notícias
        $this->insertNoticias();
    }

    /**
     * Insert das notícias
     */
    private function insertNoticias(): void
    {
        $noticias = [
            [
                'tituloNoticia' => json_encode(['Ativistas bielorrussas pedem ao Governo português soluções para imigrantes após alterações legais', 'Belarusian activists ask the Portuguese Government for solutions for immigrants after legal changes', 'Activistas bielorrusos piden al Gobierno portugués soluciones para los inmigrantes tras los cambios legales']),
                'conteudoNoticia' => json_encode(['Empresária Tania Marinich e líder da oposição bielorrussa e ativista dos direitos humanos, Sviatlana Tsikhanouskaya, discursaram no Web Summit.', 'Businesswoman Tania Marinich and Belarusian opposition leader and human rights activist Sviatlana Tsikhanouskaya spoke at the Web Summit.', 'En la Cumbre Web hablaron la empresaria Tania Marinich y la líder de la oposición bielorrusa y activista de derechos humanos Sviatlana Tsikhanouskaya.']),
                'imgNoticia' => 'https://cdn.cmjornal.pt/images/2025-11/img_1280x721uu2025-11-11-18-03-20-2247535.jpg',
                'linkNoticia' => json_encode(['https://www.cmjornal.pt/mundo/detalhe/ativistas-bielorrussas-pedem-ao-governo-portugues-solucoes-para-imigrantes-apos-alteracoes-legais', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.cmjornal.pt%2Fmundo%2Fdetalhe%2Fativistas-bielorrussas-pedem-ao-governo-portugues-solucoes-para-imigrantes-apos-alteracoes-legais', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.cmjornal.pt%2Fmundo%2Fdetalhe%2Fativistas-bielorrussas-pedem-ao-governo-portugues-solucoes-para-imigrantes-apos-alteracoes-legais']),
                'StatusNoticia' => 'ativa',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:40:13',
                'updated_at' => '2025-11-13 00:40:13',
            ],
            [
                'tituloNoticia' => json_encode(['Acórdão de alegada exploração de imigrantes no Alentejo conhecido em dezembro', 'Judgment of alleged exploitation of immigrants in Alentejo known in December', 'Sentencia por presunta explotación de inmigrantes en Alentejo conocida en diciembre']),
                'conteudoNoticia' => json_encode(['Em causa estão 30 crimes de tráfico de pessoas, crimes de auxílio à imigração ilegal, associação criminosa de auxílio à imigração ilegal e branqueamento de capitais.', 'At issue are 30 crimes of human trafficking, crimes of aiding illegal immigration, criminal association of aiding illegal immigration and money laundering.', 'Se trata de 30 delitos de trata de personas, delitos de ayuda a la inmigración ilegal, asociación delictiva para ayudar a la inmigración ilegal y blanqueo de capitales.']),
                'imgNoticia' => 'https://cdn.cmjornal.pt/images/2022-02/img_1280x721uu2022-02-23-19-36-24-1126251.jpg',
                'linkNoticia' => json_encode(['https://www.cmjornal.pt/portugal/detalhe/acordao-de-alegada-exploracao-de-imigrantes-no-alentejo-conhecido-em-dezembro', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.cmjornal.pt%2Fportugal%2Fdetalhe%2Facordao-de-alegada-exploracao-de-imigrantes-no-alentejo-conhecido-em-dezembro', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.cmjornal.pt%2Fportugal%2Fdetalhe%2Facordao-de-alegada-exploracao-de-imigrantes-no-alentejo-conhecido-em-dezembro']),
                'StatusNoticia' => 'ativa',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:41:13',
                'updated_at' => '2025-11-13 00:41:13',
            ],
            [
                'tituloNoticia' => json_encode(['"A AIMA se transformou em máquina de moer imigrantes": as queixas contra a agência', '"AIMA has turned into a machine for grinding immigrants": complaints against the agency', '"AIMA se ha convertido en una máquina de triturar inmigrantes": denuncias contra la agencia']),
                'conteudoNoticia' => json_encode(['Em relatos ao PÚBLICO Brasil, imigrantes vão do inconformismo ao medo e desespero diante das dificuldades que enfrentam para regularizar a documentação em Portugal.', 'In reports to PÚBLICO Brasil, immigrants range from nonconformity to fear and despair in the face of the difficulties they face in regularizing their documentation in Portugal.', 'En informes a PÚBLICO Brasil, los inmigrantes van desde el inconformismo hasta el miedo y la desesperación ante las dificultades que enfrentan para regularizar su documentación en Portugal.']),
                'imgNoticia' => 'https://imagens.publico.pt/imagens.aspx/2042794?tp=UH&db=IMAGENS&type=JPG&share=1&o=BarraFacebook_Brasil.png',
                'linkNoticia' => json_encode(['https://www.publico.pt/2025/11/04/publico-brasil/noticia/aima-transformou-maquina-moer-imigrantes-queixas-agencia-2153379', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.publico.pt%2F2025%2F11%2F04%2Fpublico-brasil%2Fnoticia%2Faima-transformou-maquina-moer-imigrantes-queixas-agencia-2153379', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.publico.pt%2F2025%2F11%2F04%2Fpublico-brasil%2Fnoticia%2Faima-transformou-maquina-moer-imigrantes-queixas-agencia-2153379']),
                'StatusNoticia' => 'ativa',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:42:15',
                'updated_at' => '2025-11-13 00:42:15',
            ],
            [
                'tituloNoticia' => json_encode(['Cobre, Pinochet, imigração: cinco coisas para saber sobre o Chile antes das eleições', 'Copper, Pinochet, immigration: five things to know about Chile before the elections', 'Cobre, Pinochet, inmigración: cinco cosas que hay que saber sobre Chile antes de las elecciones']),
                'conteudoNoticia' => json_encode(['Veja as principais notícias e manchetes do dia no Brasil e no Mundo. Leia textos e assista a vídeos de Política, Cotidiano, Crimes e mais.', 'See the main news and headlines of the day in Brazil and around the world. Read texts and watch videos on Politics, Daily Life, Crime and more.', 'Vea las principales noticias y titulares del día en Brasil y en todo el mundo. Lea textos y vea videos sobre política, vida cotidiana, crimen y más.']),
                'imgNoticia' => 'https://conteudo.imguol.com.br/c/interacao/facebook/share/noticias-min.png',
                'linkNoticia' => json_encode(['https://noticias.uol.com.br/ultimas-noticias/afp/2025/11/11/cobre-pinochet-imigracao-cinco-coisas-para-saber-sobre-o-chile-antes-das-eleicoes.htm', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fnoticias.uol.com.br%2Fultimas-noticias%2Fafp%2F2025%2F11%2F11%2Fcobre-pinochet-imigracao-cinco-coisas-para-saber-sobre-o-chile-antes-das-eleicoes.htm', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fnoticias.uol.com.br%2Fultimas-noticias%2Fafp%2F2025%2F11%2F11%2Fcobre-pinochet-imigracao-cinco-coisas-para-saber-sobre-o-chile-antes-das-eleicoes.htm']),
                'StatusNoticia' => 'analise',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:43:11',
                'updated_at' => '2025-11-13 00:43:11',
            ],
            [
                'tituloNoticia' => json_encode(['O herdeiro de Sá Carneiro?', 'Sá Carneiro\'s heir?', '¿El heredero de Sá Carneiro?']),
                'conteudoNoticia' => json_encode(['Durante um almoço-debate, esta semana, André Ventura afirmou querer ser o "... herdeiro de Sá Carneiro...". Se esse é o seu desígnio, o seu projecto político de vida, então terá de rever o seu comportamento e a prática do seu partido, no que se refere à verdade, à honestidade e ao rigor com que interagem com os cidadãos, residentes, estrangeiros e apátridas que vivem em Portugal. Sá Carneiro era um democrata. Não era racista, nem xenófobo. É recordado pela sua frontalidade e verdade com que abordava e discutia os principais problemas do país. Era um Senhor. Não é o procedimento a que nos vem habituando André Ventura. Tomou para tema prioritário da sua intervenção política e do seu partido a luta contra a imigração, o mal de todos os males, o apocalipse da Lusitânia. Fá-lo faltando à verdade, confundindo a opinião pública com um discurso sibilino que brota discriminação e incitamento ao ódio e à raiva contra os imigrantes. Usa mitos para convencer a opinião pública que os imigrantes são os causadores das suas desventuras profissionais e sociais. Apregoa, nomeadamente, que estes recebem subsídios estatais logo à sua chegada a Portugal. Falso. Não existem tais apoios, só para os imigrantes em situação legal. Pagam impostos, descontam para a Segurança Social e, por isso, beneficiam de apoios sociais nas mesmas condições e requisitos exigidos aos portugueses. Aqueles contribuem para a Segurança Social, de forma muito significativa, garantindo a sustentabilidade do sistema, incluindo o pagamento das pensões e aposentações dos portugueses. Segundo informações públicas, cerca de um milhão de imigrantes terão descontado, em 2025, montante equivalente a cerca de 17% do valor total, perto dos 3,6 mil milhões de euros. Em 2024, estudos apontam para que os imigrantes tenham contribuído com o quíntuplo do que receberam em apoios sociais. Afirma, ainda, que os imigrantes vêm "roubar o trabalho aos portugueses". Falso. O desemprego em Portugal atinge mínimos históricos. Há oferta de emprego e os imigrantes trabalham nos sectores mais afectados pela escassez de mão de obra, em serviços menos qualificados, mais pesados e indiferenciados, como a hotelaria, a agricultura, a construção e a restauração. Reivindica, também, um aumento da insegurança e da criminalidade devido à imigração. Repetidamente têm sido desmentidos tais boatos e aleivosias. Não há qualquer ligação entre as duas premissas apresentadas. Estas são apenas algumas das deturpações da verdade insistentes nos discursos de André Ventura, que o afastam e opõem à figura política incontornável que foi Sá Carneiro.', 'During a lunch debate this week, André Ventura stated that he wanted to be the "... heir of Sá Carneiro...". If this is your intention, your political life project, then you will have to review your behavior and the practice of your party, with regard to the truth, honesty and rigor with which they interact with citizens, residents, foreigners and stateless people living in Portugal. Sá Carneiro was a Democrat. He was neither racist nor xenophobic. He is remembered for his directness and the truth with which he approached and discussed the country\'s main problems. He was a Lord. It is not the procedure that André Ventura has accustomed us to. He took as the priority theme of his political intervention and that of his party the fight against immigration, the evil of all evils, the apocalypse of Lusitania. It does so by ignoring the truth, confusing public opinion with a Sibylline discourse that breeds discrimination and incitement to hatred and anger against immigrants. It uses myths to convince public opinion that immigrants are the causes of their professional and social misadventures. It states, in particular, that they receive state subsidies upon their arrival in Portugal. False. There is no such support, only for immigrants in legal status. They pay taxes, make contributions to Social Security and, therefore, benefit from social support under the same conditions and requirements required of the Portuguese. Those contribute to Social Security in a very significant way, guaranteeing the sustainability of the system, including the payment of pensions and retirement benefits for Portuguese people. According to public information, around one million immigrants will have deducted, in 2025, an amount equivalent to around 17% of the total value, close to 3.6 billion euros. By 2024, studies indicate that immigrants will have contributed five times as much as they received in social support. He also states that immigrants come to "steal work from the Portuguese". False. Unemployment in Portugal reaches historic lows. There is a job offer and immigrants work in the sectors most affected by the shortage of labor, in less qualified, heavier and undifferentiated services, such as hotels, agriculture, construction and restaurants. It also claims an increase in insecurity and crime due to immigration. Such rumors and falsehoods have been repeatedly refuted. There is no connection between the two premises presented. These are just some of the distortions of the truth that are persistent in André Ventura\'s speeches, which distance him from and oppose him to the unavoidable political figure that was Sá Carneiro.', 'Durante un almuerzo debate esta semana, André Ventura afirmó que quería ser el "...heredero de Sá Carneiro...". Si ésta es su intención, su proyecto de vida política, entonces tendrá que revisar su comportamiento y la práctica de su partido, respecto a la verdad, la honestidad y el rigor con que interactúan con los ciudadanos, residentes, extranjeros y apátridas que viven en Portugal. Sá Carneiro era demócrata. No era ni racista ni xenófobo. Se le recuerda por su franqueza y la verdad con la que abordó y discutió los principales problemas del país. Él era un Señor. No es el procedimiento al que nos tiene acostumbrados André Ventura. Tomó como tema prioritario de su intervención política y la de su partido la lucha contra la inmigración, el mal de todos los males, el apocalipsis de Lusitania. Lo hace ignorando la verdad, confundiendo a la opinión pública con un discurso sibilino que genera discriminación e incitación al odio y la ira contra los inmigrantes. Utiliza mitos para convencer a la opinión pública de que los inmigrantes son la causa de sus desventuras profesionales y sociales. En particular, afirma que reciben subvenciones estatales a su llegada a Portugal. FALSO. No existe tal apoyo, sólo para los inmigrantes con estatus legal. Pagan impuestos, cotizan a la Seguridad Social y, por tanto, se benefician de ayudas sociales en las mismas condiciones y requisitos que se exigen a los portugueses. Estos contribuyen de manera muy significativa a la Seguridad Social, garantizando la sostenibilidad del sistema, incluido el pago de pensiones y prestaciones de jubilación para los portugueses. Según información pública, alrededor de un millón de inmigrantes habrán deducido, en 2025, una cantidad equivalente a alrededor del 17% del valor total, cerca de 3.600 millones de euros. Para 2024, los estudios indican que los inmigrantes habrán contribuido cinco veces más de lo que recibieron en apoyo social. También afirma que los inmigrantes vienen a "robar trabajo a los portugueses". FALSO. El desempleo en Portugal alcanza mínimos históricos. Hay oferta laboral y los inmigrantes trabajan en los sectores más afectados por la escasez de mano de obra, en servicios menos cualificados, más pesados  e indiferenciados, como hoteles, agricultura, construcción y restaurantes. También afirma un aumento de la inseguridad y la criminalidad debido a la inmigración. Estos rumores y falsedades han sido refutados repetidamente. No existe conexión entre las dos premisas presentadas. Éstas son sólo algunas de las distorsiones de la verdad que persisten en los discursos de André Ventura, que lo distancian y lo oponen a la figura política ineludible que fue Sá Carneiro.']),
                'imgNoticia' => 'https://staticx.noticiasilimitadas.pt/jn/3223f307-5ee1-4232-9a6c-9c3cadfb4a54_1200x675.jpg',
                'linkNoticia' => json_encode(['https://www.jn.pt/opiniao/artigo/o-herdeiro-de-sa-carneiro/18017869', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.jn.pt%2Fopiniao%2Fartigo%2Fo-herdeiro-de-sa-carneiro%2F18017869', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.jn.pt%2Fopiniao%2Fartigo%2Fo-herdeiro-de-sa-carneiro%2F18017869']),
                'StatusNoticia' => 'analise',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:44:14',
                'updated_at' => '2025-11-13 00:44:14',
            ],
            [
                'tituloNoticia' => json_encode(['Mães são detidas em protesto contra prisão de professora de creche nos EUA', 'Mothers are detained in protest against the arrest of a daycare teacher in the USA', 'Madres son detenidas en protesta por el arresto de una maestra de guardería en EE.UU.']),
                'conteudoNoticia' => json_encode(['Ação dos agentes de imigração na frente das crianças causou indignação em comunidade em Chicago', 'Action by immigration agents in front of children caused outrage in the community in Chicago', 'Acción de agentes migratorios frente a niños causó indignación en la comunidad de Chicago']),
                'imgNoticia' => 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/11/Maes-sao-detidas-durante-protesto-nos-arredores-de-Chicago.jpg?w=1200&h=630&crop=1',
                'linkNoticia' => json_encode(['https://www.cnnbrasil.com.br/internacional/protesto-prisao-professora-creche-eua/', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.cnnbrasil.com.br%2Finternacional%2Fprotesto-prisao-professora-creche-eua%2F', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.cnnbrasil.com.br%2Finternacional%2Fprotesto-prisao-professora-creche-eua%2F']),
                'StatusNoticia' => 'analise',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:45:10',
                'updated_at' => '2025-11-13 00:45:10',
            ],
            [
                'tituloNoticia' => json_encode(['Açores são "região atrativa" para imigrantes oriundos de 98 países', 'Azores are "attractive region" for immigrants from 98 countries', 'Las Azores son una "región atractiva" para inmigrantes de 98 países']),
                'conteudoNoticia' => json_encode(['Leoter Viegas, que preside à Associação de Imigrantes nos Açores (AIA), disse à agência Lusa que a região "consegue absorver na totalidade a comunidade imigrante que a procura para viver". "A esmagadora maioria destes imigrantes estão integrados no mercado de trabalho e na sociedade açoriana", afirma o presidente da AIA, que destaca também como fator que favorece a integração o facto de se tratar de "uma região pequena, dispersa em nove ilhas", havendo imigrantes em todas elas.', 'Leoter Viegas, who presides over the Association of Immigrants in the Azores (AIA), told Lusa agency that the region "can absorb the entire community immigrant who seeks it to live." "The overwhelming majority of these immigrants are integrated into the labor market work and in Azorean society", says the president of the AIA, who also highlights as a factor that favors integration the fact that it is of "a small region, spread across nine islands", with immigrants in all of them.', 'Leoter Viegas, que preside la Asociación de Inmigrantes de las Azores (AIA), dijo Lusa afirma que la región "puede absorber a toda la comunidad inmigrante que lo busca para vivir." "El La inmensa mayoría de estos inmigrantes están integrados en el mercado laboral. trabajo y en la sociedad de las Azores", afirma el presidente de la AIA, que destaca también como un factor que favorece la integración el hecho de que es de "una pequeña región, repartida en nueve islas", con inmigrantes en todos ellos.']),
                'imgNoticia' => 'http://www.acorianooriental.pt/images/stock/71984.jpg',
                'linkNoticia' => json_encode(['https://www.acorianooriental.pt/noticia/acores-sao-regiao-atrativa-para-imigrantes-oriundos-de-98-paises-372631', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.acorianooriental.pt%2Fnoticia%2Facores-sao-regiao-atrativa-para-imigrantes-oriundos-de-98-paises-372631', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.acorianooriental.pt%2Fnoticia%2Facores-sao-regiao-atrativa-para-imigrantes-oriundos-de-98-paises-372631']),
                'StatusNoticia' => 'ativa',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:46:14',
                'updated_at' => '2025-11-13 00:46:14',
            ],
            [
                'tituloNoticia' => json_encode(['Mulher arguida por suspeitas de roubar quase 400 quilos de cortiça em Mora', 'Woman accused of stealing almost 400 kilos of cork in Mora', 'Mujer acusada de robar casi 400 kilos de corcho en Mora']),
                'conteudoNoticia' => json_encode(['Suspeita ficou sujeita a termo de identidade e residência, de acordo com a GNR.', 'The suspect was subject to an identity and residence permit, according to the GNR.', 'Según la GNR, el sospechoso estaba sujeto a un permiso de identidad y residencia.']),
                'imgNoticia' => 'https://cdn.cmjornal.pt/images/2023-03/img_1280x721uu2023-03-17-22-31-12-1303835.jpg',
                'linkNoticia' => json_encode(['https://www.cmjornal.pt/portugal/detalhe/mulher-arguida-por-suspeitas-de-roubar-quase-400-quilos-de-cortica-em-mora', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.cmjornal.pt%2Fportugal%2Fdetalhe%2Fmulher-arguida-por-suspeitas-de-roubar-quase-400-quilos-de-cortica-em-mora', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.cmjornal.pt%2Fportugal%2Fdetalhe%2Fmulher-arguida-por-suspeitas-de-roubar-quase-400-quilos-de-cortica-em-mora']),
                'StatusNoticia' => 'analise',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:47:13',
                'updated_at' => '2025-11-13 00:47:13',
            ],
            [
                'tituloNoticia' => json_encode(['Naufrágio no Mediterrâneo: Tragédia com Imigrantes', 'Shipwreck in the Mediterranean: Tragedy with Immigrants', 'Naufragio en el Mediterráneo: tragedia con los inmigrantes']),
                'conteudoNoticia' => json_encode(['Um naufrágio na Tunísia deixou ao menos 40 mortos entre imigrantes. Saiba mais sobre a crise migratória no Mediterrâneo e os números alarmantes de 2025.', 'A shipwreck in Tunisia left at least 40 immigrants dead. Find out more about the migration crisis in the Mediterranean and the alarming numbers for 2025.', 'Un naufragio en Túnez dejó al menos 40 inmigrantes muertos. Descubre más sobre la crisis migratoria en el Mediterráneo y las alarmantes cifras para 2025.']),
                'imgNoticia' => 'https://correiodobrasil.com.br/img/1751005_big-naufragio.jpg',
                'linkNoticia' => json_encode(['https://correiodobrasil.com.br/a/naufragio-mediterraneo-provoca-dezenas-mortes', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fcorreiodobrasil.com.br%2Fa%2Fnaufragio-mediterraneo-provoca-dezenas-mortes', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fcorreiodobrasil.com.br%2Fa%2Fnaufragio-mediterraneo-provoca-dezenas-mortes']),
                'StatusNoticia' => 'analise',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:50:29',
                'updated_at' => '2025-11-13 00:50:29',
            ],
            [
                'tituloNoticia' => json_encode(['Chicago diz que governo Trump viola direitos humanos e pede apuração à ONU', 'Chicago says the Trump administration violates human rights and asks the UN for an investigation', 'Chicago dice que la administración Trump viola los derechos humanos y pide a la ONU una investigación']),
                'conteudoNoticia' => json_encode(['Prefeito de Chicago, Brandon Johnson, citou famílias "separadas por batidas da imigração" e criticou atuação de agentes federais', 'Chicago Mayor Brandon Johnson cited families "separated by immigration raids" and criticized the actions of federal agents', 'El alcalde de Chicago, Brandon Johnson, citó a familias "separadas por redadas de inmigración" y criticó las acciones de los agentes federales']),
                'imgNoticia' => 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/10/Donald-Trump-presidente-dos-EUA-e1761240757199.jpg?w=1200&h=630&crop=1',
                'linkNoticia' => json_encode(['https://www.cnnbrasil.com.br/internacional/chicago-diz-que-governo-trump-viola-direitos-humanos-e-pede-apuracao-a-onu/', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fwww.cnnbrasil.com.br%2Finternacional%2Fchicago-diz-que-governo-trump-viola-direitos-humanos-e-pede-apuracao-a-onu%2F', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fwww.cnnbrasil.com.br%2Finternacional%2Fchicago-diz-que-governo-trump-viola-direitos-humanos-e-pede-apuracao-a-onu%2F']),
                'StatusNoticia' => 'analise',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:51:14',
                'updated_at' => '2025-11-13 00:51:14',
            ],
            [
                'tituloNoticia' => json_encode(['Faxineira imigrante morre baleada após tentar limpar casa errada nos EUA', 'Immigrant cleaning lady dies after trying to clean the wrong house in the US', 'Mujer de la limpieza inmigrante muere tras intentar limpiar la casa equivocada en EE.UU.']),
                'conteudoNoticia' => json_encode(['A guatemalteca María Florinda Ríos Pérez, que vivia legalmente há três anos em solo americano, foi atingida na cabeça após se enganar sobre endereço', 'Guatemalan María Florinda Ríos Pérez, who had lived legally on American soil for three years, was hit in the head after making a mistake about her address', 'La guatemalteca María Florinda Ríos Pérez, que vivía legalmente en suelo estadounidense desde hacía tres años, fue golpeada en la cabeza tras equivocarse en su dirección']),
                'imgNoticia' => 'https://veja.abril.com.br/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-11-at-14.51.49.jpeg?quality=70&strip=info&resize=1080,565&crop=1',
                'linkNoticia' => json_encode(['https://veja.abril.com.br/mundo/faxineira-imigrante-morre-baleada-apos-tentar-limpar-casa-errada-nos-eua/', 'https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=https%3A%2F%2Fveja.abril.com.br%2Fmundo%2Ffaxineira-imigrante-morre-baleada-apos-tentar-limpar-casa-errada-nos-eua%2F', 'https://translate.google.com/translate?hl=es&sl=auto&tl=es&u=https%3A%2F%2Fveja.abril.com.br%2Fmundo%2Ffaxineira-imigrante-morre-baleada-apos-tentar-limpar-casa-errada-nos-eua%2F']),
                'StatusNoticia' => 'analise',
                'vistoNoticia' => 0,
                'created_at' => '2025-11-13 00:52:12',
                'updated_at' => '2025-11-13 00:52:12',
            ]
        ];

        // Inserir cada notícia
        foreach ($noticias as $noticia) {
            DB::table('tb_noticia')->insert($noticia);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_noticia');
    }
};