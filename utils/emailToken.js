const { transporter } = require('./nodeMailerTransport');
require('dotenv').config();

const emailTokenGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmailToken(recipientEmail, token) {
    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: recipientEmail,          
        subject: 'Código de Verificação',
        html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if !mso]>-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: inherit;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.t18,.t20{mso-text-raise:8px!important}.t55{border:0!important}.t19,.t32{mso-line-height-alt:40px!important;line-height:40px!important}.t22{width:154px!important}.t18{font-size:15px!important}.t13{mso-line-height-alt:17px!important;line-height:17px!important}.t10,.t51{width:458px!important}.t4{text-align:center!important}.t3{vertical-align:middle!important;width:600px!important}.t47{width:420px!important}
}
</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&amp;family=Inter+Tight:wght@700&amp;family=Lato:wght@400&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body id="body" class="t59" style="min-width:100%;Margin:0px;padding:0px;background-color:#E8E2CC;"><div class="t58" style="background-color:#E8E2CC;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t57" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#E8E2CC;background-image:none;background-repeat:repeat;background-size:auto;background-position:center top;" valign="top" align="center">
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#E8E2CC"/>
</v:background>
<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td align="center">
<table class="t56" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="458" class="t55" style="background-color:#FFFFFF;border:1px solid #CECECE;width:458px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t55" style="background-color:#FFFFFF;border:1px solid #CECECE;width:458px;">
<!--<![endif]-->
<table class="t54" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t53"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
<table class="t11" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="456" class="t10" style="background-color:#0070AD;width:456px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t10" style="background-color:#0070AD;width:456px;">
<!--<![endif]-->
<table class="t9" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t8" style="padding:20px 23px 20px 15px;"><div class="t7" style="width:100%;text-align:center;"><div class="t6" style="display:inline-block;"><table class="t5" role="presentation" cellpadding="0" cellspacing="0" align="center" valign="middle">
<tr class="t4"><td></td><td class="t3" width="418" valign="middle">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t2" style="width:100%;"><tr><td class="t1"><h1 class="t0" style="margin:0;Margin:0;font-family:Inter Tight,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:700;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Código de Verificação</h1></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t13" style="mso-line-height-rule:exactly;mso-line-height-alt:25px;line-height:25px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t17" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="308" class="t16" style="width:308px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t16" style="width:308px;">
<!--<![endif]-->
<table class="t15" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t14"><p class="t12" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:700;font-style:normal;font-size:15px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#424040;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Seu código de verificação é:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t19" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t23" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="242" class="t22" style="background-color:#0070AD;overflow:hidden;width:242px;border-radius:8px 8px 8px 8px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t22" style="background-color:#0070AD;overflow:hidden;width:242px;border-radius:8px 8px 8px 8px;">
<!--<![endif]-->
<table class="t21" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t20" style="text-align:center;line-height:40px;mso-line-height-rule:exactly;mso-text-raise:4px;padding:5px 15px 5px 15px;"><span class="t18" style="display:block;margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:40px;font-weight:700;font-style:normal;font-size:28px;text-decoration:none;letter-spacing:-0.5px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:4px;">${token}</span></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t26" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t30" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="288" class="t29" style="width:288px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t29" style="width:288px;">
<!--<![endif]-->
<table class="t28" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t27"><p class="t25" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#3B3737;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Este código expira em <span class="t24" style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;">15 minutos</span>.<br/>Se você não solicitou este código, por favor ignore esta mensagem.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t32" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t36" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="318" class="t35" style="width:318px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t35" style="width:318px;">
<!--<![endif]-->
<table class="t34" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t33"><p class="t31" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.6px;direction:ltr;color:#787878;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Este é um email automático. Não responda.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t37" style="mso-line-height-rule:exactly;mso-line-height-alt:73px;line-height:73px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t52" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="456" class="t51" style="background-color:#0070AD;width:456px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t51" style="background-color:#0070AD;width:456px;">
<!--<![endif]-->
<table class="t50" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t49" style="padding:20px 23px 20px 15px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
<table class="t42" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="56" class="t41" style="width:56px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t41" style="width:56px;">
<!--<![endif]-->
<table class="t40" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t39"><div style="font-size:0px;"><img class="t38" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="56" height="56" alt="" src="https://i.ibb.co/B2zH7tVT/icon2.png"/></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t44" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t48" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr>
<!--[if mso]>
<td width="418" class="t47" style="width:418px;">
<![endif]-->
<!--[if !mso]>-->
<td class="t47" style="width:418px;">
<!--<![endif]-->
<table class="t46" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t45"><p class="t43" style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#8FBED9;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">© 2024 Bola na Rede️. Todos os direitos reservados.</p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
</html>
`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.response);
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        
    }

    
}

module.exports = {emailTokenGenerator, sendVerificationEmailToken}