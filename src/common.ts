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

export interface ISalesInvoice {
  id: string;
  administration_id: string;
  contact_id: string;
  contact: IContact;
  contact_person_id?: string;
  contact_person?: never;
  invoice_id: string;
  recurring_sales_invoice_id?: string;
  workflow_id: string;
  document_style_id: string;
  identity_id: string;
  draft_id?: string;
  state: ISalesInvoiceState;
  invoice_date: string;
  due_date: string;
  payment_condition: string;
  payment_reference: string;
  short_payment_reference: string;
  reference: string;
  language: string;
  currency: string;
  discount: number;
  original_sales_invoice_id?: string;
  paused: boolean;
  paid_at?: string;
  sent_at?: string;
  created_at: string;
  updated_at: string;
  public_view_code: string;
  public_view_code_expires_at: string;
  version: number;
  details: {
    id: string;
    administration_id: string;
    tax_rate_id: string;
    ledger_account_id: string;
    project_id?: string;
    product_id?: string;
    amount: string;
    amount_decimal: string;
    description: string;
    price: string;
    period?: string;
    row_order: number;
    total_price_exl_tax_with_discount: string;
    total_price_exl_tax_with_discount_base: string;
    tax_report_reference: string[];
    mandatory_tax_text: string;
    created_at: string;
    updated_at: string;
  }[];
  payments: IPayment[];
  total_paid: string;
  total_unpaid: string;
  total_unpaid_base: string;
  prices_are_incl_tax: string;
  total_price_excl_tax: string;
  total_price_excl_tax_base: string;
  total_price_incl_tax: string;
  total_price_incl_tax_base: string;
  total_discount: string;
  marked_dubious_on?: string;
  marked_uncollectible_on?: string;
  reminder_count: number;
  next_reminder: string;
  original_estimate_id?: string;
  url: string;
  payment_url: string;
  custom_fields_attributes: {
    id: string;
    value: string;
  }[];
  notes: never[];
  attachments: IAttachment[];
  events: never[];
  tax_totals: {
    tax_rate_id: string;
    taxable_amount: string;
    taxable_amount_base: string;
    tax_amount: string;
    tax_amount_base: string;
  }[];
}

export interface IAttachment {
  id: string;
  administration_id: string;
  attachable_id: string;
  attachable_type: "SalesInvoice" | string;
  file_name: string;
  content_type: string;
  size: number;
  rotation: number;
  created_at: string;
  updated_at: string;
}

export type ISalesInvoiceState =
  | "draft"
  | "open"
  | "scheduled"
  | "pending_payment"
  | "late"
  | "reminded"
  | "paid"
  | "uncollectible";

export interface ISalesInvoiceCreate {
  contact_id: string;
  contact_person_id?: string;
  original_estimate_id?: string;
  document_style_id: string;
  workflow_id: string;
  reference: string;
  invoice_sequence_id?: string;
  invoice_date: string;
  first_due_date: string;
  currency: string;
  prices_are_incl_tax: boolean;
  payment_condition: string;
  discount: number;
  details_attributes: {
    id?: string;
    description: string;
    period?: string;
    price: string;
    amount: number;
    tax_rate_id: string;
    ledger_account_id: string;
    project_id?: string;
    product_id?: string;
    time_entry_ids?: string[];
    row_order: number;
    _destroy?: boolean;
    automated_tax_enabled?: boolean;
  }[];
  custom_fields_attributes: {
    id: string;
    value: string;
  }[];
  from_checkout?: boolean;
}

export interface ISalesInvoiceSending {
  delivery_method?: "Email" | "Simplerinvoicing" | "Manual";
  sending_scheduled?: boolean;
  deliver_ubl?: boolean;
  mergeable?: boolean;
  email_address?: string;
  email_message?: string;
  invoice_date?: string;
}

export interface IPayment {
  id: string;
  administration_id: string;
  invoice_type: string;
  invoice_id: string;
  financial_account_id?: string;
  user_id: string;
  payment_transaction_id?: string;
  transaction_identifier?: string;
  price: string;
  price_base: string;
  payment_date: string;
  credit_invoice_id?: string;
  financial_mutation_id?: string;
  ledger_account_id?: string;
  linked_payment_id?: string;
  manual_payment_action?: IManualPaymentAction;
  created_at: string;
  updated_at: string;
}

export interface IPaymentCreate {
  payment_date: string;
  price: number;
  price_base?: number;
  financial_account_id?: string;
  financial_mutation_id?: string;
  transaction_identifier?: string;
  manual_payment_action?: IManualPaymentAction;
  ledger_account_id?: string;
  invoice_id?: string;
}

export type IManualPaymentAction =
  | "private_payment"
  | "payment_without_proof"
  | "cash_payment"
  | "rounding_error"
  | "bank_transfer"
  | "balance_settlement"
  | "invoices_settlement";

export type ITaxRateType =
  | "general_journal_document"
  | "purchase_invoice"
  | "sales_invoice";

export interface ITax {
  id: string;
  administration_id: string;
  name: string;
  percentage: string;
  tax_rate_type: ITaxRateType;
  show_tax: boolean;
  active: boolean;
  country?: string;
  created_at: string;
  updated_at: string;
}

export type ICustomFieldSource =
  | "sales_invoice"
  | "contact"
  | "identity"
  | "estimate";

export interface ICustomField {
  id: string;
  administration_id: string;
  name: string;
  source: ICustomFieldSource;
}

export type AccountType =
  | "non_current_assets"
  | "current_assets"
  | "equity"
  | "provisions"
  | "non_current_liabilities"
  | "current_liabilities"
  | "revenue"
  | "direct_costs"
  | "expenses"
  | "other_income_expenses";

export type DocumentType =
  | "sales_invoice"
  | "purchase_invoice"
  | "general_journal_document"
  | "financial_mutation"
  | "payment";

export interface ILedgerAccount {
  id: string;
  administration_id: string;
  name: string;
  account_type: AccountType;
  account_id?: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
  allowed_document_types: DocumentType[];
}

export type WorkflowType = "EstimateWorkflow" | "InvoiceWorkflow";

export interface IWorkflow {
  id: string;
  administration_id: string;
  type: string;
  name: string;
  default: boolean;
  currency: string;
  language: string;
  active: boolean;
  prices_are_incl_tax: boolean;
  created_at: string;
  updated_at: string;
}
