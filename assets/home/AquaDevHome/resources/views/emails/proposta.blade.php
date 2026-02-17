<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <title>Proposta Recebida</title>
    <style>
        /* Seus estilos aqui */
    </style>
</head>
<body style="background-color:#FFFFFF; margin:0; padding:0;">
    <table width="100%" style="background-color:#ffffff;" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="600" style="background-color:#fdfdfd; border:2px solid #000;">
                    <tr>
                        <td align="center" style="padding:10px;">
                            <img src="https://df5013ba9a.imgdist.com/pub/bfra/1l1eztmi/tds/0zr/g7r/AquaDev_Menor.png" alt="Logo AquaDev" width="240" style="display:block; margin:0 auto;">
                        </td>
                    </tr>
                    <tr>
                        <td style="border-top:2px solid #0063db;"></td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:20px; color:#0063db; font-size:28px; font-weight:bold;">
                            Proposta Recebida
                        </td>
                    </tr>
                    <tr>
                        <td style="border-top:2px solid #0063db;"></td>
                    </tr>
                    <tr>
                        <td style="padding:20px; font-size:16px; color:#101112; text-align:justify;">
                            <p><strong>Nome:</strong> {{ $nome }}</p>
                            <br>
                            <p><strong>E-mail de contato:</strong> {{ $email }}</p>
                            <br>
                            <p><strong>Descrição da proposta:</strong><br>{!! nl2br(e($desc)) !!}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="border-top:2px solid #0063db; padding:10px;" align="center">
                            <table style="margin:10px auto;">
                                <tr>
                                    <td style="padding:0 5px;">
                                        <a href="#" target="_blank">
                                            <img src="https://df5013ba9a.imgdist.com/pub/bfra/1l1eztmi/t3d/5oa/hoh/483e8e49-654c-4f4e-b628-3ff5d9305419.png" width="32" alt="Github">
                                        </a>
                                    </td>
                                    <td style="padding:0 5px;">
                                        <a href="mailto:aquadev.of@gmail.com" target="_blank">
                                            <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/mail@2x.png" width="32" alt="E-mail">
                                        </a>
                                    </td>
                                    <td style="padding:0 5px;">
                                        <a href="https://youtube.com/@aquadev-u3p?si=5o7LulUYbVU0vCTI" target="_blank">
                                            <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/youtube@2x.png" width="32" alt="YouTube">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
