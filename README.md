# react-native-scrollable-view

Inspired by https://github.com/brentvatne/react-native-scrollable-tab-view

I want to use scrollable view without tab. I cannot find react-native plugin 
so I forked react-native-scrollable-tab-view and strip of tab component.

Thanks @brentvatne!

Tested with react-native 0.20

## Add it to your project

1. Run `npm install react-native-scrollable-view --save`
2. `var ScrollableView = require('react-native-scrollable-view');`

## Demo

<a href="https://raw.githubusercontent.com/brentvatne/react-native-scrollable-tab-view/master/demo.gif"><img src="https://raw.githubusercontent.com/brentvatne/react-native-scrollable-tab-view/master/demo.gif" width="350"></a>
<a href="https://raw.githubusercontent.com/brentvatne/react-native-scrollable-tab-view/master/demo-fb.gif"><img src="https://raw.githubusercontent.com/brentvatne/react-native-scrollable-tab-view/master/demo-fb.gif" width="350"></a>

## Basic usage

```javascript
var ScrollableView = require('react-native-scrollable-view');

var App = React.createClass({
  render() {
    return (
      <ScrollableView>
        <Text> View 1</Text>
        <Text> View 2</Text>
        <Text> View 3</Text>
      </ScrollableView>
    );
  }
});
```

## Example

See
[examples/FacebookTabsExample](https://github.com/brentvatne/react-native-scrollable-tab-view/tree/master/examples/FacebookTabsExample).

## Props

- **`onChangePage`** _(Function)_ - function to call when Page changes, should accept 1 argument which is an Object containing two keys: `i`: the index of the tab that is selected, `ref`: the ref of the tab that is selected
- **`onScroll`** _(Function)_ - function to call when the pages are sliding, should accept 1 argument which is an Float number representing the page position in the slide frame.
- **`locked`** _(Bool)_ - disables horizontal dragging to scroll between tabs, default is false.
- **`initialPage`** _(Integer)_ - the index of the initially selected tab, defaults to 0 === first tab.
- **`page`** _(Integer)_ - set selected page(can be buggy see  [#126](https://github.com/brentvatne/react-native-scrollable-tab-view/issues/126)
- **`style`** _([View.propTypes.style](https://facebook.github.io/react-native/docs/view.html#style))_
- **`contentProps`** _(Object)_ - props that are applied to root `ScrollView`/`ViewPagerAndroid`. Note that overriding defaults set by the library may break functionality; see the source for details.

---

**MIT Licensed**

