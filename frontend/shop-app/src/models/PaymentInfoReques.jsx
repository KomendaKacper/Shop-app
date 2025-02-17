class PaymentInfoRequest {
    constructor(amount, currency, receiptEmail = null) {
      this.amount = amount;
      this.currency = currency;
      this.receiptEmail = receiptEmail;
    }
  }
export default PaymentInfoRequest;