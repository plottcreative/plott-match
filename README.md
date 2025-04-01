# PLOTT - Match Height

## NPM Install

```
npm i plott-match
```

## Import
```
import MatchHeight from 'plott-match';
```


## Example Usage - without options
```
const mh = new MatchHeight('[data-mh]');
```

## Eample Usage - with option
```
const mh = new MatchHeight('[data-mh]', { autoInit: true, onResize: true, debounceDelay: 150 });
```