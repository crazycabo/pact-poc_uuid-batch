import AWS = require('aws-sdk')
import { config } from './config/config'

// Configure AWS
let credentials
if (config.aws_profile === 'container') {
  credentials = new AWS.EnvironmentCredentials('AWS')
} else {
  credentials = new AWS.SharedIniFileCredentials({ profile: config.aws_profile })
}

AWS.config.credentials = credentials
