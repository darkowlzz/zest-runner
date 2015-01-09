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
          "index": 9,
          "enabled": true,
          "elementType": "ZestActionPrint"
        },
        {
          "message": "yo",
          "index": 10,
          "enabled": true,
          "elementType": "ZestActionPrint"
        }
      ],
      "variableName": "r",
      "index": 8,
      "enabled": true,
      "elementType": "ZestLoopString"
    }
  ],
  "authentication": [],
  "index": 0,
  "enabled": true,
  "elementType": "ZestScript"
}
