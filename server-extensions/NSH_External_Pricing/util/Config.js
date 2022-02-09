'use strict';

var condicoes = require('./condicoes.json');

class Config {
    constructor() {
        this._urlBase = 'api.mundipagg.com';
        this._urlAuthorize = '/core/v1/orders';

        this.condicoes = condicoes;

        this.examplePlayloadExpected = {
            "estado": "SP",
            "prd": [1],
            "valor": 400.0
        }
    }
}

module.exports = new Config();



/* Exemplo de payload de condicoes, populado pela equipe da tambasa


{
    "Condicao": [
        {
            "Cod": "01:P",
            "Estado": ["SP", "RJ", "BH"],
            "Prd": [1],
            "Cond": [
                {
                    "VMin": 125.0,
                    "A": 1.5,
                    "D": 0.0,
                    "P": 0.0,
                    "Prazo": "30\/60\/90",
                    "Vcmto": "11\/12\/2020"
                }
            ]
        },
        {
            "Cod": "02:P",
            "Estado": ["SP", "RJ", "BH"],
            "Prd": [],
            "Cond": [
                {
                    "VMin": 225.0,
                    "A": 2.5,
                    "D": 0.0,
                    "P": 0.0,
                    "Prazo": "30\/60",
                    "Vcmto": "11\/12\/2020"
                }
            ]
        },
        {
            "Cod": "03:P",
            "Estado": ["SP", "RJ", "BH"],
            "Prd": [],
            "Cond": [
                {
                    "VMin": 325.0,
                    "A": 3.5,
                    "D": 0.0,
                    "P": 0.0,
                    "Prazo": "30",
                    "Vcmto": "11\/12\/2020"
                }
            ]
        }
    ]
}
*/

/* 
    Exemplo de payload que o webhook de validação de external price envia. 
    Doc ref - https://docs.oracle.com/en/cloud/saas/cx-commerce/21d/ccdev/configure-webhook.html
*/

var payload_externalPricingValidation = {
    "profile": {
        "lastName": "PAI",
        "tipoUso_c": "Celular",
        "avisoPrivacidad_c": true,
        "subSegmento_c": "MOSTRADOR",
        "alias_c": null,
        "canalInscripcion_c": "eCommerce",
        "locale": "es",
        "parentOrganization": null,
        "saldoProgramasLealtad_c": "[]",
        "sitePropertiesList": [
            {
                "site": {
                    "id": "siteUS"
                },
                "properties": {
                    "numberOfVisits": 194,
                    "GDPRProfileP13nConsentDate": null,
                    "GDPRProfileP13nConsentGranted": false,
                    "receiveEmail": "yes",
                    "receiveEmailDate": "2021-10-18T21:15:15.983Z"
                }
            }
        ],
        "isUpdateCX_c": false,
        "profileType": null,
        "loyaltyPrograms": [],
        "CVIcuenta_c": null,
        "RFC_c": null,
        "nivel2_c": null,
        "registrationDate": "2021-10-18T21:15:16.000Z",
        "SEUScredito_c": null,
        "id": "8085279",
        "email": "isac.queiroz@nsh.com.br",
        "nivel1_c": null,
        "medicoPrescriptor_c": "[]",
        "daytimeTelephoneNumber": null,
        "customerContactId": null,
        "taxExempt": false,
        "razonSocial_c": null,
        "numeroEmpleado_c": null,
        "receiveEmail": "yes",
        "terminosCondiciones_c": null,
        "taxExemptionCode": null,
        "idEBScontado_c": null,
        "middleName_c": "MAE",
        "programasLealtad_c": "[{\"cardNumber\":\"MCDVP3985010\",\"programa\":\"MEMBRES\\u00cdA CALIDAD DE VIDA\",\"idPrograma\":\"208\",\"vigenteDesde\":\"2021-10-18Z\",\"vigenteHasta\":null,\"flagIntegrador\":\"0\",\"laboratorio\":\"Varios\"},{\"cardNumber\":\"CMP3985010\",\"programa\":\"COMBOS MOSTRADOR\",\"idPrograma\":\"466\",\"vigenteDesde\":\"2021-10-18Z\",\"vigenteHasta\":null,\"flagIntegrador\":\"0\",\"laboratorio\":\"Fesa\"},{\"cardNumber\":\"PAP3985010\",\"programa\":\"PROGRAMA ARMSTRONG\",\"idPrograma\":\"347\",\"vigenteDesde\":\"2021-10-18Z\",\"vigenteHasta\":null,\"flagIntegrador\":\"0\",\"laboratorio\":\"Armstrong\"},{\"cardNumber\":\"KTP3985010\",\"programa\":\"KETOCLUB TARJETA\",\"idPrograma\":\"240\",\"vigenteDesde\":\"2021-10-18Z\",\"vigenteHasta\":null,\"flagIntegrador\":\"0\",\"laboratorio\":\"Fresenius\"},{\"cardNumber\":\"BFP3985010\",\"programa\":\"BENEFICIOS FERRING\",\"idPrograma\":\"564\",\"vigenteDesde\":\"2021-10-18Z\",\"vigenteHasta\":null,\"flagIntegrador\":\"0\",\"laboratorio\":\"Ferring\"}]",
        "gender_c": "Masculino",
        "firstName": "ISAC",
        "creditCards": {},
        "SEUScontado_c": null,
        "idTelefonoPrincipal_c": "1758812",
        "tipo_c": "Paciente",
        "idCX_c": "3985010",
        "currentOrganization": null,
        "tratamientos_c": "[]",
        "segmento_c": "MOSTRADOR",
        "TelefonoPrincipal_c": "5566332255",
        "idEBScredito_c": null,
        "creditcards_c": null,
        "secondaryOrganizations": []
    },
    "externalPrices": [
        {
            "commerceItemId": "ci39001123",
            "externalPriceQuantity": 1,
            "catRefId": "6460",
            "externalPrice": 1000
        }
    ],
    "currencyCode": "MXN",
    "operation": "externalPricing",
    "order": {
        "taxPriceInfo": {
            "cityTax": 0,
            "secondaryCurrencyTaxAmount": 0,
            "amount": 0,
            "valueAddedTax": 0,
            "countyTax": 0,
            "isTaxIncluded": true,
            "miscTax": 0,
            "districtTax": 0,
            "stateTax": 0,
            "countryTax": 0
        },
        "shippingGroups": [
            {
                "taxPriceInfo": {
                    "cityTax": 0,
                    "secondaryCurrencyTaxAmount": 0,
                    "amount": 0,
                    "valueAddedTax": 0,
                    "countyTax": 0,
                    "isTaxIncluded": true,
                    "miscTax": 0,
                    "districtTax": 0,
                    "stateTax": 0,
                    "countryTax": 0
                },
                "priceInfo": {
                    "amount": 1000,
                    "total": 1000,
                    "lkpValExcludingFreeShip": null,
                    "shipping": 0,
                    "shippingSurchargeValue": 0,
                    "tax": 0,
                    "subTotal": 1000,
                    "currencyCode": "MXN",
                    "totalWithoutTax": 1000
                },
                "discountInfo": {
                    "orderDiscount": 0,
                    "shippingDiscount": 0,
                    "discountDescList": []
                },
                "shippingMethod": {
                    "secondaryCurrencyTaxAmount": 0,
                    "shippingTax": 0,
                    "cost": 0,
                    "taxIncluded": true,
                    "taxCode": "",
                    "value": "sm50001",
                    "shippingMethodDescription": "Envio"
                },
                "shippingGroupId": "sg451646",
                "shippingAddress": {
                    "lastName": "asd",
                    "country": "MX",
                    "city": "Puebla",
                    "inactivar_c": false,
                    "prefix": "",
                    "postalCode": "72100",
                    "companyName": "",
                    "jobTitle": "",
                    "county": "COLORINES",
                    "alias_c": "asd",
                    "longitud_c": "-98.2226",
                    "suffix": "",
                    "alias": "asd",
                    "state": "PUE",
                    "referencia_c": "aasd",
                    "email": "isac.queiroz@nsh.com.br",
                    "medicoPrescriptor_c": null,
                    "telefonoSecundario_c": null,
                    "address3": "123",
                    "address2": "123",
                    "address1": "asd",
                    "firstName": "asd",
                    "phoneNumber": "1111111111",
                    "delegacionMunicipio_c": "Puebla",
                    "latitud_c": "19.1055",
                    "tipoCobertura_c": null,
                    "faxNumber": "",
                    "idCX_c": null,
                    "middleName": "",
                    "idSucursal_c": null
                },
                "type": "hardgoodShippingGroup",
                "items": [
                    {
                        "rawTotalPrice": 1250,
                        "returnedQuantity": 0,
                        "dynamicProperties": [
                            {
                                "id": "ret_beneficios_c",
                                "label": "Return from ObtenerBeneficios service",
                                "value": "{\"idprograma\":\"240\",\"folio\":\"KTP3985010\",\"noAutorizacionTarjeta\":\"1893101\",\"noAutorizacionBeneficios\":\"74282534\",\"message\":\"Se te otorgó beneficio de programa KETOCLUB TARJETA - Precio Especial\",\"productos\":{\"codigoLista\":\"L_60110\",\"cantidadSolicitada\":\"1\",\"nombreListaPrecios\":\"LP_LEALTAD KETOCLUB MARZO\",\"orderLineItemId\":\"1\",\"tipoOferta\":\"12\",\"iva\":\"0\",\"descuentoPMP\":\"0\",\"costoReposicion\":\"0\",\"precioDeLista\":\"1000\",\"precioPMP\":\"1250\",\"idLista\":\"9812\",\"sku\":\"6460\",\"margen\":\"0.02\"},\"beneficios\":{\"piezas\":\"0\",\"precioFijo\":\"0\",\"porcentaje\":\"0\",\"restaPrecio\":\"0\"}}"
                            }
                        ],
                        "shippingSurchargeValue": 0,
                        "externalData": [],
                        "discountAmount": 0,
                        "preOrderQuantity": 0,
                        "externalPrice": 1000,
                        "commerceItemId": "ci18433889212331",
                        "price": 1000,
                        "onSale": false,
                        "stateDetailsAsUser": "The item has been initialized within the shipping group",
                        "commerceId": "ci39001123",
                        "unitPrice": 1250,
                        "amount": 1000,
                        "quantity": 1,
                        "pointOfNoRevision": false,
                        "relationshipType": "SHIPPINGQUANTITY",
                        "productId": "6460",
                        "salePrice": 0,
                        "externalPriceQuantity": 1,
                        "catRefId": "6460",
                        "discountInfo": [],
                        "siteId": "siteUS",
                        "shopperInput": {},
                        "asset": false,
                        "backOrderQuantity": 0,
                        "listPrice": 1250,
                        "status": "INITIAL"
                    }
                ]
            }
        ],
        "creationTime": 1634739556705,
        "creationSiteId": "siteUS",
        "orderId": "1-C430826",
        "lastModifiedDate": "2021-10-20T14:25:11.293Z",
        "allowAlternateCurrency": false,
        "dynamicProperties": [
            {
                "id": "calcPromo_c",
                "label": "calcPromo_c",
                "value": false
            },
            {
                "id": "controlBenefic_c",
                "label": "controlBenefic_c",
                "value": true
            },
            {
                "id": "idCX_c",
                "label": "Id Pedido CX",
                "value": null
            },
            {
                "id": "medicoPrescriptor_c",
                "label": "Medico Prescritor",
                "value": null
            },
            {
                "id": "urlReceta_c",
                "label": "URL Receta",
                "value": null
            },
            {
                "id": "shipping_c",
                "label": "shipping_c",
                "value": "{\"eligibleForProductWithSurcharges\":true,\"estimatedDeliveryDateGuaranteed\":false,\"shippingCost\":0,\"internationalDutiesTaxesFees\":0,\"taxIncluded\":true,\"displayName\":\"22/10/2021 entrega en horario abierto  de 11:00 a 18:00 hrs\",\"estimatedDeliveryDate\":\"22/10/2021\",\"shippingTotal\":1,\"shippingTax\":0,\"deliveryDays\":1,\"currency\":\"MEX\",\"subsidiaryId\":\"47\",\"sucursal\":\"PUEBLA 2\",\"date\":\"22/10/2021\",\"startTime\":\"10:00:00\",\"recipeEndTime\":\" \",\"endTime\":\"10:30:00\"}"
            },
            {
                "id": "shippingAddrCompl_c",
                "label": "shippingAddrCompl_c",
                "value": "{\"ranking\":1,\"subsidiaryId\":\"47\",\"name\":\"PUEBLA 2\",\"latitude\":19.034094,\"longitude\":-98.1903721,\"coverage\":\"Foránea programada\",\"frequency\":\"[\\\"Mon\\\",\\\"Tue\\\",\\\"Wed\\\",\\\"Thu\\\",\\\"Fri\\\",\\\"Sat\\\",\\\"Sun\\\"]\",\"state\":\"PUEBLA\",\"cityHall\":\"PUEBLA\",\"suburb\":\"AZCARATE\",\"zipCode\":\"72501\"}"
            },
            {
                "id": "deliveryType_c",
                "label": "delivery option chosen",
                "value": "domicilio"
            },
            {
                "id": "idSucursalPedido_c",
                "label": "id Sucursal Pedido",
                "value": "47"
            },
            {
                "id": "deliveryData_c",
                "label": "delivery data",
                "value": "{\"orderIdReceived\":\"1-C430826\",\"shippingMethods\":[{\"eligibleForProductWithSurcharges\":true,\"estimatedDeliveryDateGuaranteed\":false,\"shippingCost\":0,\"internationalDutiesTaxesFees\":0,\"taxIncluded\":true,\"displayName\":\"21/10/2021 entrega en horario abierto  de 11:00 a 18:00 hrs\",\"estimatedDeliveryDate\":\"21/10/2021\",\"shippingTotal\":1,\"shippingTax\":0,\"deliveryDays\":1,\"currency\":\"MEX\",\"subsidiaryId\":\"47\",\"sucursal\":\"PUEBLA 2\",\"date\":\"21/10/2021\",\"startTime\":\"10:30:00\",\"recipeEndTime\":\" \",\"endTime\":\"11:00:00\"},{\"eligibleForProductWithSurcharges\":true,\"estimatedDeliveryDateGuaranteed\":false,\"shippingCost\":0,\"internationalDutiesTaxesFees\":0,\"taxIncluded\":true,\"displayName\":\"22/10/2021 entrega en horario abierto  de 11:00 a 18:00 hrs\",\"estimatedDeliveryDate\":\"22/10/2021\",\"shippingTotal\":1,\"shippingTax\":0,\"deliveryDays\":1,\"currency\":\"MEX\",\"subsidiaryId\":\"47\",\"sucursal\":\"PUEBLA 2\",\"date\":\"22/10/2021\",\"startTime\":\"10:00:00\",\"recipeEndTime\":\" \",\"endTime\":\"10:30:00\"},{\"eligibleForProductWithSurcharges\":true,\"estimatedDeliveryDateGuaranteed\":false,\"shippingCost\":0,\"internationalDutiesTaxesFees\":0,\"taxIncluded\":true,\"displayName\":\"23/10/2021 entrega en horario abierto  de 11:00 a 18:00 hrs\",\"estimatedDeliveryDate\":\"23/10/2021\",\"shippingTotal\":1,\"shippingTax\":0,\"deliveryDays\":1,\"currency\":\"MEX\",\"subsidiaryId\":\"47\",\"sucursal\":\"PUEBLA 2\",\"date\":\"23/10/2021\",\"startTime\":\"10:00:00\",\"recipeEndTime\":\" \",\"endTime\":\"10:30:00\"}],\"error\":{\"code\":\"0\",\"message\":\"\"}}"
            },
            {
                "id": "shippingAddressFromOrder_c",
                "label": "shippingAddressFromOrder_c",
                "value": "null"
            },
            {
                "id": "order_seq",
                "label": "order_seq",
                "value": "5"
            },
            {
                "id": "idPedidoCx_c",
                "label": "idPedidoCx_c",
                "value": null
            },
            {
                "id": "ticketV_c",
                "label": "ticketV_c",
                "value": null
            },
            {
                "id": "gfe_payment",
                "label": "Tipo pago",
                "value": "Efectivo"
            }
        ],
        "payments": [],
        "shippingMethod": {
            "shippingTax": 0,
            "cost": 0,
            "value": "sm50001"
        },
        "priceListGroup": {
            "displayName": "1|NA_LISTA|MASTER|4|16",
            "repositoryId": "listaPrecioMostradorIVA16"
        },
        "orderStatus": "Incompleta",
        "cartName": "1-C430826",
        "creationDate": "2021-10-20T14:19:16.705Z",
        "orderProfileId": "8085279",
        "orderAction": "order",
        "priceInfo": {
            "amount": 1000,
            "total": 1000,
            "shipping": 0,
            "shippingSurchargeValue": 0,
            "tax": 0,
            "subTotal": 1000,
            "currencyCode": "MXN",
            "totalWithoutTax": 1000
        },
        "discountInfo": {
            "unclaimedCouponMultiPromotions": {},
            "orderCouponsMap": {},
            "orderDiscount": 0,
            "shippingDiscount": 0,
            "orderImplicitDiscountList": [],
            "unclaimedCouponsMap": {},
            "claimedCouponMultiPromotions": {}
        },
        "shoppingCart": {
            "numberOfItems": 1,
            "items": [
                {
                    "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v1201448159731823089/products/6460.png&height=100&width=100",
                    "rawTotalPrice": 1250,
                    "displayName": "KETOSTERIL 630 g TAB CAJ C/100",
                    "dynamicProperties": [
                        {
                            "id": "ret_beneficios_c",
                            "label": "Return from ObtenerBeneficios service",
                            "value": "{\"idprograma\":\"240\",\"folio\":\"KTP3985010\",\"noAutorizacionTarjeta\":\"1893101\",\"noAutorizacionBeneficios\":\"74282534\",\"message\":\"Se te otorgó beneficio de programa KETOCLUB TARJETA - Precio Especial\",\"productos\":{\"codigoLista\":\"L_60110\",\"cantidadSolicitada\":\"1\",\"nombreListaPrecios\":\"LP_LEALTAD KETOCLUB MARZO\",\"orderLineItemId\":\"1\",\"tipoOferta\":\"12\",\"iva\":\"0\",\"descuentoPMP\":\"0\",\"costoReposicion\":\"0\",\"precioDeLista\":\"1000\",\"precioPMP\":\"1250\",\"idLista\":\"9812\",\"sku\":\"6460\",\"margen\":\"0.02\"},\"beneficios\":{\"piezas\":\"0\",\"precioFijo\":\"0\",\"porcentaje\":\"0\",\"restaPrecio\":\"0\"}}"
                        }
                    ],
                    "shippingSurchargeValue": 0,
                    "discountAmount": 0,
                    "externalData": [],
                    "description": "KETOSTERIL 630 g TAB CAJ C/100",
                    "isItemValid": true,
                    "itemDiscountInfos": [],
                    "externalPrice": 1000,
                    "commerceItemId": "ci18433889212331",
                    "price": 1000,
                    "variant": [],
                    "primaryImageAltText": "KETOSTERIL 630 g TAB CAJ C/100",
                    "onSale": false,
                    "id": "ci39001123",
                    "state": "Agregado a la orden",
                    "stateKey": "INITIAL",
                    "unitPrice": 1250,
                    "primaryImageTitle": "KETOSTERIL 630 g TAB CAJ C/100",
                    "childSKUs": [
                        {
                            "primaryThumbImageURL": null
                        }
                    ],
                    "amount": 1000,
                    "quantity": 1,
                    "productId": "6460",
                    "pointOfNoRevision": false,
                    "salePrice": 0,
                    "orderDiscountInfos": [],
                    "detailedItemPriceInfo": [
                        {
                            "discounted": false,
                            "secondaryCurrencyTaxAmount": 0,
                            "amount": 1000,
                            "quantity": 1,
                            "configurationDiscountShare": 0,
                            "tax": 0,
                            "orderDiscountShare": 0,
                            "detailedUnitPrice": 1000,
                            "currencyCode": "MXN"
                        }
                    ],
                    "giftWithPurchaseCommerceItemMarkers": [],
                    "externalPriceQuantity": 1,
                    "taxCode": "0",
                    "catRefId": "6460",
                    "skuProperties": [
                        {
                            "propertyType": "sku-base",
                            "name": "listingSKUId",
                            "id": "listingSKUId",
                            "value": null
                        },
                        {
                            "propertyType": "sku-base",
                            "name": "Devolución no permitida",
                            "id": "nonreturnable",
                            "value": false
                        },
                        {
                            "propertyType": "sku-base",
                            "name": "Nombre",
                            "id": "displayName",
                            "value": "KETOSTERIL 630 g TAB CAJ C/100"
                        },
                        {
                            "propertyType": "sku-base",
                            "name": "Activo",
                            "id": "active",
                            "value": true
                        },
                        {
                            "propertyType": "sku-base",
                            "name": "ID",
                            "id": "id",
                            "value": "6460"
                        },
                        {
                            "propertyType": "sku-base",
                            "name": "Admite descuento",
                            "id": "discountable",
                            "value": true
                        },
                        {
                            "propertyType": "sku-custom",
                            "name": "EAN",
                            "id": "ean_c",
                            "value": "7501052713226AA"
                        }
                    ],
                    "route": "/medicamentos/detalle/6460-ketosteril-630-g-tab-caj-c100",
                    "discountInfo": [],
                    "siteId": "siteUS",
                    "shopperInput": {},
                    "asset": false,
                    "listPrice": 1250
                }
            ]
        },
        "giftWithPurchaseInfo": [],
        "siteId": "siteUS",
        "shippingAddress": {
            "lastName": "asd",
            "country": "MX",
            "city": "Puebla",
            "inactivar_c": false,
            "prefix": "",
            "postalCode": "72100",
            "companyName": "",
            "jobTitle": "",
            "county": "COLORINES",
            "alias_c": "asd",
            "longitud_c": "-98.2226",
            "suffix": "",
            "alias": "asd",
            "state": "PUE",
            "referencia_c": "aasd",
            "email": "isac.queiroz@nsh.com.br",
            "medicoPrescriptor_c": null,
            "telefonoSecundario_c": null,
            "address3": "123",
            "address2": "123",
            "address1": "asd",
            "firstName": "asd",
            "phoneNumber": "1111111111",
            "delegacionMunicipio_c": "Puebla",
            "latitud_c": "19.1055",
            "tipoCobertura_c": null,
            "faxNumber": "",
            "idCX_c": null,
            "middleName": "",
            "idSucursal_c": null
        }
    }
}

/*

 var payload = {
    "id": "id",
    "items": [{
        "id": item,
        "productId": commerceItems[item].productId,
        "quantity": commerceItems[item].quantity,
        "salePrice": commerceItems[item].salePrice,
        "rawTotalPrice": commerceItems[item].rawTotalPrice
    }]
}

    "Prd": [1],
    "Cond": [
        {
            "VMin": 125.0,
            "A": 1.5,
            "D": 0.0,
            "P": 0.0,
            "Prazo": "30\/60\/90",
            "Vcmto": "11\/12\/2020"
        }
    ]

*/