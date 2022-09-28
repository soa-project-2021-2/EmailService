function messageByStatus(status, idOrder) {
    switch (status) {
        case "created":
            return `Your order #${idOrder} has been created!`
            break;
        case "waiting_for_payment":
            return `Your order #${idOrder} is waiting for payment!`
            break;
        case "payment_approved":
            return `Your order #${idOrder} has been approved!`
            break;
        case "on_route":
            return `Your order #${idOrder} is coming to you!`
            break;
        case "delivered":
            return `Your order #${idOrder} has been delivered!`
            break;
        case "canceled":
            return `Your order #${idOrder} has been canceled!`
            break;
        default:
            return
    }
}

exports.messageByStatus = messageByStatus