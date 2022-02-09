<#if data.login?has_content>
${getString("ACCOUNT_REG_SUBJECT", data.sitename)}
<#else>
${getString("PASSWORD_RESET_SUBJECT", data.sitename)}
</#if>