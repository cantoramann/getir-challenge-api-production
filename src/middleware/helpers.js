// Make sure all fields are entered
exports.ValidateNotNull = (object) => {
  if (
    !object.startDate ||
    !object.endDate ||
    !object.minCount ||
    !object.maxCount
  ) {
    throw new Error(
      'Make sure you entered all filter options in correct names.'
    )
  }
}

// Verify date filters are in right format
exports.ValidateType = (minCount, maxCount) => {
  if (typeof minCount != 'number' || typeof maxCount != 'number') {
    throw new Error('Make sure your count limit options are in number format.')
  }
}

// Verify count filters are in right format
exports.FormatDateFromString = (date) => {
  const dateFormatted = new Date(date)
  if (!dateFormatted instanceof Date || isNaN(dateFormatted)) {
    throw new Error('Make sure yous dates are in type YYYY-MM-DD.')
  }
  return dateFormatted
}

// Validate that filder min and max values are in order
exports.ValidateNumberOrder = (minCount, maxCount) => {
  if (minCount < 0 || maxCount < 0) {
    throw new Error('Please enter positive numbers for count limits.')
  }
  if (minCount > maxCount) {
    throw new Error(
      'Please make sure the min count is smaller than or equal to your max count.'
    )
  }
}
exports.ValidateDateOrder = (start, end) => {
  if (start > end) {
    throw new Error(
      'Please make sure your start date is not pointing a time after your end date.'
    )
  }
}
