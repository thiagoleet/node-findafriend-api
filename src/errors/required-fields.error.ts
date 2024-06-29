export class RequiredFieldsError extends Error {
  constructor(messsage: string = "Required fields are missing") {
    super(messsage);
  }
}
