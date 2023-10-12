import { HttpHandler } from "./httpHandler";
import { Moneybird } from "./moneybird";
import { Administration } from "./administration";
import {
 IAttachment, IPayment,
  IPaymentCreate,
  ISalesInvoice,
  ISalesInvoiceSending,
} from "./common";

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
   * Send the sales invoice
   * @returns A sales invoice
   */
  public async send(data: ISalesInvoiceSending = {}): Promise<SalesInvoice> {
    return this.HTTP.PATCH<SalesInvoice>("send_invoice", {
      sales_invoice_sending: data,
    });
  }

  /**
   * Download the PDF of the sales invoice
   * @returns The content of the PDF
   */
  public async downloadPDF(): Promise<ArrayBuffer> {
    return this.HTTP.GET<ArrayBuffer>("download_pdf", {
      responseType: "arraybuffer",
    });
  }

  /**
   * Download the UBL of the sales invoice
   * @returns The content of the UBL
   */
  public async downloadUBL(): Promise<ArrayBuffer> {
    return this.HTTP.GET<ArrayBuffer>("download_ubl", {
      responseType: "arraybuffer",
    });
  }

  /**
   * Download the packing slip of the sales invoice
   * @returns The PDF content of the packing slip
   */
  public async downloadPackingSlip(): Promise<ArrayBuffer> {
    return this.HTTP.GET<ArrayBuffer>("download_packing_slip_pdf", {
      responseType: "arraybuffer",
    });
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
  public async deletePayment(payment: IPayment): Promise<void>;
  /**
   * Delete a payment from the sales invoice
   * @param paymentId The ID of the payment to delete
   */
  public async deletePayment(paymentId: string): Promise<void>;
  public async deletePayment(payment: IPayment | string): Promise<void> {
    const id = typeof payment === "string" ? payment : payment.id;
    await this.HTTP.DELETE<void>(`payments/${id}`);
  }

  /**
   * Add attachment to the sales invoice
   */
  public async addAttachment(content: ArrayBuffer): Promise<void> {
    const formData = new FormData();
    formData.append("file", new Blob([content]));

    return this.HTTP.POST("attachments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Delete attachment from the sales invoice
   */
  public async deleteAttachment(attachment: IAttachment): Promise<void>;
  public async deleteAttachment(attachmentId: string): Promise<void>;
  public async deleteAttachment(
    attachment: IAttachment | string
  ): Promise<void> {
    const attachmentId =
      typeof attachment === "string" ? attachment : attachment.id;
    return this.HTTP.DELETE<void>(`attachments/${attachmentId}`);
  }

  /**
   * Download attachment from the sales invoice
   */
  public async downloadAttachment(
    attachment: IAttachment
  ): Promise<ArrayBuffer>;
  public async downloadAttachment(attachmentId: string): Promise<ArrayBuffer>;
  public async downloadAttachment(
    attachment: IAttachment | string
  ): Promise<ArrayBuffer> {
    const attachmentId =
      typeof attachment === "string" ? attachment : attachment.id;
    return this.HTTP.GET<ArrayBuffer>(`attachments/${attachmentId}/download`, {
      responseType: "arraybuffer",
    });
  }
}
