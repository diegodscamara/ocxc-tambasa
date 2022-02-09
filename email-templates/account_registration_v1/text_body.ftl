${getString("ACCOUNT_REG_SALUTATION", data.firstName)}

${getString("ACCOUNT_REG_LINE_1", data.sitename)}

${getString("ACCOUNT_REG_LINE_2")}

<#if data.resetPasswordLink??>
${getString("ACCOUNT_REG_LINE_3")}<br><br>

${getString("ACCOUNT_REG_LINE_4", data.email)}

${getString("ACCOUNT_REG_LINE_5", data.id)}

${getString("PASSWORD_RESET_LINE_1", data.resetPasswordLink)}

${getString("PASSWORD_RESET_LINE_2", data.sitename)}
</#if>

${getString("ACCOUNT_REG_SENT_SIGNATURE_TEXT")}