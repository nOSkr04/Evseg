import { _IResult } from "../interface/sec-result";

class _Result<T extends { _id: string }> implements _IResult<T> {
  data: T[];
  count: number;

  constructor({ data, count }: any) {
    this.data = data;
    this.count = count;
  }

  changeByIndex(data: T, index: number): _IResult<T> {
    const rows = this.data.map((row, i) => {
      if (index === i) {
        return data;
      }

      return row;
    });

    return new _Result({ ...this, rows, count: this.count });
  }

  changeById(data: T, id: string): _IResult<T> {
    const rows = this.data.map((row) => {
      if (id === row._id) {
        return data;
      }

      return row;
    });

    return new _Result({ ...this, rows, count: this.count });
  }

  removeByIndex(index: number): _IResult<T> {
    const rows = this.data?.filter((_, i) => i !== index);

    return new _Result({ ...this, rows, count: this.count - 1 });
  }

  removeById(id: string): _IResult<T> {
    const rows = this.data?.filter((row) => id !== row._id);

    return new _Result({ ...this, rows, count: this.count - 1 });
  }
}

export { _Result };
