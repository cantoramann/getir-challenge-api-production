const { FindFromDate, FilterMaxCountsAndPrepare } = require('./helpers')

const executeQuery = async (req, res) => {
  try {
    const { startDate, endDate, minCount, maxCount } = req
    const records = await FindFromDate(startDate, endDate)
    const preparedRecords = FilterMaxCountsAndPrepare(
      records,
      minCount,
      maxCount
    )

    return res.status(200).json({
      code: 0,
      msg: 'Success',
      records: preparedRecords,
    })
  } catch (error) {
    return res.status(500).json({
      code: 500,
      msg: error.message,
    })
  }
}

module.exports = executeQuery
