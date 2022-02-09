'use strict';
var config = require('../util/Config.js');

class Services {
    listPrice(req, res) {
        var util = this;
        var cart = req.body;
        var condicoesValidas = [];

        config.condicoes.Condicao.forEach(function (_condicao) {
            if (_condicao.Estado.includes(cart.estado)) {//verificando se a condicao aceita o estado atual do carrinho
                if (util.validarPrecoCondicao(_condicao.Cond, cart.valor)) {//valida se o preco do cart e maior do que o preco minimo para entrar na condicao
                    if (_condicao.Prd.length > 0) {//condicao aceita apenas produtos expecificos
                        //Aqui precisa validar se o produto se enquadra na condicao.
                        //Ponto de duvida, se o produto não estiver na condicao, eu devo considerar a condicao? Porque se sim, entao qual a regra de exclusao de produtos?
                        //Eu devo só adicionar um incremento no valor dele?
                        if (util.validarProdutosCondicao(_condicao.Prd, cart.prd)) {//Valida se ao menos 1 dos produtos no carrinho pode entrar na condicao
                            condicoesValidas.push(util.gerarPayloadCondicoesValidas(_condicao, cart.valor));//adiciona as condicoes validas o ID da condicao e o prazo / vcmto
                        }
                    } else {//condicao aceita todos os produtos
                        condicoesValidas.push(util.gerarPayloadCondicoesValidas(_condicao, cart.valor));//adiciona as condicoes validas o ID da condicao e o prazo / vcmto
                    }
                }
            }
        });

        res.status(200).json({ "list": condicoesValidas });
    }

    validarProdutosCondicao(prdCondicoes, prdCarts) {
        var isValid = false;
        for (var i = 0; i < prdCarts.length; i++) {
            if (prdCondicoes.includes(prdCarts[i])) { isValid = true; break; }
        }
        return isValid;
    }

    validarPrecoCondicao(cond, preco) {
        var isValid = false;
        for (var i = 0; i < cond.length; i++) {
            if (preco >= cond[i].VMin) { isValid = true; break; }
        }
        return isValid;
        /*cond.forEach(function (condicao) { if (preco >= condicao.VMin) { isValid = true; } });*/
    }

    gerarPayloadCondicoesValidas(condicao, preco) {
        var obj = {
            "Cod": condicao.Cod,
            "Cond": []
        }

        condicao.Cond.forEach(function (cond) {
            if (preco >= cond.VMin) {
                var juros = "";
                if (cond.A > 0) {
                  juros = "+" + cond.A + "%";
                } else if (cond.D > 0) {
                  juros = "-" + cond.D + "%";
                } else if(cond.P > 0) {
                  juros = "+" + cond.P + "% para produtos não inclusos na promoção"
                }
                obj.Cond.push({
                    "Prazo": condicao.Cod.replace(":", "") + ": " + cond.Prazo +  " " + juros,
                    "Vcmto": cond.Vcmto,
                });
            }
        });

        return obj;
    }

    calculatePrice(req, res) {
        var util = this;
        var cart = req.body;
        var idCond = cart.idCond;

        //console.log("Cart 1", JSON.stringify(cart));

        var condicao = config.condicoes.Condicao.find(function (cond) { return cond.Cod == cart.id });
        if (condicao && condicao.Cond[idCond]) {

            if (condicao.Prd.length > 0) {//condicao aceita apenas produtos expecificos
                cart.items.forEach(function (item) {
                    if (condicao.Prd.includes(item.productId)) {//produto se enquadra na condicao

                        if (item.salePrice > 0) {
                            var price = item.salePrice;
                            var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                            var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                            item["externalPrice"] = (price + priceAcrescimo) - priceDesconto;
                            item["externalQuantity"] = -1;
                        } else if (item.listPrice != undefined) {
                            var price = item.listPrice;
                            var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                            var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                            item["externalPrice"] = (price + priceAcrescimo) - priceDesconto;
                            item["externalQuantity"] = -1;
                        } else {
                            var price = item.rawTotalPrice / item.quantity;
                            var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                            var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                            item["externalPrice"] = (price + priceAcrescimo) - priceDesconto;
                            item["externalQuantity"] = -1;
                        }

                    } else {//produto fora da condicao
                        if (item.salePrice > 0) {
                            var price = item.salePrice;
                            var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                            var priceNaoAutorizados = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].P);
                            var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                            item["externalPrice"] = (price + priceAcrescimo + priceNaoAutorizados) - priceDesconto;
                            item["externalQuantity"] = -1;
                        } else if (item.salePrice != undefined) {
                            var price = item.listPrice;
                            var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                            var priceNaoAutorizados = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].P);
                            var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                            item["externalPrice"] = (price + priceAcrescimo + priceNaoAutorizados) - priceDesconto;
                            item["externalQuantity"] = -1;
                        } else {
                            var price = item.rawTotalPrice / item.quantity;
                            var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                            var priceNaoAutorizados = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].P);
                            var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                            item["externalPrice"] = (price + priceAcrescimo + priceNaoAutorizados) - priceDesconto;
                            item["externalQuantity"] = -1;
                        }

                    }
                });
            } else {
                cart.items.forEach(function (item) {

                    if (item.salePrice > 0) {
                        var price = item.salePrice;
                        var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                        var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                        item["externalPrice"] = (price + priceAcrescimo) - priceDesconto;
                        item["externalQuantity"] = -1;
                    } else if (item.listPrice != undefined) {
                        var price = item.listPrice;
                        var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                        var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                        item["externalPrice"] = (price + priceAcrescimo) - priceDesconto;
                        item["externalQuantity"] = -1;
                    } else {
                        var price = item.rawTotalPrice / item.quantity;
                        var priceAcrescimo = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].A);
                        var priceDesconto = util.calculatePercents(price, item.quantity, condicao.Cond[idCond].D);

                        item["externalPrice"] = (price + priceAcrescimo) - priceDesconto;
                        item["externalQuantity"] = -1;
                    }

                });
            }

            // Tambasa team needs due date value in order
            cart.prazo = condicao.Cond[idCond].Prazo
            
        } else {
            //O que fazer no caso de não encontrar uma lista de preço?? xx
        }

        res.status(200).json(cart);
    }

    /**
     * @author isac.queiroz
     * @description Função que calcula a porcentagem com base nos argumentos recebidos
     * @param {Number} price 
     * @param {Number | undefined } quantity Argumento mantido, pois a regra tende a mudar
     * @param {Number} porcent 
     * @returns {Number}
     */
    calculatePercents(price, quantity, porcent) {
        var procentInDecimal = porcent / 100;
        return ((price) * procentInDecimal);
    }

    validatePrice(req, res) {
        var payload = req.body;
        var shoppingCart = payload.order.shoppingCart.items;
        var externalItems = payload.externalPrices;
        var condicaoFromOCC = payload.order.dynamicProperties.find(function (props) { return props.id == "tam_externalPricingID" });

        var responseValidationCode = "5002"; /* 5001 (VALID_EXTERNAL_PRICES), 5002 (INVALID_EXTERNAL_PRICES) */

        if (condicaoFromOCC && condicaoFromOCC != "") {
            var condicaoSelecionada = condicaoFromOCC.value;
            if (condicaoSelecionada == "__reset") {
                responseValidationCode = "5001";
            } else {
                if (condicaoSelecionada && condicaoSelecionada != "") {
                    var condicao = config.condicoes.Condicao.find(function (cond) { return cond.Cod == condicaoSelecionada });
                    if (condicao && condicao != "") {
                        if (this.isExternalPriceValid(shoppingCart, externalItems, condicao)) {
                            responseValidationCode = "5001";
                        }
                    }
                }
            }
        }

        res.status(200).json({ "ResponseCode": responseValidationCode });
    }

    isExternalPriceValid(shoppingCart, externalItems, condition) {
        var self = this;
        var isValid = true;

        shoppingCart.forEach(function (item) {//Percorre todos os itens do cart
            var externalItem = externalItems.find(function (item_) { return item_.commerceItemId == item.id });//Busca o item atual do cart no array de external prices
            if (externalItem) {//Checa se o item do cart existe no external price
                var isQtdValid = externalItem.externalPriceQuantity == -1;//Verifica se a quantia de itens no cart é a mesma quantia de itens no external price 
                var isPriceEquals = externalItem.externalPrice == item.externalPrice;//Verifica se o preço dos itens no cart é o mesmo preço dos itens no external price

                if (isQtdValid && isPriceEquals) {//Caso os preços e a quantia sejam as mesmas, do cart e do external price
                    var price = item.unitPrice;
                    var priceAcrescimo = self.calculatePercents(price, item.quantity, condition.Cond[0].A);
                    var priceDesconto = self.calculatePercents(price, item.quantity, condition.Cond[0].D);
                    var priceNaoAutorizados = (condition.Prd.length == 0 || condition.Prd.includes(item.id)) ? 0 : self.calculatePercents(price, item.quantity, condition.Cond[0].P);
                    var totalPrice = (price + priceAcrescimo + priceNaoAutorizados) - priceDesconto;

                    if (!(externalItem.externalPrice.toFixed(3) == totalPrice.toFixed(3))) isValid = false;
                } else {
                    isValid = false;
                }
            } else {
                isValid = false;
            }
        });

        return isValid;
    }
}
module.exports = new Services();

/*
    Duvidas

    01 - As condicoes vem em formato de lista, existe algum cenário onde possa haver mais d uma condição? condicao.Cond[0].A - Caso possa vir, qual condição eu considero?
    02 - Como deve ser feito o calculo total? É porcentagem encima d porcentagem? Ou é porcentagem encima do total e depois soma tudo?

*/