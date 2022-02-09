<#attempt>
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="author" content="Diego Câmara">
        <title>Forgot Password Email Template</title>
        <style type="text/css">
            body,
            td,
            input,
            textarea,
            select {
                font-family: Arial !important;
            }

            @media (max-width: 375px) {
                tr[class=Password__Reset-Subject] {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                td[class=Password__Reset-Account] {
                    width: 21%;
                }

                td[class=Password__Reset-Header] {
                    width: 100%;
                    text-align: center;
                }

                table[class=Password__Reset-Link] {
                    width: 45%;
                }
            }
        </style>
    </head>

    <body>
        <table class="Password__Reset-Subject" style="
            width: 100%; 
            background-color: #084f96; 
            height: 100px; 
            border: 0;"
        >
            <tbody>
                <tr class="Password__Reset-Account" style="
                    display: flex;
                    align-items: center;
                    padding-top: 2rem;
                    text-align: center;
                    width: 100%;">
                    &nbsp;
                    <td class="Password__Reset-Header" style="width: 100%;">
                        <div style="display: inline-flex;">
                            <img src="${data.storefrontUrl}/file/general/new-account.png" alt="" width="60" height="60" />
                            <h1 style="color: #ffffff; font-size: 1.8rem; margin: auto;">
                                &nbsp;${getString("PASSWORD_RESET_SUBJECT")}
                                <#attempt>
                                    <#assign
                                        passwordLink=data.resetPasswordLink?replace("?occsAuthToken", "update-expired-password/?occsAuthToken"
                                        )>
                                        <#recover>
                                            ${.error}
                                </#attempt>
                            </h1>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div style="width: 100%; height: 40px; background-color: #084f96;">
            <div style="width: 100%; text-align: center;">
                &nbsp;
                <div style="position: relative!important;">
                    <img class="Password__Reset-Logo" src="${data.storefrontUrl}/file/general/logo-tambasa.png" alt=""
                        width="150" height="40" />
                </div>
            </div>
        </div>
        <br>
        <table class="Password__Reset-Salutation" style="width: 100%;">
            <tbody>
                <tr>
                    <td style="width: 100%; padding-left: 5%; padding-top: 2mre;">
                        <h2 style="color: #084f96; font-size: 1.2rem;">${getString("PASSWORD_RESET_SALUTATION",
                            data.firstName)}</h2>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="Password__Reset-Message" style="width: 100%;">
            <tbody>
                <tr style="height: 20px;">
                    <td style="color: #3f3f3f; width: 100%; height: 20px; padding-left: 4.5%;">
                        <#if data.login?has_content>
                            ${getString("ACCOUNT_EXIST_LINE")}&nbsp; &nbsp; <b>${data.login}</b><br>
                        </#if>
                        <#if !data.profileType?has_content>
                            &nbsp;${getString("ACCOUNT_RESET_MESSAGE")}
                    </td>
                </tr>
            </tbody>
        </table>
        <br />

        </table>
        <table class=table[Password__Reset-Link]" style=" width: 200px; background-color: #084f96; border-radius: 8px; height: 40px; margin-left: auto;
            margin-right: auto;">
            <tbody>
                <tr>
                    <td style="width: 100%; text-align: center;">
                        <a style="color: #ffffff; text-decoration: none;"
                            href="${passwordLink}">${getStringNotEscaped("PASSWORD_RESET_LINK")}</a>
                    </td>
                </tr>
            </tbody>
        </table><br>

        <table class="Password__Reset-Alternative" style="width: 100%;">
            <tbody>
                <tr>
                    <td style="color: #3f3f3f; width: 100%; padding-left: 4.5%;">
                        &nbsp;${getString("PASSWORD_RESET_ALTERNATIVE")}
                        <a href="${passwordLink}">${passwordLink}</a>&nbsp;
                    </td>
                    </#if>
                </tr>
            </tbody>
        </table>
    </body>

    </html>
    <#recover>
        ${.error}
</#attempt>