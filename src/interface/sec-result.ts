import { _Result } from "../models/sec-result";

export interface _IResult<T extends { _id: string }> extends _Result<T> {
  changeByIndex: (data: T, index: number) => _IResult<T>;
  changeById: (data: T, id: string) => _IResult<T>;
  removeByIndex: (index: number) => _IResult<T>;
  removeById: (id: string) => _IResult<T>;
}
