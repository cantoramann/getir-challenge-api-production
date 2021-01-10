const {
  ValidateNotNull,
  ValidateType,
  FormatDateFromString,
  ValidateNumberOrder,
  ValidateDateOrder,
} = require('./helpers')

const validate = (req, res, next) => {
  try {
    // Make sure all fields are entered
    ValidateNotNull(req.body)
    const { startDate, endDate, minCount, maxCount } = req.body
    // Verify date filters are in right format
    const startDateFormatted = FormatDateFromString(startDate)
    const endDateFormatted = FormatDateFromString(endDate)
    // Verify count filters are in right format
    ValidateType(minCount, maxCount)
    // Validate that filder min and max values are in order
    ValidateNumberOrder(minCount, maxCount)
    ValidateDateOrder(startDateFormatted, endDateFormatted)
    req.startDate = startDateFormatted
    req.endDate = endDateFormatted
    req.minCount = minCount
    req.maxCount = maxCount
  } catch (error) {
    return res.status(400).json({
      code: 400,
      msg: error.message,
    })
  }
  next()
}

module.exports = validate
