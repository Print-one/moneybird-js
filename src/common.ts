export interface MoneybirdOptions {
  api_token: string;
}

export interface IAdministration {
  id: string;
  name: string;
  language: string;
  currency: string;
  country: string;
  time_zone: string;
}

export interface IContact {
  id: string;
  administration_id: string;
  company_name: string;
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
  delivery_method: string;
  customer_id: string;
  tax_number: string;
  chamber_of_commerce: string;
  bank_account: string;
  attention: string;
  email: string;
  email_ubl: boolean;
  send_invoices_to_attention: string;
  send_invoices_to_email: string;
  send_estimates_to_attention: string;
  send_estimates_to_email: string;
  sepa_active: boolean;
  sepa_iban: string;
  sepa_iban_acccount_name: string;
  sepa_bic: string;
  sepa_mandate_id: string;
  sepa_mandate_date?: string;
  sepa_sequence_type: string;
  credit_card_number: string;
  credit_card_reference: string;
  credit_card_type?: string;
  tax_number_validated_at?: string;
  tax_number_valid?: boolean;
  incoice_workflow_id?: string;
  estimate_workflow_id?: string;
  si_indentifier: string;
  si_identifier_type?: string;
  moneybird_payments_mandate: boolean;
  created_at: string;
  updated_at: string;
  version: number;
  salen_invoices_url: string;
  notes: never[];
  custom_fields: {
    id: string;
    name: string;
    value: string;
  }[];
  contact_people: never[];
  archived: boolean;
  events: never[];
}

export interface IContactCreate {
  company_name: string;
  address1: string;
  address2: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
  delivery_method: string;
  customer_id: string;
  tax_number: string;
  firstname: string;
  lastname: string;
  chamber_of_commerce: string;
  bank_account: string;
  send_invoices_to_attention: string;
  send_invoices_to_email: string;
  send_estimates_to_attention: string;
  send_estimates_to_email: string;
  sepa_active: boolean;
  sepa_iban: string;
  sepa_iban_account_name: string;
  sepa_bic: string;
  sepa_mandate_id: string;
  sepa_mandate_date?: string;
  sepa_sequence_type: string;
  si_identifier_type?: string;
  si_identifier: string;
  invoice_workflow_id?: string;
  estimate_workflow_id?: string;
  email_ubl: boolean;
  direct_debit: boolean;
  custom_fields_attributes: {
    id: string;
    value: string;
  }[];
  contact_person: {
    firstname: string;
    lastname: string;
  }[];
  create_event: boolean;
  type: string;
}
