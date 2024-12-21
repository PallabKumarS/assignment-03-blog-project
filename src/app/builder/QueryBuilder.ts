import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    if (this?.query?.filter) {
      this.modelQuery = this.modelQuery.find({
        author: this?.query?.filter as FilterQuery<T>,
      });
      return this;
    }
    return this;
  }

  sort() {
    const sort =
      `${(this?.query?.sortOrder as string) === 'asc' ? '' : '-'}${this?.query?.sortBy as string}` ||
      '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.replace(/,/g, ' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  populate(populateFields: string[]) {
    if (populateFields.length > 0) {
      populateFields.map((field) => {
        this.modelQuery = this.modelQuery.populate(field);
        return this;
      });
    }
    return this;
  }
}

export default QueryBuilder;
