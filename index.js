const React = require('react-native');

const {
  Dimensions,
  View,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
  ViewPagerAndroid,
  PropTypes,
  InteractionManager,
} = React;


const ScrollableView = React.createClass({
  propTypes: {
    initialPage: PropTypes.number,
    page: PropTypes.number,
    onChangePage: PropTypes.func,
    onScroll: PropTypes.func,
    style: View.propTypes.style,
    contentProps: PropTypes.object
  },

  getDefaultProps() {
    return {
      initialPage: 0,
      page: -1,
      onChangePage: () => {},
      onScroll: () => {},
      contentProps: {}
    };
  },

  getInitialState() {
    return {
      currentPage: this.props.initialPage,
      scrollValue: new Animated.Value(this.props.initialPage),
      containerWidth: Dimensions.get('window').width,
    };
  },

  componentWillReceiveProps(props) {
    if (props.page >= 0 && props.page !== this.state.currentPage) {
      this.goToPage(props.page);
    }
  },

  goToPage(pageNumber) {
    this.props.onChangePage({ i: pageNumber, ref: this._children()[pageNumber], });

    if (Platform.OS === 'ios') {
      const offset = pageNumber * this.state.containerWidth;
      this.scrollView.scrollTo({x: offset, y: 0});
    } else {
      this.scrollView.setPage(pageNumber);
    }

    this.setState({currentPage: pageNumber, });
  },

  renderScrollableContent() {
    if (Platform.OS === 'ios') {
      return (
        <ScrollView
          horizontal
          pagingEnabled
          automaticallyAdjustContentInsets={false}
          style={styles.scrollableContentIOS}
          contentContainerStyle={styles.scrollableContentContainerIOS}
          contentOffset={{ x: this.props.initialPage * this.state.containerWidth, }}
          ref={(scrollView) => { this.scrollView = scrollView; }}
          onScroll={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            this._updateScrollValue(offsetX / this.state.containerWidth);
          }}
          onMomentumScrollBegin={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            this._updateSelectedPage(parseInt(offsetX / this.state.containerWidth, 10));
          }}
          onMomentumScrollEnd={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            this._updateSelectedPage(parseInt(offsetX / this.state.containerWidth, 10));
          }}
          scrollEventThrottle={16}
          scrollsToTop={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!this.props.locked}
          directionalLockEnabled
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          {...this.props.contentProps}>
          {this._children().map((child, idx) => {
            return <View
              key={child.props.pageLabel + '_' + idx}
              style={{width: this.state.containerWidth, }}>
              {child}
            </View>;
          })}
        </ScrollView>
      );
    } else {
      return (
        <ViewPagerAndroid
         style={styles.scrollableContentAndroid}
         initialPage={this.props.initialPage}
         onPageSelected={this._updateSelectedPage}
         keyboardDismissMode="on-drag"
         onPageScroll={(e) => {
           const { offset, position, } = e.nativeEvent;
           this._updateScrollValue(position + offset);
         }}
         ref={(scrollView) => { this.scrollView = scrollView; }}
         {...this.props.contentProps}>
         {this._children().map((child, idx) => {
           return <View
             key={child.props.pageLabel + '_' + idx}
             style={{width: this.state.containerWidth, }}>
             {child}
           </View>;
         })}
        </ViewPagerAndroid>
      );
    }
  },

  _updateSelectedPage(currentPage) {
    let localCurrentPage = currentPage;
    if (typeof localCurrentPage === 'object') {
      localCurrentPage = currentPage.nativeEvent.position;
    }
    this.setState({currentPage: localCurrentPage, }, () => {
      this.props.onChangePage({ i: localCurrentPage, ref: this._children()[localCurrentPage], });
    });
  },

  _updateScrollValue(value) {
    this.state.scrollValue.setValue(value);
    this.props.onScroll(value);
  },

  _handleLayout(e) {
    const { width, } = e.nativeEvent.layout;

    if (width !== this.state.containerWidth) {
      this.setState({ containerWidth: width, });
      InteractionManager.runAfterInteractions(() => {
        this.goToPage(this.state.currentPage);
      });
    }
  },

  _children() {
    return React.Children.map(this.props.children, (child) => child);
  },

  render() {

    return (
      <View style={[styles.container, this.props.style, ]} onLayout={this._handleLayout}>
        {this.renderScrollableContent()}
      </View>
    );
  },

});

module.exports = ScrollableView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContentContainerIOS: {
    flex: 1,
  },
  scrollableContentIOS: {
    flexDirection: 'column',
  },
  scrollableContentAndroid: {
    flex: 1,
  },
});