# node-bitcoinfees-bitgo

## install

```
npm i bitcoinfees-bitgo
```

## usage

```
const bitgo = require("bitcoinfees-bitgo")
bitgo.FeesApi.recommended().then(console.log)
```

## result

```
{ "fastestFee": 453, "halfHourFee": 433, "hourFee": 417 }
```


