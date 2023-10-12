import { AxiosRequestConfig } from "axios";

export interface HTTP {
  GET<T>(url: string, options?: AxiosRequestConfig): Promise<T>;
  POST<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<T>;
  PATCH<T>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ): Promise<T>;
  DELETE<T>(url: string, options?: AxiosRequestConfig): Promise<T>;
}

export class HttpHandler implements HTTP {
  private readonly parent: HTTP;
  private readonly url: string;

  constructor(parent: HTTP, url: string) {
    this.parent = parent;
    this.url = url;
  }

  public async GET<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    return await this.parent.GET<T>(`${this.url}/${url}`, options);
  }

  public async POST<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    return await this.parent.POST<T>(`${this.url}/${url}`, data, options);
  }

  public async PATCH<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    return await this.parent.PATCH<T>(`${this.url}/${url}`, data, options);
  }

  public async DELETE<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    return await this.parent.DELETE<T>(`${this.url}/${url}`, options);
  }
}
