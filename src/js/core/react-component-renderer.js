import React from 'react';
import ReactDom from 'react-dom';

class ReactComponentRenderer {

  constructor(klass, container) {
    this.klass = klass;
    this.container = container;
    this.props = {};
    this.component = null;
  }

  replaceProps(props, callback) {
    this.props = {};
    this.setProps(props, callback);
  }

  setProps(partialProps, callback) {
    if (this.klass == null) {
      console.warn(
        'setProps(...): Can only update a mounted or ' +
        'mounting component. This usually means you called setProps() on ' +
        'an unmounted component. This is a no-op.'
      );
      return;
    }

    Object.assign(this.props, partialProps);
    let element = React.createElement(this.klass, this.props);

    this.component = ReactDom.render(element, this.container, callback);
  }

  unmount() {
    ReactDom.unmountComponentAtNode(this.container);
    this.klass = null;
  }

}

export default ReactComponentRenderer;
