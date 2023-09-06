import { HttpHandler } from "./httpHandler";
import { Moneybird } from "./moneybird";
import { Administration } from "./administration";
import {IPayment, IPaymentCreate, ISalesInvoice} from "./common";

export class SalesInvoice {
  private readonly moneybird: Moneybird;
  private readonly administration: Administration;
  private readonly id: string;
  public readonly data: ISalesInvoice;
  private readonly HTTP: HttpHandler;

  constructor(
    moneybird: Moneybird,
    administration: Administration,
    data: ISalesInvoice
  ) {
    this.moneybird = moneybird;
    this.administration = administration;
    this.id = data.id;
    this.data = data;
    this.HTTP = new HttpHandler(
      this.administration.HTTP,
      `sales_invoices/${this.id}`
    );
  }

  /**
   * Download the PDF of the sales invoice
   * @returns The content of the PDF
   */
  public async downloadPDF(): Promise<string> {
    return this.HTTP.GET<string>("download_pdf");
  }

  /**
   * Download the UBL of the sales invoice
   * @returns The content of the UBL
   */
  public async downloadUBL(): Promise<string> {
    return this.HTTP.GET<string>("download_ubl");
  }

  /**
   * Download the packing slip of the sales invoice
   * @returns The PDF content of the packing slip
   */
  public async downloadPackingSlip(): Promise<string> {
    return this.HTTP.GET<string>("download_packing_slip_pdf");
  }

  /**
   * Add a payment to the sales invoice
   * @param payment The payment to add
   */
  public async addPayment(payment: IPaymentCreate): Promise<IPayment> {
    return this.HTTP.POST<IPayment>("payments", {
      payment: payment,
    });
  }

  /**
   * Delete a payment from the sales invoice
   * @param payment The payment to delete
   */
  public async deletePayment(payment: IPayment): Promise<void>
  /**
   * Delete a payment from the sales invoice
   * @param paymentId The ID of the payment to delete
   */
  public async deletePayment(paymentId: string): Promise<void>
  public async deletePayment(payment: IPayment | string): Promise<void>{
    let id = (typeof payment === "string") ? payment : payment.id;
    await this.HTTP.DELETE<void>(`payments/${id}`);
  }
}
