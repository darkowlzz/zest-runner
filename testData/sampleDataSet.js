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
        }
      ],
      "index": 22,
      "enabled": true,
      "elementType": "ZestConditional"
    },
    {
      "message": "boom! {{var2}}",
      "priority": "HIGH",
      "index": 26,
      "enabled": true,
      "elementType": "ZestActionFail"
    },
    {
      "url": "http://example.com/",
      "data": "",
      "method": "GET",
      "headers": "",
      "response": {
        "url": "http://example.com/",
        "headers": "HTTP/1.1 200 OK\r\nAccept-Ranges: bytes\r\nCache-Control: max-age\u003d604800\r\nContent-Type: text/html\r\nDate: Tue, 13 Jan 2015 12:54:03 GMT\r\nEtag: \"359670651\"\r\nExpires: Tue, 20 Jan 2015 12:54:03 GMT\r\nLast-Modified: Fri, 09 Aug 2013 23:54:35 GMT\r\nServer: ECS (iad/182A)\r\nX-Cache: HIT\r\nx-ec-custom-error: 1\r\nContent-Length: 1270\r\n\r\n",
        "body": "\u003c!doctype html\u003e\n\u003chtml\u003e\n\u003chead\u003e\n    \u003ctitle\u003eExample Domain\u003c/title\u003e\n\n    \u003cmeta charset\u003d\"utf-8\" /\u003e\n    \u003cmeta http-equiv\u003d\"Content-type\" content\u003d\"text/html; charset\u003dutf-8\" /\u003e\n    \u003cmeta name\u003d\"viewport\" content\u003d\"width\u003ddevice-width, initial-scale\u003d1\" /\u003e\n    \u003cstyle type\u003d\"text/css\"\u003e\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 50px;\n        background-color: #fff;\n        border-radius: 1em;\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        body {\n            background-color: #fff;\n        }\n        div {\n            width: auto;\n            margin: 0 auto;\n            border-radius: 0;\n            padding: 1em;\n        }\n    }\n    \u003c/style\u003e    \n\u003c/head\u003e\n\n\u003cbody\u003e\n\u003cdiv\u003e\n    \u003ch1\u003eExample Domain\u003c/h1\u003e\n    \u003cp\u003eThis domain is established to be used for illustrative examples in documents. You may use this\n    domain in examples without prior coordination or asking for permission.\u003c/p\u003e\n    \u003cp\u003e\u003ca href\u003d\"http://www.iana.org/domains/example\"\u003eMore information...\u003c/a\u003e\u003c/p\u003e\n\u003c/div\u003e\n\u003c/body\u003e\n\u003c/html\u003e\n",
        "statusCode": 200,
        "responseTimeInMs": 672,
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
        }
      ],
      "followRedirects": false,
      "cookies": [],
      "index": 27,
      "enabled": true,
      "elementType": "ZestRequest"
    }
  ],
  "authentication": [],
  "index": 0,
  "enabled": true,
  "elementType": "ZestScript"
}
