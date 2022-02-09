<#attempt>
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="author" content="Diego Câmara">
    <title>Place Order Email Template</title>
    <style type="text/css">
      body,
      td,
      input,
      textarea,
      select {
        font-family: Arial !important;
      }

      a {
        color: #000000 !important;
        text-decoration: none !important;
        font-weight: bold !important;
      }

      @media (max-width: 480px) {
        table[class=devicewidth] {
          width: 280px !important;
          text-align: center !important;
        }

        table[class=devicewidthinner] {
          width: 260px !important;
          text-align: center !important;
        }
      }
    </style>
  </head>

  <body>

    <table class="Place__Order-Subject" style="
      width: 100%; 
      background-color: #084f96; 
      height: 100px; 
      border: 0;"
    >
      <tbody>
        <tr class="Place__Order-Cart" style="
              display: flex;
              align-items: center;
              padding-top: 2rem;
              text-align: center;
              width: 100%;">
          &nbsp;
          <td class="Place__Order-Header" style="width: 100%;">
            <div style="display: inline-flex;">
              <img src="${data.storefrontUrl}/file/general/place-order.png" alt="" width="60" height="60" />
              <h1 style="
                color: #ffffff; 
                font-size: 1.5rem; padding-left: 1rem;
                margin: auto 0;">
                &nbsp;${getString("ORDER_PLACED_HEADER")}
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
          <img class="Place__Order-Logo" src="${data.storefrontUrl}/file/general/logo-tambasa.png" alt="" width="150"
            height="40" />
        </div>
      </div>
    </div>
    <br>
    <!-- Start of header -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable"
      st-sortable="header">
      <tbody>
        <tr>
          <td>
            <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
              <tbody>
                <tr>
                  <td width="100%">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                      <tbody>
                        <!-- Spacing -->
                        <tr>
                          <td height="20" style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                            &nbsp;
                          </td>
                        </tr>
                        <!-- Spacing -->
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End of Header -->

    <!-- Start of separator -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable"
      st-sortable="separator">
      <tbody>
        <tr>
          <td>
            <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth">
              <tbody>
                <tr>
                  <td align="center" height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End of separator -->

    <!-- Start Intro Text -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable"
      st-sortable="full-text">
      <tbody>
        <tr>
          <td>
            <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
              <tbody>
                <tr>
                  <td width="100%">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                      <tbody>
                        <!-- Spacing -->
                        <tr>
                          <td height="20" style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                            &nbsp;
                          </td>
                        </tr>
                        <!-- Spacing -->
                        <tr>
                          <td>
                            <table width="560" align="center" cellpadding="0" cellspacing="0" border="0"
                              class="devicewidthinner">
                              <tbody>
                                <!-- Title -->
                                <tr>
                                  <td
                                    style="font-family: Helvetica, arial, sans-serif; font-size: 30px; color: #333333; text-align: center; line-height: 30px;"
                                    st-title="fulltext-heading">
                                    ${getString("ORDER_PLACED_TITLE")}</td>
                                </tr>
                                <!-- End of Title -->
                                <!-- spacing -->
                                <tr>
                                  <td width="100%" height="20"
                                    style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                </tr>
                                <!-- End of spacing -->
                                <!-- content -->
                                <tr>
                                  <td
                                    style="font-family: Helvetica, arial, sans-serif; font-size: 16px; color: #666666; text-align: center; line-height: 30px;"
                                    st-content="fulltext-content">
                                    ${getString("ORDER_PLACED_ORDER_LINE_START")}<#if data.orderLocation??><a
                                        href="${data.orderLocation}">${data.orderId}</a>
                                      <#else>${data.orderId}
                                    </#if>${getString("ORDER_PLACED_ORDER_LINE_END", data.orderDate, data.orderTime)}
                                  </td>
                                </tr>
                                <!-- End of content -->
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <!-- Spacing -->
                        <tr>
                          <td height="20" style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                            &nbsp;
                          </td>
                        </tr>
                        <!-- Spacing -->
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End of Intro text -->

    <!-- Start of separator -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable"
      st-sortable="separator">
      <tbody>
        <tr>
          <td>
            <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth">
              <tbody>
                <tr>
                  <td align="center" height="30" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
                <tr>
                  <td width="550" align="center" height="1" bgcolor="#d1d1d1" style="font-size: 1px; line-height: 1px;">
                    &nbsp;</td>
                </tr>
                <tr>
                  <td align="center" height="30" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End of separator -->

    <!-- 3 Start of Columns -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable">
      <tbody>
        <tr>
          <td>
            <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
              <tbody>
                <tr>
                  <td width="100%">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                      <tbody>
                        <tr>
                          <td>
                            <!-- col 1 -->
                            <table width="186" align="left" border="0" cellpadding="0" cellspacing="0"
                              class="devicewidth">
                              <tbody>
                                <tr>
                                  <td>
                                    <!-- start of text content table -->
                                    <table width="186" align="center" border="0" cellpadding="0" cellspacing="0"
                                      class="devicewidthinner">
                                      <tbody>
                                        <!-- title2 -->
                                        <tr>
                                          <td
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #666666; text-align: left; line-height: 24px;"
                                            st-title="3col-title1">
                                            ${getString("ORDER_PLACED_SHIPPING_ADDRESS_TITLE")}
                                          </td>
                                        </tr>
                                        <!-- end of title2 -->
                                        <!-- content2 -->
                                        <tr>
                                          <td
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: #687078; text-align: left; line-height: 24px;"
                                            st-content="3col-content1">
                                            ${data.shippingAddress.firstName}
                                            ${data.shippingAddress.lastName}<br>
                                            ${data.shippingAddress.address1},<br>
                                            <#if (data.shippingAddress.address2? length> 0)>
                                              ${data.shippingAddress.address2},<br>
                                            </#if>
                                            ${data.shippingAddress.city}
                                            ${data.shippingAddress.state}<br>
                                            ${data.shippingAddress.postalCode}<br>
                                            ${data.shippingAddress.country}
                                          </td>
                                        </tr>
                                        <!-- end of content2 -->
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <!-- end of text content table -->
                              </tbody>
                            </table> <!-- spacing -->
                            <table width="20" align="left" border="0" cellpadding="0" cellspacing="0"
                              class="removeMobile">
                              <tbody>
                                <tr>
                                  <td width="100%" height="15"
                                    style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                </tr>
                              </tbody>
                            </table> <!-- end of spacing -->
                            <!-- col 2 -->
                            <table width="186" align="left" border="0" cellpadding="0" cellspacing="0"
                              class="devicewidth">
                              <tbody>
                                <tr>
                                  <td>
                                    <!-- start of text content table -->
                                    <table width="186" align="center" border="0" cellpadding="0" cellspacing="0"
                                      class="devicewidthinner">
                                      <tbody>
                                        <!-- title2 -->
                                        <tr>
                                          <td
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #666666; text-align: center; line-height: 24px;"
                                            st-title="3col-title2">
                                            ${getString("ORDER_PLACED_PAYMENT_METHODS_TITLE")}
                                          </td>
                                        </tr>
                                        <!-- end of title2 -->
                                        <!-- Spacing -->
                                        <tr>
                                          <td width="100%" height="15"
                                            style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                            &nbsp;</td>
                                        </tr>
                                        <!-- Spacing -->
                                        <!-- content2 -->
                                        <tr>
                                          <td
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: #687078; text-align: center; line-height: 24px;"
                                            st-content="3col-content2">
                                            <#list data.paymentMethods as paymentMethod> ${paymentMethod!}<br />
                                            </#list>
                                          </td>
                                        </tr>
                                        <!-- end of content2 -->
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <!-- end of text content table -->
                              </tbody>
                            </table> <!-- end of col 2 -->
                            <!-- spacing -->
                            <table width="1" align="left" border="0" cellpadding="0" cellspacing="0"
                              class="removeMobile">
                              <tbody>
                                <tr>
                                  <td width="100%" height="15"
                                    style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                </tr>
                              </tbody>
                            </table> <!-- end of spacing -->
                            <!-- col 3 -->
                            <table width="186" align="right" border="0" cellpadding="0" cellspacing="0"
                              class="devicewidth">
                              <tbody>
                                <tr>
                                  <td>
                                    <!-- start of text content table -->
                                    <table width="186" align="center" border="0" cellpadding="0" cellspacing="0"
                                      class="devicewidthinner">
                                      <tbody>
                                        <!-- title -->
                                        <tr>
                                          <td
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #666666; text-align: center; line-height: 24px;"
                                            st-title="3col-title3">
                                            ${getString("ORDER_PLACED_SHIPPING_METHODS_TITLE")}
                                          </td>
                                        </tr>
                                        <!-- end of title -->
                                        <!-- Spacing -->
                                        <tr>
                                          <td width="100%" height="15"
                                            style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                            &nbsp;</td>
                                        </tr>
                                        <!-- Spacing -->
                                        <!-- content -->
                                        <tr>
                                          <td
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: #687078; text-align: center; line-height: 24px;"
                                            st-content="3col-content3">
                                            <#list data.shippingMethods as shippingMethod> ${shippingMethod!}<br />
                                            </#list>
                                          </td>
                                        </tr>
                                        <!-- end of content -->

                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <!-- end of text content table -->
                              </tbody>
                            </table>
                          </td>
                          <!-- spacing -->
                          <!-- end of spacing -->
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- end of 3 Columns -->

    <!-- Start of separator -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable"
      st-sortable="separator">
      <tbody>
        <tr>
          <td>
            <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth">
              <tbody>
                <tr>
                  <td align="center" height="30" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
                <tr>
                  <td width="550" align="center" height="1" bgcolor="#d1d1d1" style="font-size: 1px; line-height: 1px;">
                    &nbsp;</td>
                </tr>
                <tr>
                  <td align="center" height="30" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End of separator -->

    <!-- Start of Cart -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable">
      <tbody>
        <tr>
          <td>
            <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
              <tbody>
                <tr>
                  <td width="100%">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                      <tbody>
                        <tr>
                          <td>
                            <!-- col 1 -->
                            <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0"
                              class="devicewidth">
                              <tbody>

                                <tr>
                                  <td>
                                    <!-- start of text content table -->
                                    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
                                      class="devicewidthinner">
                                      <tbody>

                                        <!-- title2 -->
                                        <tr>
                                          <td width="20%"
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #FFFFFF; text-align: right; line-height: 24px; background: #084f96; padding: 5px 10px 5px 10px;"
                                            st-title="3col-title1">
                                          </td>
                                          <td class="Place__Order-Item" width="40%"
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #ffffff; text-align: left; line-height: 24px; background: #084f96;"
                                            st-title="3col-title1">${getString("ORDER_PLACED_ITEM_TITLE")}</td>
                                          <td width="10%"
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #ffffff; text-align: left; line-height: 24px; background: #084f96; padding: 5px 10px 5px 10px;"
                                            st-title="3col-title1">
                                            ${getString("ORDER_PLACED_QUANTITY_TITLE")}
                                          </td>
                                          <td width="20%"
                                            style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #ffffff; text-align: center; line-height: 24px; background: #084f96; padding: 5px 10px 5px 10px;"
                                            st-title="3col-title1">
                                            ${getString("ORDER_PLACED_PRICE_TITLE")}
                                          </td>
                                        </tr>
                                        <!-- Spacing -->
                                        <tr>
                                          <td width="30%" height="15"
                                            style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                            &nbsp;</td>
                                          <td width="40%"
                                            style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                            &nbsp;</td>
                                          <td width="10%"
                                            style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                            &nbsp;</td>
                                          <td width="20%"
                                            style="font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                            &nbsp;</td>
                                        </tr>

                                        <!--  Start of order items list-->
                                        <#list data.orderItems as product>
                                          <tr>
                                            <td
                                              style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: #687078; text-align: left; line-height: 24px;"
                                              st-content="3col-content1" width="30%">
                                              <img style="border: 1px solid #cdcaca;" src="${product.imageLocation}"
                                                alt="${product.title!}" width="60%" height="100%">
                                            </td>
                                            <td
                                              style="font-family: Helvetica, arial, sans-serif; font-size: 14px; color: black; text-align: left; line-height: 24px; font-weight: bold;"
                                              st-content="3col-content1" width="40%">
                                              <a href="${product.location}">${product.title!}<br>
                                                <p style="font-weight:300;">${product.productId!}</p>
                                              </a>
                                              <!-- Variants -->
                                              <#if product.variants??>
                                                <#list product.variants as variant>
                                                  <#if variant.optionValue??>
                                                    <br />
                                                    ${variant.optionName}: ${variant.optionValue}
                                                  </#if>
                                                </#list>
                                              </#if>
                                            </td>
                                            <td
                                              style="font-family: Helvetica, arial, sans-serif; font-size: 14px; font-weight: 300; color: #687078; text-align: center; line-height: 24px;"
                                              st-content="3col-content1" width="10%">
                                              ${product.quantity}</td>
                                            <td
                                              style="font-family: Helvetica, arial, sans-serif; font-size: 14px; font-weight: 300; color: #687078; text-align: right; line-height: 24px; padding: 5px 20px 5px 10px;"
                                              st-content="3col-content1" width="20%">R$&nbsp;
                                              ${product.price}</td>
                                          </tr>
                                        </#list>
                                        <!--  End of order items list -->
                                      </tbody>
                                    </table>

                                    <!-- Start of separator -->
                                    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0"
                                      id="backgroundTable" st-sortable="separator">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table width="600" align="center" cellspacing="0" cellpadding="0" border="0"
                                              class="devicewidth">
                                              <tbody>
                                                <tr>
                                                  <td align="center" height="30"
                                                    style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                  <td width="550" align="center" height="1" bgcolor="#d1d1d1"
                                                    style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                  <td align="center" height="30"
                                                    style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table> <!-- End of separator -->
                                  </td>
                                </tr>
                                <!-- end of text content table -->
                              </tbody>
                            </table>
                      </tbody>
                    </table>
                  </td>
                  <!-- spacing -->
                  <!-- end of spacing -->
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <!-- end of Cart -->
  </body>

  </html>
  <#recover>
    ${.error}
</#attempt>