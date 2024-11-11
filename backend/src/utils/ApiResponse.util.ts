export default class ApiResponse {
  success: boolean;
  message: string;
  code: number;
  data: unknown;
  constructor(success: boolean, message: string, data: unknown, code: number) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.code = code;
  }
}
