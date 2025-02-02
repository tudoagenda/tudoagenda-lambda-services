export const accountCreated = (email: string, password: string): string => {
  return `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Agendabela</title>
</head>
<body style="margin: 0; padding: 0; background-color: #fdf0f5; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #fdf0f5;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="padding-bottom: 20px;">
                            <img src="https://agendabela.tudoagenda.com.br/agendabela-logo-transparency.png" alt="Agendabela" width="150" style="display: block;">
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; color: #333333; line-height: 1.6; padding: 20px; text-align: left;">
                            <p>Olá,</p> 
                            <p>Sua conta no <strong>Agendabela</strong> foi criada com sucesso!</p>
                            <p>Agora você pode acessar o sistema com seu e-mail: <strong>${email}</strong></p>
                            <p>Sua senha temporária é: <strong>${password}</strong></p>
                            <p>Recomendamos que altere sua senha assim que fizer login.</p>
                            <p>Se precisar de ajuda, entre em contato com o suporte.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 20px; font-size: 14px; color: #777777;">
                            <p>Atenciosamente,</p>
                            <p><strong>Miguel Oliveira</strong><br>Departamento de Suporte - Agendabela</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 20px;">
                            <img src="https://agendabela.tudoagenda.com.br/agendabela-logo-transparency.png" alt="Agendabela" width="80" style="display: block;">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
