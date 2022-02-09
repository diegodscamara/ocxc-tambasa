<#attempt>
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="author" content="Diego Câmara">
        <title>Account Registration Email Template</title>

        <style type="text/css">
            body,
            td,
            input,
            textarea,
            select {
                font-family: Arial !important;
            }

            .Account__Registration-User a,
            .ii a[href] {
                color: #ffff;
                text-decoration: none;
            }

            .Account__Registration-Logo {
                display: block;
                max-width: 142px;
                height: 37px;
                margin: 0 auto;
            }

            @media (max-width: 2560px) {
                .Account__Registration-Icon {
                    width: 74% !important;
                }

                .Account__Registration-Header {
                    width: 100% !important;
                }

                .Account__Registration-Name {
                    padding-left: 5.2% !important;
                }

                .Account__Registration-Info {
                    padding-left: 5% !important;
                }
            }

            @media (max-width: 1920px) {
                .Account__Registration-Icon {
                    width: 61% !important;
                }
            }

            @media (max-width: 1680px) {
                .Account__Registration-Icon {
                    width: 58% !important;
                }
            }

            @media (max-width: 1440px) {
                .Account__Registration-Icon {
                    width: 48% !important;
                }

                .Account__Registration-Name {
                    padding-left: 5% !important;
                }

                .Account__Registration-Info {
                    padding-left: 4.5% !important;
                }
            }

            @media (max-width: 1340px) {
                .Account__Registration-Icon {
                    width: 38% !important;
                }
            }

            @media (max-width: 1280px) {
                .Account__Registration-Icon {
                    width: 40% !important;
                }
            }

            @media (max-width: 1024px) {
                .Account__Registration-Icon {
                    width: 38% !important;
                }
            }

            @media (max-width: 375px) {
                tr[class=Account__Registration-Subject] {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                td[class=Account__Registration-Account] {
                    width: 21%;
                }

                h1[class=Account__Registration-Header] {
                    width: 100%;
                    text-align: center;
                    padding-right: 9px;
                    text-align: center;
                }

                td[class=Account__Registration-Salutation] {
                    padding-left: 2%;
                }

                td[class=Account__Registration-Message] {
                    padding: 0;
                }

                td[class=Account__Registration-User] {
                    padding-left: 10px;
                }
            }
        </style>
    </head>

    <body>
        <table class="Account__Registration-Subject" style="
        width: 100%; 
        background-color: #084f96; 
        height: 100px; 
        border: 0;">
            <tr class="Account__Registration-Account" style="
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 1rem;
                text-align: center;
                width: 100%;">
                &nbsp;
                <td class="Account__Registration-Icon" style="width: 34%; text-align: right;">
                    <div>
                        <img src="${data.storefrontUrl}/file/general/new-account.png" alt="" width="60" height="60" />
                    </div>
                </td>
                <td class="Account__Registration-Header" style="width: 50%; text-align: left;">
                    <div>
                        <h1 style="
                        color: #ffffff; 
                        font-size: 1.5rem; padding-left: 1rem;">
                            &nbsp;${getString("ACCOUNT_REG_HEADER")}
                        </h1>
                    </div>
                </td>
            </tr>
        </table>
        <table align="center" style="background-color: #084f96; width: 100%;"> 
            <tbody>
                <tr align="center">
                    <td>
                        <div style="max-width: 142px;">
                            <img class="Account__Registration-Logo" src="${data.storefrontUrl}/file/general/logo-tambasa.png" alt=""
                                height="37" width="142"/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
        <table class="Account__Registration-Salutation" style="
            width: 100%; 
            color: #084f96;">
            <tbody>
                <tr>
                    <td class="Account__Registration-Name" style="
                        width: 100%; 
                        padding-left: 5%;">
                        <h2 style="
                            font-size: 1.2rem; 
                            color: #084f96; 
                            padding-top: 2rem;">
                            ${getString("ACCOUNT_REG_SALUTATION",
                            data.firstName)}</h2>
                    </td>
                </tr>
            </tbody>
        </table><br>
        <table class="Account__Registration-Message" style="
        width: 100%; 
        color: #3f3f3f;">
            <tbody>
                <tr style="height: 20px;">
                    <td class="Account__Registration-Info" style="
                        width: 100%; 
                        height: 20px; 
                        padding-left: 4.5%;">
                        &nbsp;${getString("ACCOUNT_REG_LINE_3")}
                    </td>
                </tr>
            </tbody>
        </table><br>
        <table class="Account__Registration-User" align="center" style="
        width: 90%;
        background-color: #084f96;
        height: 80px;
        margin: 0 auto;
        ">
            <tbody>
                <#if data.resetPasswordLink?has_content>
                    <tr style="
                        height: 21px; 
                        color: #86bef5;">
                        <td style="
                            width: 50%; 
                            height: 21px; 
                            padding-left: 30px;">
                            ${getString("ACCOUNT_REG_LINE_4")}
                        </td>
                        <td style="
                            width: 50%; 
                            height: 21px; 
                            padding-left: 30px;">
                            ${getString("ACCOUNT_REG_LINE_5")}
                        </td>
                    </tr>
                    <tr style="
                        height: 21px; 
                        padding-left: 30px; 
                        color: #ffffff;">
                        <td style="
                            width: 50%; 
                            height: 21px; 
                            padding-left: 30px; 
                            color: #ffffff;">
                            ${data.email}
                        </td>
                        <td style="
                            width: 50%; 
                            height: 21px; 
                            padding-left: 30px;">
                            ${data.id}
                        </td>
                    </tr>
                </#if>
            </tbody>
        </table>
    </body>

    </html>
    <#recover>
        ${.error}
</#attempt>