import { Moneybird } from "./moneybird";
import { IAdministration, IContact, IContactCreate } from "./common";
import { Contact } from "./contact";
import { HTTP, HttpHandler } from "./httpHandler";

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
    pagination: PaginatedOptions
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
}
