import { Moneybird } from "./moneybird";
import {
  IAdministration,
  IContact,
  IContactCreate,
  ICustomField,
  ISalesInvoice,
  ISalesInvoiceCreate,
  ISalesInvoiceState,
  ITax,
  ITaxRateType,
} from "./common";
import { Contact } from "./contact";
import { HTTP, HttpHandler } from "./httpHandler";
import { SalesInvoice } from "./salesInvoice";

type PaginatedOptions = Partial<{
  // The page to return
  page: number;
  // The amount of contacts to return per page
  per_page: number;
  // Whether to include archived contacts
  include_archived: boolean;
}>;

export class Administration {
  private readonly moneybird: Moneybird;
  private readonly id: string;
  public readonly data: IAdministration;

  constructor(moneybird: Moneybird, data: IAdministration) {
    this.moneybird = moneybird;
    this.id = data.id;
    this.data = data;
    this.HTTP = new HttpHandler(this.moneybird, `${this.id}`);
  }

  //////////////////////////  CONTACTS  //////////////////////////
  //region Contacts

  /**
   * To perform requests to the Moneybird API in the context of this administration
   */
  public readonly HTTP: HTTP;

  /**
   * Returns a list of all contacts in the administration
   * @param params The parameters for the request
   */
  public async contacts(
    params?: Partial<
      PaginatedOptions & {
        // The query to search for in the following fields:
        // company_name, attention, firstname, lastname, address1, address2, zipcode, city, country, email, phone, customer_id, tax_number, chamber_of_commerce, bank_account
        query: string;
      }
    >
  ): Promise<Contact[]> {
    const contacts = await this.HTTP.GET<IContact[]>("contacts", {
      params,
    });

    return contacts.map((c) => new Contact(this.moneybird, this, c));
  }

  /**
   * Returns a filtered list of all contacts in the administration
   * @param filter The filter to apply to the contacts
   * @param pagination The pagination options
   */
  public async filterContacts(
    filter: Partial<{
      // The first name of the contact case-insensitive
      first_name: string;
      // The last name of the contact case-insensitive
      last_name: string;
      // The date the contact was created
      created_after: string;
      // The date the contact was last updated
      updated_after: string;
    }>,
    pagination: PaginatedOptions = {}
  ): Promise<Contact[]> {
    const filterString = Object.entries(filter)
      .map(([key, value]) => `${key}:${value}`)
      .join(",");

    const contacts = await this.HTTP.GET<IContact[]>(`contacts/filter`, {
      params: {
        filter: filterString,
        ...pagination,
      },
    });

    return contacts.map((c) => new Contact(this.moneybird, this, c));
  }

  // TODO endpoint for /contacts/synchronization

  /**
   * Returns a contact object with the given id
   * @param id The id of the contact
   */
  public async getContact(id: string): Promise<Contact> {
    const contact = await this.HTTP.GET<IContact>(`contacts/${id}`);

    return new Contact(this.moneybird, this, contact);
  }

  /**
   * Returns a contact object with the given customer id
   * @param id The customer id of the contact
   */
  public async getCustomer(id: string): Promise<Contact> {
    const contact = await this.HTTP.GET<IContact>(`contacts/customer_id/${id}`);

    return new Contact(this.moneybird, this, contact);
  }

  /**
   * Returns a contact object without fetching the data from the API
   * This is useful when you already have the contact id and want to perform actions on it
   * @param id The id of the contact
   */
  public contact(id: string): Contact {
    return new Contact(this.moneybird, this, { id } as IContact);
  }

  /**
   * Creates a new contact in the administration
   * @param contact The contact to create
   */
  public async createContact(
    contact: Partial<IContactCreate>
  ): Promise<Contact> {
    if (!(contact.company_name || (contact.firstname && contact.lastname))) {
      throw new Error(
        "Either company_name or first_name and last_name must be set"
      );
    }

    const data = await this.HTTP.POST<IContact>("contacts", { contact });

    return new Contact(this.moneybird, this, data);
  }

  //endregion Contacts

  //////////////////////////  INVOICES  //////////////////////////
  //region Invoices

  /**
   * Returns a list of all sales invoices in the administration
   */
  public async salesInvoices(
    params?: PaginatedOptions
  ): Promise<SalesInvoice[]> {
    const invoices = await this.HTTP.GET<ISalesInvoice[]>("sales_invoices", {
      params,
    });

    return invoices.map((i) => new SalesInvoice(this.moneybird, this, i));
  }

  /**
   * Returns a list of all sales invoices in the administration that match the given filter
   * @param filter The filter to apply to the invoices
   * @param pagination The pagination options
   */
  public async filterSalesInvoices(
    filter: Partial<{
      // The state of the invoice
      state: "all" | ISalesInvoiceState | ISalesInvoiceState[];
      // The period of the invoice, can also be in format YYMMDD..YYMMDD;
      // e.g. 150101..150131 means 1 january 2015 until 31 january 2015
      period:
        | "this_month"
        | "prev_month"
        | "next_month"
        | "this_quarter"
        | "prev_quarter"
        | "next_quarter"
        | "this_year"
        | "prev_year"
        | "next_year"
        | string;
      // Select invoices with a certain reference
      reference: string;
      // Select invoices belonging to a certain contact
      contact_id: string;
      // Select invoices created by a certain recurring invoice
      recurring_sales_invoice_id: string;
      // Select invoices that use a certain workflow
      workflow_id: string;
      // Select invoices created after the given time (exclusive). ISO 8601 formatted string. The time to compare with is in UTC timezone
      created_after: string;
      // Select invoices updated after the given time (exclusive). ISO 8601 formatted string. The time to compare with is in UTC timezone
      updated_after: string;
    }>,
    pagination: PaginatedOptions = {}
  ): Promise<SalesInvoice[]> {
    let filterParam = "";

    if (filter) {
      filterParam = Object.entries(filter)
        // @ts-expect-error TS doesn't know that the value is an array
        .map(([key, value]) => `${key}:${value.join ? value.join("|") : value}`)
        .join(",");
    }

    const invoices = await this.HTTP.GET<ISalesInvoice[]>("sales_invoices", {
      params: {
        filter: filterParam,
        ...pagination,
      },
    });

    return invoices.map((i) => new SalesInvoice(this.moneybird, this, i));
  }

  /**
   * Returns a sales invoice object with the given id
   * @param id The id of the sales invoice
   */
  public async getSalesInvoice(id: string): Promise<SalesInvoice> {
    const invoice = await this.HTTP.GET<ISalesInvoice>(`sales_invoices/${id}`);

    return new SalesInvoice(this.moneybird, this, invoice);
  }

  /**
   * Returns a sales invoice object without fetching the data from the API
   * This is useful when you already have the invoice id and want to perform actions on it
   * @param id The id of the sales invoice
   */
  public salesInvoice(id: string): SalesInvoice {
    return new SalesInvoice(this.moneybird, this, { id } as ISalesInvoice);
  }

  /**
   * Creates a new sales invoice in the administration
   * @param invoice The invoice to create
   */
  public async createSalesInvoice(
    invoice: Partial<ISalesInvoiceCreate>
  ): Promise<SalesInvoice> {
    const data = await this.HTTP.POST<ISalesInvoice>("sales_invoices", {
      sales_invoice: invoice,
    });

    return new SalesInvoice(this.moneybird, this, data);
  }

  //endregion Invoices

  //////////////////////////  TAXES  //////////////////////////
  //region Taxes

  /**
   * Returns a list of all taxes in the administration
   */
  public async taxes(params?: PaginatedOptions): Promise<ITax[]> {
    return await this.HTTP.GET<ITax[]>("tax_rates", { params });
  }

  /**
   * Returns a list of all taxes in the administration that match the given filter
   * @param filter The filter to apply to the taxes
   * @param pagination The pagination options
   */
  public async filterTaxes(
    filter: Partial<{
      // Select taxes with a certain name
      name: string;
      // Select taxes with a partial name
      partial_name: string;
      // Select taxes with a certain percentage
      percentage: number;
      // Select taxes with a certain type
      tax_rate_type: "all" | ITaxRateType | ITaxRateType[];
      // Select taxes within a certain country
      country: string;
      // Select taxes that are visible on the invoice
      show_tax: boolean;
      // Select taxes that are active
      active: boolean;
      // Select taxes created after the given time (exclusive). ISO 8601 formatted string. The time to compare with is in UTC timezone
      created_after: string;
      // Select taxes updated after the given time (exclusive). ISO 8601 formatted string. The time to compare with is in UTC timezone
      updated_after: string;
    }>,
    pagination: PaginatedOptions = {}
  ): Promise<ITax[]> {
    let filterParam = "";

    if (filter) {
      filterParam = Object.entries(filter)
        // @ts-expect-error TS doesn't know that the value is an array
        .map(([key, value]) => `${key}:${value.join ? value.join("|") : value}`)
        .join(",");
    }

    return await this.HTTP.GET<ITax[]>("tax_rates", {
      params: {
        filter: filterParam,
        ...pagination,
      },
    });
  }
  //endregion Taxes

  //////////////////////////  CUSTOM FIELDS  //////////////////////////
  //region Custom Fields

  /**
   * Returns a list of all custom fields in the administration
   */
  public async customFields(
    params?: PaginatedOptions
  ): Promise<ICustomField[]> {
    return await this.HTTP.GET<ICustomField[]>("custom_fields", { params });
  }
  //endregion Custom Fields
  
  
}
