import { IContact, IContactCreate } from "./common";
import { Moneybird } from "./moneybird";
import { Administration } from "./administration";
import { GaxiosOptions } from "gaxios/build/src/common";

export class Contact {
  private readonly moneybird: Moneybird;
  private readonly administration: Administration;
  private readonly id: string;
  public readonly data: IContact;

  constructor(
    moneybird: Moneybird,
    administration: Administration,
    data: IContact
  ) {
    this.moneybird = moneybird;
    this.administration = administration;
    this.id = data.id;
    this.data = data;
  }

  /**
   * Updates the contact with the given data
   * @param data The data to update the contact with
   */
  public async update(data: Partial<IContactCreate>): Promise<Contact> {
    const contact = await this.PATCH<IContact>("", { contact: data });
    return new Contact(this.moneybird, this.administration, contact);
  }

  /**
   * Deletes the contact from the administration
   */
  public async delete(): Promise<void> {
    await this.DELETE<void>("");
  }

  /**
   * Performs a GET request to the Moneybird API in the context of this contact
   * @param url The url to perform the request to
   * @param options The options for the request
   */
  public async GET<T>(url: string, options: GaxiosOptions = {}): Promise<T> {
    return await this.administration.GET<T>(
      `contacts/${this.id}/${url}`,
      options
    );
  }

  /**
   * Performs a POST request to the Moneybird API in the context of this contact
   * @param url The url to perform the request to
   * @param data The data to send with the request
   * @param options The options for the request
   */
  public async POST<T>(
    url: string,
    data: unknown,
    options: GaxiosOptions = {}
  ): Promise<T> {
    return await this.administration.POST<T>(
      `contacts/${this.id}/${url}`,
      data,
      options
    );
  }

  /**
   * Performs a PATCH request to the Moneybird API in the context of this contact
   * @param url The url to perform the request to
   * @param data The data to send with the request
   * @param options The options for the request
   */
  public async PATCH<T>(
    url: string,
    data: unknown,
    options: GaxiosOptions = {}
  ): Promise<T> {
    return await this.administration.PATCH<T>(
      `contacts/${this.id}/${url}`,
      data,
      options
    );
  }

  /**
   * Performs a DELETE request to the Moneybird API in the context of this contact
   * @param url The url to perform the request to
   * @param options The options for the request
   */
  public async DELETE<T>(url: string, options: GaxiosOptions = {}): Promise<T> {
    return await this.administration.DELETE<T>(
      `contacts/${this.id}/${url}`,
      options
    );
  }
}
