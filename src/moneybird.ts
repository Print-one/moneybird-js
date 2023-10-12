import axios, { Axios, AxiosResponse, AxiosRequestConfig } from "axios";
import { IAdministration, MoneybirdOptions } from "./common";
import { Administration } from "./administration";
import { HTTP } from "./httpHandler";
import debug from "debug";

export class Moneybird implements HTTP {
  private readonly client: Axios;
  private readonly url: string;
  private readonly version: string;
  private options: MoneybirdOptions = { api_token: "" };

  constructor(url: string, version: string, options?: MoneybirdOptions) {
    this.url = url;
    this.version = version;

    this.client = axios.create({
      baseURL: new URL(version, url).href + "/",
      responseType: "json",
      validateStatus: () => true,
    });

    if (options) this.setOptions(options);
  }

  /**
   * Changes the options of the Moneybird instance
   * @param options The new options
   */
  public setOptions(options: MoneybirdOptions): void {
    this.options = options;

    this.client.defaults.headers.common.Authorization = `Bearer ${options.api_token}`;
    this.client.defaults.responseType = "json";
  }

  /**
   * Returns a list of all administrations
   */
  public async administrations(): Promise<Administration[]> {
    const data = await this.GET<IAdministration[]>("administrations");

    return data.map((a) => new Administration(this, a));
  }

  /**
   * Returns an administration object without fetching the data from the API
   * This is useful when you already have the id of the administration
   * @param id The id of the administration
   */
  public administration(id: string): Administration {
    return new Administration(this, { id } as IAdministration);
  }

  /**
   * Performs a GET request to the Moneybird API
   * @param url The url to perform the request to
   * @param options The options for the request
   */
  public async GET<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    debug("moneybird")(`GET ${url}`);

    const response = await this.client.request<T>({
      method: "GET",
      url: url,
      ...options,
    });

    this.handleErrors(response);

    return response.data;
  }

  /**
   * Performs a POST request to the Moneybird API
   * @param url The url to perform the request to
   * @param data The data to send with the request
   * @param options The options for the request
   */
  public async POST<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    debug("moneybird")(`POST ${url}`);

    const response = await this.client.request<T>({
      method: "POST",
      url: url,
      data: data,
      ...options,
    });

    this.handleErrors(response);

    return response.data;
  }

  /**
   * Performs a PATCH request to the Moneybird API
   * @param url The url to perform the request to
   * @param data The data to send with the request
   * @param options The options for the request
   */
  public async PATCH<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    debug("moneybird")(`PATCH ${url}`);

    const response = await this.client.request<T>({
      method: "PATCH",
      url: url,
      data: data,
      ...options,
    });

    this.handleErrors(response);

    return response.data;
  }

  /**
   * Performs a DELETE request to the Moneybird API
   * @param url The url to perform the request to
   * @param options The options for the request
   */
  public async DELETE<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    debug("moneybird")(`DELETE ${url}`);

    const response = await this.client.request<T>({
      method: "DELETE",
      url: url,
      ...options,
    });

    this.handleErrors(response);

    return response.data;
  }

  private handleErrors(response: AxiosResponse) {
    let error = "Unknown error;";
    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return;
      case 400:
        error =
          "Bad request - Parameters for the request are missing or malformed. Body contains the errors.";
        break;
      case 401:
        error =
          "Authorization required - No authorization provided or invalid authorization information provided";
        break;
      case 402:
        error = "Payment Required - Account limit reached";
        break;
      case 403:
        error =
          "Forbidden - IP is blacklisted for API usage, see Throttling information";
        break;
      case 404:
        error = "Not found - Entity not found";
        break;
      case 405:
        error =
          "Method Not Allowed - The endpoint with this HTTP method is not available in the API";
        break;
      case 406:
        error =
          "Not accepted - The requested content type is not supported by the API";
        break;
      case 422:
        error =
          "Unprocessable entity - Saving the entity in the database failed due to validation errors. Body contains the errors.";
        break;
      case 429:
        error = "Too many requests - See Throttling information";
        break;
      case 500:
        error =
          "Internal server error - Something went wrong while processing the request. This is unexpected behaviour and requires Moneybird to fix the scenario.";
        break;
    }

    throw {
      error: error,
      message: response.data.error,
    };
  }
}
