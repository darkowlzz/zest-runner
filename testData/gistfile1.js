{
  "about": "This is a Zest script. For more details about Zest visit https://developer.mozilla.org/en-US/docs/Zest",
  "zestVersion": "0.8",
  "title": "Strict Transport Security test.zst",
  "description": "Checks to see if the specified URL correctly support Strict Transport Security",
  "prefix": "",
  "type": "Active",
  "parameters": {
    "tokenStart": "{{",
    "tokenEnd": "}}",
    "tokens": {
      "request.header": "",
      "request.body": "",
      "target": "__replace__",
      "request.url": "",
      "request.method": ""
    },
    "elementType": "ZestVariables"
  },
  "statements": [
    {
      "rootExpression": {
        "regex": "^http://",
        "variableName": "request.url",
        "caseExact": false,
        "not": false,
        "elementType": "ZestExpressionRegex"
      },
      "ifStatements": [
        {
          "comment": "Its HTTP - ignore it",
          "index": 0,
          "enabled": true,
          "elementType": "ZestComment"
        }
      ],
      "elseStatements": [
        {
          "message": "Its HTTPS lets test it!",
          "index": 1,
          "enabled": true,
          "elementType": "ZestActionPrint"
        },
        {
          "comment": "Its HTTPS - test it",
          "index": 2,
          "enabled": true,
          "elementType": "ZestComment"
        },
        {
          "rootExpression": {
            "regex": "\\sStrict-Transport-Security:",
            "variableName": "response.header",
            "caseExact": false,
            "not": false,
            "elementType": "ZestExpressionRegex"
          },
          "ifStatements": [
            {
              "message": "STS header - so far so good",
              "index": 4,
              "enabled": false,
              "elementType": "ZestActionPrint"
            },
            {
              "comment": "It has an STS header",
              "index": 5,
              "enabled": true,
              "elementType": "ZestComment"
            },
            {
              "replace": "https",
              "replacement": "http",
              "regex": false,
              "caseExact": false,
              "variableName": "request.url",
              "index": 0,
              "enabled": true,
              "elementType": "ZestAssignReplace"
            },
            {
              "comment": "Request the HTTP equivalent page",
              "index": 1,
              "enabled": true,
              "elementType": "ZestComment"
            },
            {
              "urlToken": "{{request.url}}",
              "data": "{{request.body}}",
              "method": "{{request.method}}",
              "headers": "{{request.header}}",
              "assertions": [],
              "followRedirects": true,
              "cookies": [],
              "index": 2,
              "enabled": true,
              "elementType": "ZestRequest"
            },
            {
              "rootExpression": {
                "code": 301,
                "not": false,
                "elementType": "ZestExpressionStatusCode"
              },
              "ifStatements": [
                {
                  "comment": "301 redirect - all good",
                  "index": 9,
                  "enabled": true,
                  "elementType": "ZestComment"
                }
              ],
              "elseStatements": [
                {
                  "message": "Not a 301 redirect - fail : {{response.header}}",
                  "index": 9,
                  "enabled": false,
                  "elementType": "ZestActionPrint"
                },
                {
                  "message": "HTTP Request didnt return a 301 redirect",
                  "priority": "HIGH",
                  "index": 10,
                  "enabled": true,
                  "elementType": "ZestActionFail"
                }
              ],
              "index": 7,
              "enabled": true,
              "elementType": "ZestConditional"
            }
          ],
          "elseStatements": [
            {
              "message": "HTTPS Response with no STS header",
              "priority": "MEDIUM",
              "index": 5,
              "enabled": true,
              "elementType": "ZestActionFail"
            }
          ],
          "index": 2,
          "enabled": true,
          "elementType": "ZestConditional"
        }
      ],
      "index": 2,
      "enabled": true,
      "elementType": "ZestConditional"
    }
  ],
  "authentication": [],
  "index": 0,
  "enabled": true,
  "elementType": "ZestScript"
}
