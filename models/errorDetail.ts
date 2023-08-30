export interface IErrorDetail {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: {
    Message: string[];
    Email: string[];
  };
}

export class ErrorDetail implements IErrorDetail {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: {
    Message: string[];
    Email: string[];
  };

  constructor({ errors, status, title, traceId, type }: IErrorDetail) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.traceId = traceId;
    this.errors = errors;
  }
}
