import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }

    return this
  }

  filter() {
    const queryObj = { ...this.query }

    // Filtering
    const excludeFields = ['searchTerm', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])

    // Convert all string values to case-insensitive regex
    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === 'string') {
        queryObj[key] = { $regex: queryObj[key], $options: 'i' }
      }
    })

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    return this
  }
}

export default QueryBuilder
