[
  {
    "code": 100,
    "not": false,
    "elementType": "ZestExpressionStatusCode"
  },
  {
    "code": 200,
    "not": false,
    "elementType": "ZestExpressionStatusCode"
  },
  {
    "code": 200,
    "not": true,
    "elementType": "ZestExpressionStatusCode"
  },
  {
    "length": 50,
    "approx": 10,
    "variableName": "response.body",
    "not": false,
    "elementType": "ZestExpressionLength"
  },
  {
    "length": 60,
    "approx": 10,
    "variableName": "response.body",
    "not": false,
    "elementType": "ZestExpressionLength"
  },
  {
    "length": 70,
    "approx": 10,
    "variableName": "response.body",
    "not": false,
    "elementType": "ZestExpressionLength"
  },
  {
    "length": 18,
    "approx": 1,
    "variableName": "response.url",
    "not": false,
    "elementType": "ZestExpressionLength"
  },
  {
    "length": 93,
    "approx": 2,
    "variableName": "response.headers",
    "not": false,
    "elementType": "ZestExpressionLength"
  },
  {
    "length": 7,
    "approx": 0,
    "variableName": "foo",
    "not": false,
    "elementType": "ZestExpressionLength"
  },
  {
    "length": 7,
    "approx": 0,
    "variableName": "foo",
    "not": true,
    "elementType": "ZestExpressionLength"
  },
  {
    "regex": "Example",
    "variableName": "response.url",
    "caseExact": false,
    "not": false,
    "elementType": "ZestExpressionRegex"
  },
  {
    "regex": "Example",
    "variableName": "response.url",
    "caseExact": true,
    "not": false,
    "elementType": "ZestExpressionRegex"
  },
  {
    "regex": "zest",
    "variableName": "response.body",
    "caseExact": false,
    "not": false,
    "elementType": "ZestExpressionRegex"
  },
  {
    "regex": "Patterns",
    "variableName": "aVar",
    "caseExact": false,
    "not": false,
    "elementType": "ZestExpressionRegex"
  },
  {
    "regex": "Patterns",
    "variableName": "aVar",
    "caseExact": false,
    "not": true,
    "elementType": "ZestExpressionRegex"
  },
  {
    "includeRegexes": [
      "foo",
      "bar",
      "example"
    ],
    "excludeRegexes": [],
    "not": false,
    "elementType": "ZestExpressionURL"
  },
  {
    "includeRegexes": [
      "foo",
      "bar",
      "example"
    ],
    "excludeRegexes": [
      "example"
    ],
    "not": false,
    "elementType": "ZestExpressionURL"
  },
  {
    "includeRegexes": [
    ],
    "excludeRegexes": [
      "example"
    ],
    "not": false,
    "elementType": "ZestExpressionURL"
  },
  {
    "includeRegexes": [],
    "excludeRegexes": [],
    "not": false,
    "elementType": "ZestExpressionURL"
  },
  {
    "includeRegexes": [],
    "excludeRegexes": [],
    "not": true,
    "elementType": "ZestExpressionURL"
  },
  {
    "value": "http://eXample.com",
    "variableName": "response.url",
    "caseExact": false,
    "not": false,
    "elementType": "ZestExpressionEquals"
  },
  {
    "value": "http://example.co",
    "variableName": "response.url",
    "caseExact": false,
    "not": false,
    "elementType": "ZestExpressionEquals"
  },
  {
    "value": "http://eXample.com",
    "variableName": "response.url",
    "caseExact": true,
    "not": false,
    "elementType": "ZestExpressionEquals"
  },
  {
    "value": "http://eXample.com",
    "variableName": "response.url",
    "caseExact": true,
    "not": true,
    "elementType": "ZestExpressionEquals"
  },
  {
    "greaterThan": true,
    "timeInMs": 2070,
    "not": false,
    "elementType": "ZestExpressionResponseTime"
  },
  {
    "greaterThan": false,
    "timeInMs": 2070,
    "not": false,
    "elementType": "ZestExpressionResponseTime"
  },
  {
    "greaterThan": false,
    "timeInMs": 3672,
    "not": false,
    "elementType": "ZestExpressionResponseTime"
  },
  {
    "greaterThan": false,
    "timeInMs": 3672,
    "not": true,
    "elementType": "ZestExpressionResponseTime"
  },
  {
    "variableName": "aNum",
    "not": false,
    "elementType": "ZestExpressionIsInteger"
  },
  {
    "variableName": "foo",
    "not": false,
    "elementType": "ZestExpressionIsInteger"
  },
  {
    "variableName": "foo",
    "not": true,
    "elementType": "ZestExpressionIsInteger"
  }
]
