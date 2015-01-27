{
  "about": "This is a Zest script. For more details about Zest visit https://developer.mozilla.org/en-US/docs/Zest",
  "zestVersion": "0.3",
  "title": "zzzz",
  "description": "A template standalone script",
  "prefix": "",
  "type": "Targeted",
  "parameters": {
    "tokenStart": "{{",
    "tokenEnd": "}}",
    "tokens": {},
    "elementType": "ZestVariables"
  },
  "statements": [
    {
      "comment": "TODO!",
      "index": 1,
      "enabled": true,
      "elementType": "ZestComment"
    },
    {
      "string": "apple",
      "variableName": "var1",
      "index": 2,
      "enabled": true,
      "elementType": "ZestAssignString"
    },
    {
      "string": "berry",
      "variableName": "var2",
      "index": 3,
      "enabled": true,
      "elementType": "ZestAssignString"
    },
    {
      "minInt": 5,
      "maxInt": 20,
      "variableName": "var3",
      "index": 4,
      "enabled": true,
      "elementType": "ZestAssignRandomInteger"
    },
    {
      "replace": "pp",
      "replacement": "gg",
      "regex": false,
      "caseExact": false,
      "variableName": "var1",
      "index": 5,
      "enabled": true,
      "elementType": "ZestAssignReplace"
    },
    {
      "string": "apples are apples",
      "variableName": "var4",
      "index": 6,
      "enabled": true,
      "elementType": "ZestAssignString"
    },
    {
      "replace": "apples",
      "replacement": "oranges",
      "regex": false,
      "caseExact": false,
      "variableName": "var4",
      "index": 7,
      "enabled": true,
      "elementType": "ZestAssignReplace"
    },
    {
      "string": "4",
      "variableName": "m",
      "index": 8,
      "enabled": true,
      "elementType": "ZestAssignString"
    },
    {
      "set": {
        "tokens": [
          "a",
          "b",
          "c",
          "d"
        ],
        "elementType": "ZestLoopTokenStringSet"
      },
      "statements": [
        {
          "message": "hi {{r}}",
          "index": 10,
          "enabled": true,
          "elementType": "ZestActionPrint"
        },
        {
          "message": "yo",
          "index": 11,
          "enabled": true,
          "elementType": "ZestActionPrint"
        },
        {
          "variableName": "m",
          "operandA": "m",
          "operandB": 1,
          "operation": "add",
          "index": 12,
          "enabled": true,
          "elementType": "ZestAssignCalc"
        }
      ],
      "variableName": "r",
      "index": 9,
      "enabled": true,
      "elementType": "ZestLoopString"
    },
    {
      "set": {
        "start": 0,
        "end": 20,
        "step": 2,
        "elementType": "ZestLoopTokenIntegerSet"
      },
      "statements": [
        {
          "message": "zooo {{x}}",
          "index": 14,
          "enabled": true,
          "elementType": "ZestActionPrint"
        },
        {
          "variableName": "m",
          "operandA": "m",
          "operandB": 1,
          "operation": "add",
          "index": 15,
          "enabled": true,
          "elementType": "ZestAssignCalc"
        }
      ],
      "variableName": "x",
      "index": 13,
      "enabled": true,
      "elementType": "ZestLoopInteger"
    },
    {
      "variableName": "z",
      "operandA": 3,
      "operandB": 4,
      "operation": "add",
      "index": 16,
      "enabled": true,
      "elementType": "ZestAssignCalc"
    },
    {
      "variableName": "z",
      "operandA": 4,
      "operandB": 4,
      "operation": "subtract",
      "index": 17,
      "enabled": true,
      "elementType": "ZestAssignCalc"
    },
    {
      "variableName": "z",
      "operandA": 3,
      "operandB": 4,
      "operation": "multiply",
      "index": 18,
      "enabled": true,
      "elementType": "ZestAssignCalc"
    },
    {
      "variableName": "z",
      "operandA": 8,
      "operandB": 4,
      "operation": "divide",
      "index": 19,
      "enabled": true,
      "elementType": "ZestAssignCalc"
    },
    {
      "milliseconds": 500,
      "index": 20,
      "enabled": true,
      "elementType": "ZestActionSleep"
    },
    {
      "string": "4",
      "variableName": "varX",
      "index": 21, 
      "enabled": true,
      "elementType": "ZestAssignString"
    },
    {
      "rootExpression": {
        "value": "4",
        "variableName": "varX",
        "caseExact": false,
        "not": false,
        "elementType": "ZestExpressionEquals"
      },
      "ifStatements": [
        {
          "variableName": "varX",
          "operandA": "varX",
          "operandB": 1,
          "operation": "add",
          "index": 23,
          "enabled": true,
          "elementType": "ZestAssignCalc"
        },
        {
          "milliseconds": 500,
          "index": 24,
          "enabled": true,
          "elementType": "ZestActionSleep"
        }
      ],
      "elseStatements": [
        {
          "variableName": "varX",
          "operandA": "varX",
          "operandB": 1,
          "operation": "subtract",
          "index": 25,
          "enabled": true,
          "elementType": "ZestAssignCalc"
        },
        {
          "message": "boom! {{var2}}",
          "priority": "HIGH",
          "index": 26,
          "enabled": true,
          "elementType": "ZestActionFail"
        }
      ],
      "index": 22,
      "enabled": true,
      "elementType": "ZestConditional"
    },
    {
      "url": "http://example.com/",
      "data": "",
      "method": "GET",
      "headers": "",
      "response": {},
      "assertions": [
        {
          "rootExpression": {
            "code": 200,
            "not": false,
            "elementType": "ZestExpressionStatusCode"
          },
          "elementType": "ZestAssertion"
        }
      ],
      "followRedirects": true,
      "cookies": [],
      "index": 27,
      "elementType": "ZestRequest"
    },
    {
      "url": "http://example.com/",
      "data": "",
      "method": "GET",
      "headers": "",
      "response": {},
      "assertions": [
        {
          "rootExpression": {
            "code": 201,
            "not": false,
            "elementType": "ZestExpressionStatusCode"
          },
          "elementType": "ZestAssertion"
        }
      ],
      "followRedirects": true,
      "cookies": [],
      "index": 28,
      "elementType": "ZestRequest"
    },
    {
      "url": "http://example.com/",
      "data": "",
      "method": "GET",
      "headers": "",
      "response": {},
      "assertions": [
        {
          "rootExpression": {
            "code": 200,
            "not": false,
            "elementType": "ZestExpressionStatusCode"
          },
          "elementType": "ZestAssertion"
        },
        {
          "rootExpression": {
            "regex": "example.com",
            "variableName": "response.url",
            "caseExact": false,
            "not": false,
            "elementType": "ZestExpressionRegex"
          },
          "elementType": "ZestAssertion"
        }
      ],
      "followRedirects": true,
      "cookies": [],
      "index": 29,
      "elementType": "ZestRequest"
    },
    {
      "message": "url was {{response.url}}",
      "index": 30,
      "enabled": true,
      "elementType": "ZestActionPrint"
    },
    {
      "url": "http://example.com/",
      "data": "",
      "method": "GET",
      "headers": "Content-Type: application/x-www-form-urlencoded\r\n",
      "response": {
        "url": "http://example.com/",
        "headers": "",
        "body": "",
        "statusCode": 200,
        "responseTimeInMs": 688,
        "elementType": "ZestResponse"
      },
      "assertions": [
        {
          "rootExpression": {
            "code": 200,
            "not": false,
            "elementType": "ZestExpressionStatusCode"
          },
          "elementType": "ZestAssertion"
        },
        {
          "rootExpression": {
            "length": 1270,
            "approx": 1,
            "variableName": "response.body",
            "not": false,
            "elementType": "ZestExpressionLength"
          },
          "elementType": "ZestAssertion"
        },
        {
          "rootExpression": {
            "regex": "coordination",
            "variableName": "response.body",
            "caseExact": false,
            "not": false,
            "elementType": "ZestExpressionRegex"
          },
          "elementType": "ZestAssertion"
        }
      ],
      "followRedirects": false,
      "cookies": [
        {
          "cookieDomain": "example.com",
          "cookiePath": "/",
          "isSecure": false,
          "hasPathAttribute": false,
          "hasDomainAttribute": false,
          "cookieVersion": 0,
          "name": "username",
          "value": "foo"
        },
        {
          "cookieDomain": "example.com",
          "cookiePath": "/",
          "isSecure": false,
          "hasPathAttribute": false,
          "hasDomainAttribute": false,
          "cookieVersion": 0,
          "name": "remember",
          "value": "never"
        }
      ],
      "index": 31,
      "enabled": true,
      "elementType": "ZestRequest"
    },
    {
      "string": "5",
      "variableName": "loopRegexVal",
      "index": 32,
      "enabled": true,
      "elementType": "ZestAssignString"
    },
    {
      "set": {
        "inputVariableName": "response.body",
        "regex": "html",
        "groupIndex": 0,
        "caseExact": false,
        "elementType": "ZestLoopTokenRegexSet"
      },
      "statements": [
        {
          "message": "inside loop {{q}}",
          "index": 34,
          "enabled": true,
          "elementType": "ZestActionPrint"
        },
        {
          "variableName": "loopRegexVal",
          "operandA": "loopRegexVal",
          "operandB": 1,
          "operation": "add",
          "index": 35,
          "enabled": true,
          "elementType": "ZestAssignCalc"
        }
      ],
      "variableName": "q",
      "index": 33,
      "enabled": true,
      "elementType": "ZestLoopRegex"
    },
    {
      "url": "https://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false&continue=https://mail.google.com/mail/&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1",
      "data": "",
      "method": "GET",
      "headers": "",
      "response": {
        "url": "",
        "headers": "",
        "body": "",
        "statusCode": 200,
        "responseTimeInMs": 688,
        "elementType": "ZestResponse"
      },
      "assertions": [],
      "followRedirects": false,
      "cookies": [],
      "index": 36,
      "enabled": true,
      "elementType": "ZestRequest"
    },
    {
      "fieldDefinition": {
        "formIndex": 0,
        "fieldName": "service",
        "elementType": "ZestFieldDefinition"
      },
      "variableName": "sss",
      "index": 37,
      "enabled": true,
      "elementType": "ZestAssignFieldValue"
    },
    {
      "prefix": "HTTP",
      "postfix": "OK",
      "location": "HEAD",
      "variableName": "ww",
      "index": 38,
      "enabled": true,
      "elementType": "ZestAssignStringDelimiters"
    },
    {
      "prefix": "html",
      "postfix": "en",
      "location": "BODY",
      "variableName": "qq",
      "index": 39,
      "enabled": true,
      "elementType": "ZestAssignStringDelimiters"
    }
  ],
  "authentication": [],
  "index": 0,
  "enabled": true,
  "elementType": "ZestScript"
}
