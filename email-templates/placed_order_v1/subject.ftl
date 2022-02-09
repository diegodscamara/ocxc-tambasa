<#if data.sitename??>
  ${getString("ORDER_PLACED_SUBJECT", data.sitename, data.orderId)}
<#else>
  ${getString("ORDER_PLACED_SUBJECT", "", data.orderId)}
</#if>