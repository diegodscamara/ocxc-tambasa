const { v4 } = require('uuid')

const creditCardPayload = (payload) => ({
    paymentId: payload.paymentId,
    transactionId: payload.transactionId,
    transactionType: payload.transactionType,
    transactionTimestamp: payload.transactionTimestamp,
    hostTransactionTimestamp: Date.now(),
    paymentMethod: payload.paymentMethod,
    orderId: payload.orderId,
    amount: payload.amount,
    currencyCode: payload.currencyCode,
    gatewayId: payload.gatewayId,
    siteId: payload.siteId,
    authorizationResponse: {
        responseCode: "1000",
        responseDescription: "Approved by dummy mock",
        responseReason: "All data is valid",
        authorizationCode: v4(),
        hostTransactionId: v4(),
        merchantTransactionId: v4(),
        token: v4()
    }
})

const invoicedPayload = (payload) => ({
    transactionId: payload.transactionId,
    transactionType: payload.transactionType,
    transactionTimestamp: payload.transactionTimestamp,
    organizationId: payload.organizationId,
    PONumber: payload.PONumber,
    referenceNumber: payload.referenceNumber,
    hostTransactionTimestamp: Date.now(),
    merchantTransactionTimestamp: Date.now(),
    paymentMethod: payload.paymentMethod,
    orderId: payload.orderId,
    amount: payload.amount,
    currencyCode: payload.currencyCode,
    siteId: payload.siteId,
    gatewayId: payload.gatewayId,
    // paymentId: payload.paymentId,
    authorizationResponse: {
        responseCode: "1000",
        responseDescription: "Approved by dummy mock",
        responseReason: "All data is valid",
        hostTransactionId: v4(),
        merchantTransactionId: v4()
        // authorizationCode: v4(),
        // token: v4()
    }
})

module.exports = {
    creditCardPayload,
    invoicedPayload
}