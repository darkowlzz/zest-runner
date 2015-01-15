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
      "message": "boom!",
      "priority": "HIGH",
      "index": 26,
      "enabled": true,
      "elementType": "ZestActionFail"
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
      "message": "boom!",
      "priority": "HIGH",
      "index": 26,
      "enabled": true,
      "elementType": "ZestActionFail"
    }
  ],
  "authentication": [],
  "index": 0,
  "enabled": true,
  "elementType": "ZestScript"
}