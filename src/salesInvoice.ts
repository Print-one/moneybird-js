import { HttpHandler } from "./httpHandler";
import { Moneybird } from "./moneybird";
import { Administration } from "./administration";
import { ISalesInvoice } from "./common";

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
}
