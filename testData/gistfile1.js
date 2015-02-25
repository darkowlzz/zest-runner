exports.sampleZest = {
  "about": "This is a Zest script. For more details about Zest visit https://developer.mozilla.org/en-US/docs/Zest",
  "zestVersion": "0.3",
  "title": "Strict Transport Security test.zst",
  "description": "Checks to see if the specified URL correctly support Strict Transport Security",
  "prefix": "",
  "type": "Active",
  "parameters": {
    "tokenStart": "{{",
    "tokenEnd": "}}",
    "tokens": {
      "request.body": "",
      "target": "__replace__",
      "request.url": "",
      "request.method": ""
    },
    "elementType": "ZestVariables"
  },
  "statements": [
    {
      "message": "token request.url {{request.url}}",
      "index": 1,
      "enabled": true,
      "elementType": "ZestActionPrint"
    }
  ],
  "authentication": [],
  "index": 0,
  "enabled": true,
  "elementType": "ZestScript"
}
