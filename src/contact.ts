import { IContact, IContactCreate } from "./common";
import { Moneybird } from "./moneybird";
import { Administration } from "./administration";
import { HTTP, HttpHandler } from "./httpHandler";

export class Contact {
  private readonly moneybird: Moneybird;
  private readonly administration: Administration;
  private readonly id: string;
  public readonly data: IContact;

  constructor(
    moneybird: Moneybird,
    administration: Administration,
    data: IContact,
  ) {
    this.moneybird = moneybird;
    this.administration = administration;
    this.id = data.id;
    this.data = data;
    this.HTTP = new HttpHandler(
      this.administration.HTTP,
      `contacts/${this.id}`,
    );
  }

  /**
   * To perform requests to the Moneybird API in the context of this contact
   */
  public readonly HTTP: HTTP;

  /**
   * Updates the contact with the given data
   * @param data The data to update the contact with
   */
  public async update(data: Partial<IContactCreate>): Promise<Contact> {
    const contact = await this.HTTP.PATCH<IContact>("", { contact: data });
    return new Contact(this.moneybird, this.administration, contact);
  }

  /**
   * Deletes the contact from the administration
   */
  public async delete(): Promise<void> {
    await this.HTTP.DELETE<void>("");
  }
}
