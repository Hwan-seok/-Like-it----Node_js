/*jshint esversion: 6 */
const mysql = require('mysql');
const db = {
  sql:mysql.createConnection(DBoption),
  option:{
    host: 'localhost',
    user: 'root',
    password: '880918',
    database: 'likeit'
  }}
module.exports = db;
