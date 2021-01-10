const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
const Record = require('../src/model/Record')
require('dotenv').config()

describe('configuring express test environment', () => {
  it('return true for truthful', () => {
    expect(true).toBe(true)
  })
})

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

describe('Missing Input Fields', () => {
  test('No Min Count', async () => {
    const response = await request(app).post('/api').send({
      maxCount: 100000,
      startDate: '2014-01-10',
      endDate: '2018-01-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Make sure you entered all filter options in correct names.'
    )
  })
  test('No Max Count', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      startDate: '2014-01-10',
      endDate: '2018-01-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Make sure you entered all filter options in correct names.'
    )
  })
  test('No Start Date', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      minCount: 10000,
      endDate: '2018-01-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Make sure you entered all filter options in correct names.'
    )
  })
  test('No End Date', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2014-01-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Make sure you entered all filter options in correct names.'
    )
  })
})

describe('Input Order Mismatch', () => {
  test('Count Orders Mismatched', async () => {
    const response = await request(app).post('/api').send({
      minCount: 10000,
      maxCount: 1000,
      startDate: '2014-01-10',
      endDate: '2018-12-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Please make sure the min count is smaller than or equal to your max count.'
    )
  })
  test('Date Orders Mismatch (by Year)', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2020-01-10',
      endDate: '2018-12-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Please make sure your start date is not pointing a time after your end date.'
    )
  })
  test('Date Orders Mismatch (by Month)', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2018-12-10',
      endDate: '2018-01-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Please make sure your start date is not pointing a time after your end date.'
    )
  })
  test('Date Orders Mismatch (by Day)', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2018-01-10',
      endDate: '2018-01-4',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Please make sure your start date is not pointing a time after your end date.'
    )
  })
  test('Negative Count Limit (Min Count Negative)', async () => {
    const response = await request(app).post('/api').send({
      minCount: -1000,
      maxCount: 10000,
      startDate: '2014-01-10',
      endDate: '2020-12-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Please enter positive numbers for count limits.'
    )
  })
  test('Negative Count Limit (Max Count Negative)', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: -10000,
      startDate: '2014-01-10',
      endDate: '2020-12-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Please enter positive numbers for count limits.'
    )
  })
  test('Negative Count Limit (Both Negative - In Order)', async () => {
    const response = await request(app).post('/api').send({
      minCount: -10000,
      maxCount: -1000,
      startDate: '2014-01-10',
      endDate: '2020-12-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Please enter positive numbers for count limits.'
    )
  })
  test('Negative Count Limit (Both Negative - In Reverse Order)', async () => {
    const response = await request(app).post('/api').send({
      minCount: -1000,
      maxCount: -10000,
      startDate: '2014-01-10',
      endDate: '2020-12-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Please enter positive numbers for count limits.'
    )
  })
})

describe('Invalid Date Formats', () => {
  test('Invalid Date (Month Error)', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2014-013-10',
      endDate: '2020-12-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Make sure yous dates are in type YYYY-MM-DD.'
    )
  })
  test('Invalid Date (Day Error)', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2014-01-42',
      endDate: '2020-12-10',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.msg).toBe(
      'Make sure yous dates are in type YYYY-MM-DD.'
    )
  })
})

describe('Database Extraction Queries', () => {
  test('Random All Well Query #1', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2014-01-01',
      endDate: '2020-12-31',
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.msg).toBe('Success')
    expect(response.body.code).toBe(0)
  })
  test('Random All Well Query #2', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2015-01-01',
      endDate: '2020-12-31',
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.msg).toBe('Success')
    expect(response.body.code).toBe(0)
  })
  test('Record Size Verification #1 (by Date)', async () => {
    const response1 = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2015-01-01',
      endDate: '2020-12-31',
    })
    const response2 = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2016-01-01',
      endDate: '2020-12-31',
    })
    expect(response1.statusCode).toBe(200)
    expect(response1.body.msg).toBe('Success')
    expect(response1.body.code).toBe(0)
    expect(response2.statusCode).toBe(200)
    expect(response2.body.msg).toBe('Success')
    expect(response2.body.code).toBe(0)
    expect(response1.body.records.length >= response2.body.records.length)
  })
  test('Record Size Verification #2 (by Date)', async () => {
    const response1 = await request(app).post('/api').send({
      minCount: 1,
      maxCount: 10000,
      startDate: '2014-01-01',
      endDate: '2019-12-31',
    })
    const response2 = await request(app).post('/api').send({
      minCount: 1,
      maxCount: 10000,
      startDate: '2016-01-01',
      endDate: '2019-12-31',
    })
    expect(response1.statusCode).toBe(200)
    expect(response1.body.msg).toBe('Success')
    expect(response1.body.code).toBe(0)
    expect(response2.statusCode).toBe(200)
    expect(response2.body.msg).toBe('Success')
    expect(response2.body.code).toBe(0)
    expect(response1.body.records.length >= response2.body.records.length)
  })
  test('Record Size Verification #3 (by Count)', async () => {
    const response1 = await request(app).post('/api').send({
      minCount: 10,
      maxCount: 10000,
      startDate: '2013-01-01',
      endDate: '2019-12-31',
    })
    const response2 = await request(app).post('/api').send({
      minCount: 10,
      maxCount: 1000,
      startDate: '2013-01-01',
      endDate: '2019-12-31',
    })
    expect(response1.statusCode).toBe(200)
    expect(response1.body.msg).toBe('Success')
    expect(response1.body.code).toBe(0)
    expect(response2.statusCode).toBe(200)
    expect(response2.body.msg).toBe('Success')
    expect(response2.body.code).toBe(0)
    expect(response1.body.records.length > response2.body.records.length)
  })
  test('No Record Due to Date Filter Options (Date is Way Before)', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '1990-01-01',
      endDate: '1992-12-31',
    })
    expect(response.statusCode).toBe(500)
    expect(response.body.msg).toBe(
      'No document found within given date boundary.'
    )
    expect(response.body.code).toBe(500)
  })
  test('No Record Due to Date Filter Options (Date is Way Later)', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 10000,
      startDate: '2990-01-01',
      endDate: '2992-12-31',
    })
    expect(response.statusCode).toBe(500)
    expect(response.body.msg).toBe(
      'No document found within given date boundary.'
    )
    expect(response.body.code).toBe(500)
  })
  test('No Record Due to Count Filter Options', async () => {
    const response = await request(app).post('/api').send({
      minCount: 1000,
      maxCount: 1001,
      startDate: '2014-01-01',
      endDate: '2020-12-31',
    })
    expect(response.statusCode).toBe(500)
    expect(response.body.msg).toBe(
      'No document found within given count boundary.'
    )
    expect(response.body.code).toBe(500)
  })
})
