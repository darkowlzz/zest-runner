exports.sampleZest = {
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
  ],
  "authentication": [],
  "index": 0,
  "enabled": true,
  "elementType": "ZestScript"
}
