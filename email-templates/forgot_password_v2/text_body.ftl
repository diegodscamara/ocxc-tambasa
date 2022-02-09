${getString("PASSWORD_RESET_SALUTATION", data.firstName)}

<#if data.login??>
${getString("ACCOUNT_EXIST_LINE", data.login)}</b><br>
</#if>

<#if !data.profileType??>
${getString("ACCOUNT_RESET_MESSAGE")}
${data.resetPasswordLink}
</#if>
